const Keyboards = require('../const-data/Keyboards')

function badChoice(menuFunction = function() {return null}) {
    try {
    this.messages = [{text: 'Выберите действие из предложенных!',keyboard:Keyboards.empty}]
    this.done()
    menuFunction.call(this)
    return
    } catch (e) {
        console.log('Error on badChoice', e)
        this.error()
        return
    }
}
function error(params = {menuFunction: undefined}) {
    try {
        if (!params.menuFunction) params.menuFunction = this.mainMenu
        params.menuFunction.call(this,{prevMessages:[{text: 'Произошла ошибка!',keyboard:Keyboards.empty}]})
    return 
} catch (e) {
        console.log('Error on error function', e)
        return
    }
}

module.exports = {badChoice,error}