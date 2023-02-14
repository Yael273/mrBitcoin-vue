<template>
    <div class="try">

  <div v-if="contact" class="contact-details">
    <!-- <img v-if="contact" -->
    <img
      :src="contact.imgId"
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

    <div class="info-details">
        <h3>Balance</h3>
        <p>{{ contact.balance }}</p>
      </div>
    <div
     v-for="transfer in contact.transfers"
     v-bind:key="transfer"
     class="info-details">
        <h3>Transfer</h3>
        <p>{{ transfer }}</p>
      </div>

        <form @submit.prevent="deposit" v-if="contact">
      <label for="tel">Transfer</label>
      <input type="number" v-model.number="contact.balance" />
      <button class="btn">Save</button>
    </form>

    <TransferFunds/>

    <RouterLink to="/contact">
      <button class="btn">Back</button>
    </RouterLink>
  </div>
          
</div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import TransferFunds from '@/cmps/transfer-funds.vue'
export default {
  data() {
    return {
      contact: null,
    };
  },
  methods:{
    deposit() {
            this.$store.dispatch({ type: 'deposit', name:  this.contact.name = 0,amount:  this.contact.balance })
                .then(newBalace => {
                  console.log('newBalace:', newBalace)
                    // showSuccessMsg('Deposit completed succesfuly, current balance: ' + newBalace)
                    this.contact.balance = 0
                })
                .catch(err => {
                    // showErrorMsg('Deposit failed')
                })

        }
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
  components: {
    TransferFunds,
    },
};
</script>

<style lang="scss"></style>
