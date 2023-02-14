import { asynStorageService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    getUser,
    signup,
    login,
    update,
    getLoggedinUser,
    getEmptyCredentials,
    transferFunds,
    // getTransactions,

}

function login({ name }) {
    return asynStorageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.name === name)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ name }) {
    const user = {
        name,
        balance: 100,
        transactions: []
    }
    return asynStorageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function update(user) {
    return asynStorageService.put(STORAGE_KEY, user).then((user) => {
        _saveLoggedinUser(user)
        // save(user)
        return user
    })
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _saveLoggedinUser(user) {
    localStorage.setItem('loggedinUser', JSON.stringify(user))
}

function _setLoggedinUser(user) {
    const userToSave = {
        name: user.name,
        balance: user.balance,
        transactions: user.transactions
    }
    localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        name: '',
        balance: 100,
        transactions: [],
        // imgId: 
    }
}

function getById(userId) {
  return asynStorageService.get(STORAGE_KEY, userId)
}

function transferFunds(name, amount) {
    const loggedInUser = getLoggedinUser()
    if (!loggedInUser) return
    getById(loggedInUser._id)
        .then(user => {
            console.log('user:', user)
            const transaction = {
                toId: utilService.makeId(),
                to: name,
                at: new Date(),
                amount: amount,
            }
            user.transactions.unshift(transaction)
            user.balance -= amount
            return update(user)
        })
        .catch((err) => {
            console.error('Cannot add activitie:', err)
            throw err
        })
}

// function getTransactions(name,  amount){

//    return {
//         toId: utilService.makeId(),
//         to: name,
//         at: new Date(),
//         amount: amount,
//         },
// }

function getUser() {
    return user
}

const user = {
    name: "Puki Ben David",
    balance: 100,
    transactions: [
        {
            toId: "d99e3u2ih329",
            to: "Moshiko",
            at: 2652712571,
            amount: 2
        },
    ]
}

// Test Data
// userService.signup({
//     name: 'muki',
//     balance: 90,
//     transactions: [{
//         toId: "d99e3u2ih329",
//         to: "Moshiko",
//         at: 2652712571,
//         amount: 2
//     },]
// })
// userService.login({ name: 'muki' })
