//IMPORTS
const knex = require('knex');
const config = require('./knexfile.js');
const db = knex(config.development);

function getAllUsers() {
    return db('users')
}

async function addUser(user) {
    await db('users').insert(user)
    return db('users').where({username:user.username})
}

function findUserByUsername(username){
    return db('users').where({username:username}).first();
}

function removeUser(id) {
    return db('users').where({id:id}).del();
}

function getAllDestinations() {
    return db('destinations')
}

function findUserById(id) {
    return db('users').where({id:id}).first()
}

async function addDestination(newDestination) {
    await db('destinations')
    .where({user_id:newDestination.user_id})
    .insert(newDestination)
}

function removeDestination(id) {
    return db('destinations').where({id:id}).del()
}

function updateDestination(id, newDestination) {
    return db('destinations')
    .where({id:id})
    .update(newDestination)
}

function getUserDestination(user_id) {
    return db('users')
    .join('destinations', 'users.id', 'destinations.user_id')
    .select(
        'users.id as UserId',
        'users.imageUrl as UserImage',
        'destinations.id as DestinationId',
        'destinations.title as DestinationTitle'
    )
    .where({user_id:user_id})
}

function groupDestinations() {
    return db('destinations').count()
    .groupBy('title')
    .select(
        'destinations.id',
        'destinations.title'
    )
}

module.exports = {
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser,
    getAllDestinations,
    findUserById,
    addDestination,
    removeDestination,
    updateDestination,
    getUserDestination,
    groupDestinations
}