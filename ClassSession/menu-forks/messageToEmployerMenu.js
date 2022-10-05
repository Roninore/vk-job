const Keyboards = require('../const-data/Keyboards')

module.exports = async function messageToEmployerMenu(params) { // Кнопка "написать" у админа
    try {
        
        this.messages = [{text:'Введите текст сообщения \n(!!введите его в одном сообщении!!)',keyboard: Keyboards.cancel}]
        const vacancy = await global.db.getVacancy(params.ctx.message.payload.id)
        const ctx = await this.waitNextMessage()

        if (vacancy.data.closed == true || vacancy.data.passed == true) {
            console.log('Внутри закрытия')
            this.messages = [{text:'Заявка закрыта или уже принята',keyboard: Keyboards.empty}]
            this.closed = true
            this.done()
            return
        }

        if (!ctx.message.payload) {
            await global.bot.sendMessage({peer_ids:vacancy.data.employer_vk_id},`Сообщение от администраторва (Вакансия #${vacancy.data.id})\n========\n${ctx.message.text}\n========`,
            {keyboard:{
                inline: true,
                buttons: [
                    [{  
                        action:{
                            type:'text',
                            label:'Ответить',
                            payload: {btn: 'answer-moderator', startSession: true, id: vacancy.data.id}
                        },
                        color:'positive'
                    },]
                ]
            }})
            this.messages = [{text:'Отправлено',keyboard:Keyboards.empty}]
        } else if (ctx.message.payload.btn == 'cancel')
        {
            this.messages = [{text:'Отменено',keyboard:Keyboards.empty}]
        } else {
            this.messages = [{text:'Неверное действие',keyboard:Keyboards.empty}]
        }

        this.closed = true
        this.done()
    } catch(e) {
        this.closed = true
        this.message = []
        this.done()
        console.log(e)
    }
}