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
import { eventBus } from "@/services/eventBus.service.js";

import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";

export default {
  async created() {
    this.$store.dispatch({ type: "loadContacts" });
  },
  methods: {
    async removeContact(contactId) {
      const msg = {
        txt: `Contact ${contactId} deleted.`,
        type: "success",
        timeout: 2500,
      };
      this.$store.dispatch({ type: "removeContact", contactId });
      eventBus.emit("user-msg", msg);
    },
    onSetFilterBy(filterBy) {
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
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
