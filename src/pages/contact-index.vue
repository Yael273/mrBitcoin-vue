<template>
    <section class="main-container">
        <UserMsg />
        <div>
            <ContactFilter @filter="onSetFilterBy" />
        <RouterLink to="/contact/edit"><button class="btn">Add a Contact</button></RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="filteredContacts" />
        <p v-else >no contacts...</p>
        </div>
    
 
    </section>
   
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { eventBus } from '@/services/eventBus.service.js'

import ContactList from '@/cmps/contact-list.vue'
import ContactFilter from '@/cmps/contact-filter.vue'
import UserMsg from '@/cmps/user-msg.vue'

export default {
    data() {
        return {
            contacts: null,
            filterBy: {},
        }
    },
    async created() {
        this.contacts = await contactService.getContacts()
    },
    methods: {
        async removeContact(contactId) {
            const msg = {
                txt: `Contact ${contactId} deleted.`,
                type: 'success',
                timeout: 2500,
            }
            await contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
            eventBus.emit('user-msg', msg)
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredContacts() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.name))
        },
    },
    components: {
        ContactList,
        ContactFilter,
        UserMsg,
    },
}
</script>

<style lang="scss">
.main-container {
    position: relative;
}
</style>
