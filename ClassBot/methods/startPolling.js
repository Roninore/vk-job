
module.exports = async function() {
  const {response} = await this.apiRequest('groups.getLongPollServer', {group_id:this.group_id})
  // console.log(response)
  
  const lp_url = `${response.server}?act=a_check&key=${response.key}&ts=${response.ts}&wait=25`
  console.log('LongPoll url: ', lp_url)
  await this.polling(response.server,response.key,response.ts)
  }