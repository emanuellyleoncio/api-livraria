'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments();
      table.string('autor', 60).notNullable();
      table.string('editora', 30).notNullable();
      table.string('titulo', 30).notNullable();
      table.integer('ano_publicacao');
      table.float('preco').notNullable();
      table.timestamp('deleted_at', { useTz: true });
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
