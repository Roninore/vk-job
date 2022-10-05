
module.exports = async function sendMessage(ctx,message,params) {

    for (key in params)
        params[key] = JSON.stringify(params[key])

    const messageParams = {
        message, 
        random_id:Date.now(),
        ...params
    }

    // Определяет - рассылка или одиночное сообщение
    if (ctx.peer_ids) messageParams.peer_ids = ctx.peer_ids
    else messageParams.peer_id = ctx.message.peer_id

    const resp = await this.apiRequest('messages.send',messageParams)

    if (resp.error)
        console.log('Send message error', resp.error)

    return resp
}