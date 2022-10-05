
async function read_btn(actions) {
    try {
    const ctx = await this.waitNextMessage()

    if ((!ctx.message.payload) || !(ctx.message.payload.btn in actions))
    {
        this.badChoice()
        return await this.read_btn(actions)
    } else {
        if (typeof actions[ctx.message.payload.btn] == 'function')
        {
            actions[ctx.message.payload.btn].call(this,{ctx})
            return 'close'
        }
        else return actions[ctx.message.payload.btn]
    }
    } catch(e) {
        console.log(e)
        return 'close'
    }
}

async function read_text(actions) {
    try {
    const ctx = await this.waitNextMessage()
    if (!ctx.message.payload) {
        return ctx.message.text
    }
    if (!(ctx.message.payload.btn in actions))
    {
        this.badChoice()
        return await this.read_text(actions)
    } else {
        if (typeof actions[ctx.message.payload.btn] == 'function')
        {
            actions[ctx.message.payload.btn].call(this,{ctx})
            return 'close'
        }
        else return actions[ctx.message.payload.btn]
    }
    } catch(e) {
        console.log(e)
        return 'close'
    }
}

module.exports = {read_btn,read_text}