import { contactService } from "../services/contact.service.js"

export const contactStore = {
    state: {
        contacts: [],
        cart: [],
        lastRemovedContact: null

    },
    getters: {
        cartTotal({ cart }) {
            return cart.reduce((acc, prd) => acc + prd.price, 0)
        },
        cart({ cart }) {
            return cart
        },
        contacts({ contacts }) {
            return contacts
        },
        contactCount({ cart }) {
            return cart.length
        },
    },
    mutations: {
        setContacts(state, { contacts }) {
            // console.log('payload: ', payload)
            state.contacts = contacts
        },
        clearCart(state) {
            state.cart = []
        },
        addToCart(state, { contact }) {
            state.cart.push(contact)
        },
        removeFromCart(state, { contactId }) {
            const idx = state.cart.findIndex(p => p._id === contactId)
            state.cart.splice(idx, 1)
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(p => p._id === contactId)
            state.lastRemovedContact = state.contacts[idx]
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
        clearRemoveContact(state) {
            state.lastRemovedContact = null
        },
        undoRemoveContact(state) {
            state.contacts.unshift(state.lastRemovedContact)
            state.lastRemovedContact = null
        },

    },
    actions: {
        async loadContacts({ commit }, {filterBy}) {
            try {
                const contacts = await contactService.getContacts(filterBy)
                commit({ type: 'setContacts', contacts })
            } catch (err) {
                throw err
            }
        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.deleteContact(payload.contactId)
                commit({ type: 'clearRemoveContact' })
            } catch (err) {
                commit({ type: 'undoRemoveContact' })
                throw err
            }
        },
        saveContact({ commit }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            return contactService.saveContact(contact)
                .then((savedContact) => {
                    commit({ type: actionType, contact: savedContact })
                    return savedContact
                })
        },
    }
}