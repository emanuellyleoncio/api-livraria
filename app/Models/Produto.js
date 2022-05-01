'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
    static get hidden(){
        return ["updated_at", "created_at", "deleted_at"];
    }
}

module.exports = Produto
