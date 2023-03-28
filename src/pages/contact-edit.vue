<template>
  <section v-if="contact" class="main-layout contact-edit">
    <h1>{{ getTitle }}</h1>
    <form @submit.prevent="onSave" v-if="contact">
      <label for="text">FullName</label>
      <input
        id="text"
        type="text"
        v-model="contact.name"
        placeholder="fullname"
      />
      <label for="email">Email</label>
      <input
        type="email"
        v-model="contact.email"
        placeholder="sophie@example.com"
      />
      <label for="tel">Phone number</label>
      <input
        type="tel"
        v-model.number="contact.phone"
        placeholder="123-4567-8901"
      />
      <button class="btn">Save</button>
    </form>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contact = await contactService.getContactById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async onSave() {
      await contactService.saveContact(this.contact);
      this.$router.push("/contact");
    },
  },
  computed:{
    getTitle(){
        return  (this.contact._id ? 'Edit' : 'Add') + ' Contact'
    }
  }
};
</script>

<style lang="scss">
</style>
