'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CandidatesSchema extends Schema {
  up() {
    this.create('candidates', (table) => {
      table.integer('id').notNullable().unique().primary()
      table.string('name', 256).notNullable()
      table.string('city', 256).notNullable()
      table.integer('start_experience').notNullable()
      table.integer('end_experience')
      table.timestamps()
    })
  }

  down() {
    this.drop('candidates')
  }
}

module.exports = CandidatesSchema
