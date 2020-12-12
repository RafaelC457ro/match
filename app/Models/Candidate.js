'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Candidate extends Model {
  static get visible() {
    return ['id', 'name', 'city', 'start_experience', 'end_experience']
  }

  technologies() {
    return this.hasMany('App/Models/Technology')
  }
}

module.exports = Candidate
