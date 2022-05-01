'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecosSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('rua', 40).notNullable();
      table.string('numero', 40).notNullable();
      table.string('bairro', 40).notNullable();
      table.string('complemento', 40);
      table.string('cep', 20).notNullable();
      table.string('cidade', 40).notNullable();
      table.string('estado', 40).notNullable();
      table.string('pais', 40)
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
    this.drop('enderecos')
  }
}

module.exports = EnderecosSchema
