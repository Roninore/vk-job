
module.exports = async function markAsRead(ctx) {

    const resp = await this.apiRequest('messages.markAsRead',{peer_id:ctx.message.peer_id})

    if (resp.error)
        console.log('Send message error', resp.error)

    return resp
}