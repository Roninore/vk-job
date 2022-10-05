const Keyboards = require('../const-data/Keyboards')

module.exports = async function acceptVacancyMenu(params) {
    try {
        this.messages = [{text:'Введите что угодно, чтобы подтвердить',keyboard: Keyboards.cancel}]
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
            await global.db.passVacancy(vacancy.data.id)
            
            const mailintIds = await global.db.getAllReadyExecutorsIds()
            await global.bot.mailing(mailintIds,`У нас для вас новая ваканися!\nВакансия #${vacancy.data.id}\n${this.getVacancyToExecutor(vacancy.data)}`,{keyboard: Keyboards.vacancyFeed(vacancy.data.id,true)})

            await global.bot.sendMessage({peer_ids:vacancy.data.employer_vk_id},`Вакансия #${vacancy.data.id} размещена!\nВ этот чат будут приходить сообщения от тех, кто заинтересуется вашей вакансией.`,
            {keyboard: Keyboards.empty})
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