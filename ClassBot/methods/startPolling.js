
module.exports = async function() {
  async function startPollingIn() {
    const {response} = await this.apiRequest('groups.getLongPollServer', {group_id:this.group_id})
    // console.log(response)
    
    const lp_url = `${response.server}?act=a_check&key=${response.key}&ts=${response.ts}&wait=25`
    console.log('LongPoll url: ', lp_url)
    await this.polling(response.server,response.key,response.ts)
  }
  try {
    startPollingIn.call(this)
  } catch(e) {
    console.log('Error on start polling', e)
    setTimeout(this.startPolling,5000)
  }
  }