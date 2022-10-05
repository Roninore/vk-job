const axios = require('axios').default

module.exports = async function(server,key,ts) {
  try {
    const lp_url = `${server}?act=a_check&key=${key}&ts=${ts}&wait=25`
    const { data } = await axios.post(lp_url)
    
    // console.log('Data',data)

    if (data.failed) { // Если ошибка в ответе сервера уведомлений
      await this.startPolling()
      return
    }

    if (data.error) { // Ошибка в запросе (иная)
      console.log('Polling error', data.error)
      return
    }
    

    if (data.updates.length) // Если есть обновления
    {
      console.log('Пришли обновления')
      this.execute(data.updates)
    }
      
    await this.polling(server,key,data.ts) // Рекурсия
  } catch(e) { // Чтобы бот не упал в случае чего
    console.log('Error on polling',e)
    await this.startPolling() 
  }
}