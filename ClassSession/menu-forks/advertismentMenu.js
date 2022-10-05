const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')

async function advertismentMenu() {
    try {
    this.messages = [{text: Messages.advertisment, keyboard: Keyboards.advertisment}]
    this.done()
    let ctx = await this.waitNextMessage()
    this.mainMenu()
    return
    } catch(e) {
        console.log(e)
    }
}

module.exports = advertismentMenu