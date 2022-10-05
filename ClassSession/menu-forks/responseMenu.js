const Keyboards = require('../const-data/Keyboards')

module.exports = async function responseMenu(params) {
    try {
        this.messages = [{text:'Введите ваше сообщение работодателю\nЕсть ли опыт в данной сфере (и какой?) \n!Введите всё в одном сообщении',keyboard: Keyboards.cancel}]
        this.done()
        const vacancy = await global.db.getVacancy(params.ctx.message.payload.id)
        const ctx = await this.waitNextMessage()

        if (vacancy.data.closed == true || vacancy.data.passed == false) {
            console.log('Внутри закрытия')
            this.messages = [{text:'Вакансия уже закрыта',keyboard: Keyboards.empty}]
            this.closed = true
            this.done()
            return
        }

        if (!ctx.message.payload) {
            const userForm = await global.db.getUserForm(params.ctx.message.peer_id)
            
            await global.bot.sendMessage({peer_ids:vacancy.data.employer_vk_id},`По вакансии #${vacancy.data.id}, новый отклик\n======\n${ctx.message.text}\n======\nОт пользователя: @id${ctx.message.peer_id}(${this.user.first_name})\n${this.getMyDescriptionText(userForm.data)}\n=====\nВы можете написать/позвонить ему, либо проигнорировать - если вам не походит его описание`,
            {keyboard: Keyboards.empty})
            this.messages = [{text:'Отправлено',keyboard:Keyboards.empty}]
        } else if (ctx.message.payload.btn == 'cancel')
        {
            this.messages = [{text:'Отменено',keyboard:Keyboards.empty}]
        } else {
            this.messages = [{text:'Неверное действие',keyboard:Keyboards.empty}]
            responseMenu.call(this,params)
            return
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