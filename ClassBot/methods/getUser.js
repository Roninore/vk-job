
module.exports = async function(ctx) {
    const {response} = await this.apiRequest('users.get', {user_ids:ctx.message.peer_id})
    
    if (response.error)
        console.log(response.error)
    
    return response
}