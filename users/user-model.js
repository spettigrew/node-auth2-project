const bcrypt = require("bcryptjs")
const db = require("../data/db-config")

function find() {
    return db("user")
    .select("id", "username")
}

function findBy(filter) {
    return db("user")
    .where(filter)
    .select("id", "username", "password")
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 12)

    const [id] = await db("user")
    .insert(user)

    return findById(id)
}

function findById(id) {
    return db("user")
    .where({ id })
    .first("id", "username")
}

module.exports = {
    find, 
    findBy,
    findById,
    add,
}