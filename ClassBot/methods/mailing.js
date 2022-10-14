
module.exports = async function(ids,message,params) {
    try {
        const MAX_RECIPIENTS = 100
        const promises = []
        
        for(let i = 0; i < ids.length; i+=MAX_RECIPIENTS)
            {
                const peer_ids = ids.slice(i,i+MAX_RECIPIENTS).join(',')
                console.log('Mail ids', peer_ids)
                promises.push(this.sendMessage({peer_ids},message,params))
            }
        
        console.log('Begin')
        const data = await Promise.all(promises)
        console.log(data)
    } catch(e) {
        console.log('Error on mailing')
    }
}