<template>
  <section class="main-layout main-container">
    <!-- <router-view></router-view> -->
    <div>
      <ContactFilter @filter="onSetFilterBy" />
      <RouterLink to="/contact/edit"
        ><button class="btn">Add a Contact</button></RouterLink
      >
      <ContactList
        @remove="removeContact"
        v-if="contacts"
        :contacts="contacts"
      />
      <p v-else>no contacts...</p>
    </div>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { eventBus } from "@/services/eventBus.service.js";

import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";

export default {
  data() {
    return {
      // contacts: null,
      filterBy: {},
    };
  },
  computed: {
    contacts() { return this.$store.state.contactStore.contacts },
    // filteredContacts() {
    //   const regex = new RegExp(this.filterBy.txt, "i");
    //   return this.contacts.filter((contact) => regex.test(contact.name));
    // },
  },
  async created() {
    // this.$store.dispatch({type: 'loadContacts'})
    this.loadContacts();
  },
  methods: {
    loadContacts() {
      // this.contacts = await contactService.getContacts(this.filterBy);
      return this.$store.dispatch({type: 'loadContacts'})
    },
    async removeContact(contactId) {
      const msg = {
        // txt: `Contact ${contactId} deleted.`,
        txt: `Contact deleted.`,
        type: "success",
        timeout: 2500,
      };
      // await contactService.deleteContact(contactId);
      await this.$store.dispatch({type: 'removeContact', contactId})
      this.contacts = this.contacts.filter(
        (contact) => contact._id !== contactId
      );
      eventBus.emit("user-msg", msg);
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy;
      this.loadContacts()
    },
  },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>

<style lang="scss">
.main-container {
  position: relative;
}
</style>
