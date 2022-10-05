
module.exports = async function editMessage(params) {

    for (key in params)
        params[key] = JSON.stringify(params[key])

    const messageParams = {
        ...params
    }

    const resp = await this.apiRequest('messages.edit',messageParams)

    if (resp.error)
        console.log('Edit message error', resp.error)

    console.log(resp)
    return resp
}