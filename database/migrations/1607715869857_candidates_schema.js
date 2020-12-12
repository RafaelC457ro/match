'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CandidatesSchema extends Schema {
  up() {
    this.create('candidates', (table) => {
      table.integer('id').notNullable().unique()
      table.string('name', 256).notNullable()
      table.string('city', 256).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('candidates')
  }
}

module.exports = CandidatesSchema
