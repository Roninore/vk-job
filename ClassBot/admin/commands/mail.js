async function mail(params,ctx) {
    const allReadyExecutors = await db.getAllReadyExecutorsIds()
    await bot.mailing(allReadyExecutors,params)
}

module.exports = mail