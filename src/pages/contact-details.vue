<template>
    <div class="try">

  <div v-if="contact" class="contact-details">
    <!-- <img v-if="contact" -->
    <img
      :src="`https://robohash.org/${contact.name}?set=set5`"
      :alt="contact.name"
    />
    <!-- <p v-else>loading...</p> -->
    <h2>{{ contact.name }}</h2>
    <div class="info">
      <div class="info-details">
        <h3>Email</h3>
        <p>{{ contact.email }}</p>
      </div>
      <div class="info-details">
        <h3>Phone</h3>
        <p>{{ contact.phone }}</p>
      </div>
    </div>

    <RouterLink to="/contact">
      <button class="btn">Back</button>
    </RouterLink>
  </div>
          
</div>
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
    this.contact = await contactService.getContactById(contactId);
  },
};
</script>

<style lang="scss"></style>
