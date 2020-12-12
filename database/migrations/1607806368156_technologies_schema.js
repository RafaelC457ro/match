'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TechnologiesSchema extends Schema {
  up() {
    this.create('technologies', (table) => {
      table.increments()
      table.string('name', 256).notNullable()
      table.boolean('is_main_tech').notNullable()
      table
        .integer('candidate_id')
        .index()
        .references('id')
        .inTable('candidates')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('technologies')
  }
}

module.exports = TechnologiesSchema
