const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')

async function mainMenu(params = {startFlag: false}) {
    try {
        if (params.prevMessages) this.messages = params.prevMessages
        else this.messages = []

        this.clear()

        this.messages = this.messages.concat([{ text: Messages.greeting(this.user.first_name), keyboard: Keyboards.empty },
        { text: Messages.mainMenu, keyboard:Keyboards.mainMenu }])
        

        if (!params.hasOwnProperty('startFlag')) params.startFlag = false
        if (!params.startFlag) this.done()

        let ctx = await this.waitNextMessage()

        const actions = {
            'findJobMenu': this.findJobMenu,
            'findEmployeesMenu': this.findEmployeesMenu,
            'advertismentMenu': this.advertismentMenu,
            'supportMenu': this.supportMenu,
            'profileMenu': this.profileMenu,
            'vacancyFeedMenu': this.vacancyFeedMenu,
        }
        
        if ((!ctx.message.payload) || !(ctx.message.payload.btn in actions))
        {
            this.badChoice(this.mainMenu)
            return
        }

        actions[ctx.message.payload.btn].call(this,{ctx})

        return

    } catch(e) {
        console.log(e)
    }
}



module.exports = mainMenu