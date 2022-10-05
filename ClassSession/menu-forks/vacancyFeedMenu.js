const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')

async function vacancyFeedMenu(params) {
    try {
        const form = await global.db.getUserForm(params.ctx.message.peer_id) 
    } catch(e) {
        console.log(e)
        this.findJobMenu.call(this,params)
        return
    }
    try {
    const messages = [{text: Messages.vacancyFeed, keyboard: {inline: true, buttons: [[Keyboards.toMenu]]} }]
    this.vacancyOffset = 0
    showVacancies.call(this,params,messages)
    return
    } catch(e) {
        console.log(e)
    }
}

async function showVacancies(params, messages = undefined) {
    const VacancyLimit = 2
    let msgs = []
    if (messages) msgs = messages

    const data = await global.db.getVacancies(this.vacancyOffset,VacancyLimit)
    
    msgs = [...msgs, ...data.map((el,i) => {
        let answer = { text: `Вакансия #${el.data.id}\n${this.getVacancyToExecutor(el.data)}`, keyboard: Keyboards.vacancyFeed(el.data.id)}
        if (i + 1 == data.length) answer.keyboard = Keyboards.vacancyFeedEnd(el.data.id)
        return answer
    })]

    if (!data.length) {
        msgs = [...msgs, {text:'Пока что больше вакансий нет', keyboard: {inline: true, buttons: [[Keyboards.toMenu]]} }]
    }

    console.log(msgs,data)   
    
    this.vacancyOffset += 2

    this.handler(
        msgs,
        {
            'mainMenu': this.mainMenu,
            'next': showVacancies,
            'response': this.responseMenu
        },
        this.read_btn,
        (data) => { return data},
        this.mainMenu)
    return
}



module.exports = vacancyFeedMenu