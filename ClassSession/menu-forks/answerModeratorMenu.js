const Keyboards = require('../const-data/Keyboards')

module.exports = async function answerModeratorMenu(params) { // Написать
    try {
        this.messages = [{text:'Введите текст сообщения \n!Введите всё в одном сообщении',keyboard: Keyboards.cancel}]
        const vacancy = await global.db.getVacancy(params.message.payload.id)
        const ctx = await this.waitNextMessage()


        if (vacancy.data.closed == true || vacancy.data.passed == true) {
            console.log('Внутри закрытия')
            this.messages = [{text:'Заявка закрыта или уже принята',keyboard: Keyboards.empty}]
            this.closed = true
            this.done()
            return
        }

        if (!ctx.message.payload) {
            const vacancy = await global.db.getVacancy(params.message.payload.id)
            const moderators = await global.db.moderators.map(el => {return el.data.id})
            global.bot.mailing(moderators,`Сообщение по заявке (Вакансия #${vacancy.data.id})`,
            {forward_messages: ctx.message.id,keyboard:{
                inline: true,
                buttons: [
                    [{  
                        action:{
                            type:'text',
                            label:'Написать',
                            payload: {btn: 'message-to-employer', startSession: true, id: vacancy.data.id}
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
        this.messages = []
        this.done()
        console.log(e)
    }
}