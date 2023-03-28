<template>
  <section class="transfer-funds">
    <form @submit.prevent="onSendTransfer" v-if="contact">
      <label for="tel">Transfer</label>
      <input type="number" v-model.number="contact.transfers" />
      <button class="btn">Save</button>
    </form>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { userService } from "../services/user.service";
export default {
  props: ['updateTransactions'],
  data() {
    return {
      amount: 0,
      contact: null,
      currUser: null,
    };
  },
  methods: {
    onSendTransfer() {
      this.contact = contactService.getContacts()
      console.log('contacts:', contacts)
      this.userService.addMove(this.contact, this.amount);
      this.currUser = userService.getLoggedinUser()
      this.amount = 0;
      console.log('updateTransactions:', this.updateTransactions)
      this.$emit('updateTransactions', this.updateTransactions)
    },
  },
};
</script>

<style>
</style>