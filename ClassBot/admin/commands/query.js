async function query(params,ctx) {
    try {
        console.log(params,ctx)

        const answer = await global.db.client.query(params)
        this.sendMessage(ctx,JSON.stringify(answer.rows,null,2))
        console.log(answer)
    } catch(e) {
        this.sendMessage(ctx,JSON.stringify(e,null,2))
    }
}

module.exports = query