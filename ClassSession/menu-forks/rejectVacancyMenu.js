const Keyboards = require('../const-data/Keyboards')

module.exports = async function rejectVacancyMenu(params) {
    try {
        this.messages = [{text:'Введите текст сообщения \n!Введите всё в одном сообщении',keyboard: Keyboards.cancel}]
        const vacancy = await global.db.getVacancy(params.ctx.message.payload.id)
        const ctx = await this.waitNextMessage()
        

        if (vacancy.data.closed == true || vacancy.data.passed == true) {
            this.messages = [{text:'Заявка закрыта или уже принята',keyboard: Keyboards.empty}]
            this.closed = true
            this.done()
            return
        }
        if (!ctx.message.payload) {
            await global.db.deleteVacancy(vacancy.data.id)
            await global.bot.sendMessage({peer_ids:vacancy.data.employer_vk_id},`(Вакансия #${vacancy.data.id})\nОтклонена по причине: ${ctx.message.text}`,
            {keyboard:Keyboards.empty})
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
        this.done()
        console.log(e)
    }
}