
function waitNextMessage(timeout_s = 3600) { // Ждет сообщения от пользователя
    return new Promise((res,rej) => {
        this.once('data-event',data => res(data))
        setTimeout(() => {
            this.closed = true // Если диалог не продолжается то сессия закрывается
            delete global.bot.sessions[this.peer_id]
            rej('Timeout (waitNextMessage)')
        },timeout_s*1000)
    })
}

function nextAction(ctx,timeout_s = 5) { // Передает сообщение в диалог и ждет ответа от диалога
    return new Promise((res,rej) => {
        this.emit('data-event',ctx)
        this.once('action-performed',() => res(this))
        setTimeout(() => {rej('Timeout (nextAction)')},timeout_s*1000)
    })
}

function done() { this.emit('action-performed')} // Все действия выполнены и можно продолжать выводить текст


module.exports = {waitNextMessage,nextAction,done}