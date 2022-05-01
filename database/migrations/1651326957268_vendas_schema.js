'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendasSchema extends Schema {
  up () {
    this.create('vendas', (table) => {
      table.increments();
      table
        .integer('cliente_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('produto_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('produtos')
        .onUpdate('CASCADE');
      table.integer('quantidade');
      table.float('preco_unitario');
      table.float('preco_total');
      table
        .integer('usuario_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.timestamp('data_venda').defaultTo(this.fn.now());
      table.timestamps()
    })
  }

  down () {
    this.drop('vendas')
  }
}

module.exports = VendasSchema
