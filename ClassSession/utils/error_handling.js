const Keyboards = require('../const-data/Keyboards')

function badChoice(menuFunction = function() {return null}) {
    try {
    this.messages = [{text: 'Выберите действие из предложенных!',keyboard:Keyboards.empty}]
    this.done()
    menuFunction.call(this)
    return
    } catch (e) {
        console.log('Error on badChoice', e)
        this.error(this.mainMenu)
        return
    }
}
function error(menuFunction = function() {return null}) {
    try {
    this.messages = [{text: 'Произошла ошибка!',keyboard:Keyboards.empty}]
    this.done()
    menuFunction.call(this)
    return 
} catch (e) {
        console.log('Error on error function', e)
        return
    }
}

module.exports = {badChoice,error}