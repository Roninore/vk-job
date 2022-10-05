const Bot = require('./ClassBot/Bot.js')
const Session = require('./ClassSession/Session.js')
const Database = require('./ClassDataBase/DataBase.js')

const {access_token,lp_version,group_id} = require('./config')

const bot = new Bot({access_token,lp_version,group_id})
const db = new Database()

global.bot = bot
global.db = db


bot.on('message', async ctx => {
  try {
    if (ctx.message.payload) ctx.message.payload = JSON.parse(ctx.message.payload) // Парс payload



    if (db.moderators.find(el => {return el.data.id == ctx.message.peer_id})) { // Если админ
      const flag = bot.admin(ctx) // И это команда
      // console.log(flag) 
      if (flag) return
    }

    if (ctx.message.payload) console.log(ctx.message.payload) 

    if (ctx.message.payload && ctx.message.payload.startSession) { // Если есть флаг начала новой сессии
      console.log('Начинаю')
      const [user] = await bot.getUser(ctx)
      const currentSession = new Session({peer_id:ctx.message.peer_id,user:user,ctx})
      bot.sessions[ctx.message.peer_id] = currentSession

      for (const message of currentSession.messages)
          currentSession.last_message_id = (await bot.sendMessage(ctx,message.text,{keyboard:message.keyboard})).response
      
      if (currentSession.closed) {
          console.log('Закрываю сессию')
          delete bot.sessions[ctx.message.peer_id]
        }
      
      return
    }

    const flag = !(ctx.message.peer_id in bot.sessions) // Проверка есть ли диалог


    if (flag) // Начальная команда
    {
      const [user] = await bot.getUser(ctx)
      const currentSession = new Session({peer_id:ctx.message.peer_id,user:user}) // Создаем сессию с начальным уровнем
      bot.sessions[ctx.message.peer_id] = currentSession

      for (const message of currentSession.messages)
          currentSession.last_message_id = (await bot.sendMessage(ctx,message.text,{keyboard:message.keyboard})).response
      
      return
    }

    const currentSession = await bot.sessions[ctx.message.peer_id].nextAction(ctx)


    for (const message of currentSession.messages) 
        currentSession.last_message_id = (await bot.sendMessage(ctx,message.text,{keyboard:message.keyboard})).response

    if (currentSession.closed) {
      console.log('Закрываю сессию', currentSession.user)
      delete bot.sessions[ctx.message.peer_id]
    }
      
  } catch(e) {
    console.log('Error on message event',e)
  }
})


bot.startPolling()

