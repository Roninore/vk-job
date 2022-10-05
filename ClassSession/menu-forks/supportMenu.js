const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')

async function supportMenu() {
    try {
    this.messages = [{text: Messages.support, keyboard: Keyboards.support}]
    this.done()
    let ctx = await this.waitNextMessage()
    this.mainMenu()
    return
    } catch(e) {
        console.log(e)
    }
}

module.exports = supportMenu