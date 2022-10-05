
function validatePhone(string) {
    const answer = string.replace(/\+/g,'').match(/^([78])([0-9]{10}$)/)
    if (answer) return {code:answer[1],phone:answer[2]}
    else return false
}

function validateAge(string) {
    try {
        const answer = Number(string.replace(/[^0-9]/g,''))
        if (answer > 14 && answer < 120) return answer
        return false
    } catch(e) { 
        return false
    }
}

function validateCost(string) {
    try {
        const answer = Number(string.replace(/[^0-9]/g,''))
        if (answer >= 0) return answer
        return false
    } catch(e) { 
        return false
    }
}

module.exports = {validatePhone,validateAge,validateCost}