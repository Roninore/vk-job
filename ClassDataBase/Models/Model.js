class Model {
    validate() {
        for (const key of Object.keys(this.fields)) {
            if (!this.data.hasOwnProperty(key)) { // Такое поле не передано в конструктор
                if (this.fields[key].canBeNull) // Оно может быть нуллом
                    continue
                else
                    throw Error(`Поле ${key} должно быть передано`)
            }

            if (typeof this.data[key] != typeof this.fields[key].type())
                throw Error(`Несоотвествие типов в поле ${key}, ожидается ${typeof this.fields[key].type()}, а встречено ${typeof this.data[key]}`)
            
            if (this.fields[key].length && this.data[key].length > this.fields[key].length)
            {
                throw Error(`Превышено значение длины в поле ${key}, макс. ${this.fields[key].length}, а встречено ${this.data[key].length}`)
            }

            
        }
        for (const key of Object.keys(this.data)) {
            if (!this.fields.hasOwnProperty(key))
            {
                console.log(`Удаляю лишнее значение ${key}`)
                delete this.data[key]
            }
        }
    }

    saveQuery() {
        this.validate() //Проверка с наличием всех значений
        const keys = Object.keys(this.data)
        const paramIndexes = keys.reduce((acc,el,i) => {
            if (acc == '') return acc + `$${i+1}`
            return acc + `, $${i+1}`
        },'')
        const updateSet = keys.reduce((acc,el,i) => {
            if (el == this.pk) return acc
            if (acc == '') return acc + `${el} = EXCLUDED.${el}`
            return acc + `, ${el} = EXCLUDED.${el}`
        },'')

        const text = `INSERT INTO ${this.tableName}(${keys.join(', ')}) VALUES (${paramIndexes}) ON CONFLICT(${this.pk}) DO UPDATE SET ${updateSet} RETURNING ${this.pk};`
        const values = keys.map(el => {return this.data[el]})
        console.log(text,values)
        return [text,values]
    }

}

module.exports = Model