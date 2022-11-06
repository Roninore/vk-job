const Bot = require("../Bot")

function admin(ctx) {

    if (ctx.message.text[0] != '/') false

    const match = ctx.message.text.match(/^\/([a-z]*)\s?(.*)?/)

    if (!match) return false 
    
    const [,command,params] = match

    // console.log(command,params)

    const commands = {
        'mail':this.mail,
        'query':this.query,
        'stop': this.stop
    }
    console.log(command,commands)
    if (!commands.hasOwnProperty(command)) return false
    
    try {
        commands[command].call(this,params,ctx) 
    } catch(e) {
        console.log(e)
        this.sendMessage(ctx,JSON.stringify(e,null,2))
    }

    return true
}

module.exports = admin