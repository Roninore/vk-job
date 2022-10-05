const Model = require('./Model.js')

class Responses extends Model {
    constructor(params) {
        super()
        this.tableName = 'moderators'
        this.pk = 'id'
        this.fields = {
            id: {type: Number,pk:true },
            type: {type: String, length:20}
        }
        this.data = params

        this.validate()
    }
}

module.exports = Responses