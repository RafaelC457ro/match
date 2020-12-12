'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Technology extends Model {
  static get visible() {
    return ['name', 'is_main_tech']
  }
}

module.exports = Technology
