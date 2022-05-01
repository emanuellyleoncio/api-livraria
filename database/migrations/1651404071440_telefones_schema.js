'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefonesSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.increments()
      table.string('celular', 20).notNullable();
      table.string('residencial', 20);
      table
        .string('cliente_cpf')
        .notNullable()
        .references('cpf')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefonesSchema
