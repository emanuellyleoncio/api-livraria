'use strict'


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    vendas(){
        return this.hasMany('App/Models/Venda');
    };

    static get hidden(){
        return ["updated_at", "created_at"];
    };
};

module.exports = Cliente
