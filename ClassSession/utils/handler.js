async function handler(messages,actions,reader,setter,nextFunction,validation = {func: undefined, errorMessages: []}) {
    this.messages = messages
    this.done()
        
    let data = await reader.call(this,actions)
    if (data == 'close') return

    if (validation.func) {
        const validationResult = validation.func(data)
        if (validationResult) data = validationResult
        else {
            this.handler(validation.errorMessages,actions,reader,setter,nextFunction,validation)
            return
        }
    }

    setter.call(this,data)
    this.done()
    nextFunction.call(this)
    return
}

module.exports = handler