'use strict'

const AdonisType = require('../../types')
/** @typedef {typeof AdonisType.Migration.Table} Table*/

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up() {
    this.create('user_roles', (/** @type {Table} */ table) => {
      table.increments()
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
      table.integer('team_id').unsigned().references('teams.id').onDelete('cascade')
      table.integer('group_id').unsigned().references('groups.id').onDelete('cascade')

      table.index([
        'user_id',
        'team_id'
      ])

      table.timestamps()
    })
  }

  down() {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
