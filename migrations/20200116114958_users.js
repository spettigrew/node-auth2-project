
exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
      users.increments()
      users.string("username", 130).notNullable().unique()
      users.string("password", 130).notNullable()
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
};
