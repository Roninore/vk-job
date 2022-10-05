
module.exports = function(updates) {
    if (!updates) return

    // console.log('updates:',updates

    updates.forEach(item => {
        if (item.type == 'message_new') {
            this.emit('message',item.object)
        }
        // if (item.type = 'message_event') {
        //     console.log(item)
            // this.editMessage({
            //     peer_id: item.object.peer_id,
            //     message: 'Прив', 
            //     conversation_message_id: item.object.conversation_message_id,
            //     keyboard: {inline: true, buttons: []}
            // })
        //     // this.emit('callback',)
        // }      
    })
}