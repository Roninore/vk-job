const axios = require('axios').default
const { stringify } = require('querystring');

module.exports = async function(method, params = {}) {
  try {
    const { data } = await axios.post(`https://api.vk.com/method/${method}/`, stringify({
        access_token: this.access_token,
        v: this.lp_version,
        ...params
    }));
    
    if (data.error) {
      console.log('Error',data.error);
    }
  
    return data
  } catch(e) {
    return {error:e}
  }
  }