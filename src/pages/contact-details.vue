<template>
  <div class="try">
    <div v-if="contact" class="contact-details">
      <!-- <img v-if="contact" -->
      <img :src="contact.imgId" :alt="contact.name" />
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
        <!-- <h3>Balance</h3>
        <p>{{ contact.balance }}</p> -->
      </div>
      <form class="transfer" @submit.prevent="onSave" v-if="contact">
        <label for="number">Transfer</label>
        <input type="text" v-model.number="this.amount" />
        <button class="btn">Save</button>
      </form>

      <RouterLink to="/contact">
        <button class="btn">Back</button>
      </RouterLink>
    </div>

    <h3 v-if="contact.transfers">Transfers</h3>
    <div
        v-for="transfer in contact.transfers"
        v-bind:key="transfer"
        class="info-details-transfer"
      >
    
        <h1>Amount: {{ transfer.amount }}</h1>
        <p>At: {{ transfer.at }}</p>

        <!-- <pre>{{ transfer }}</pre> -->
      </div>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import { userService } from "../services/user.service";
import TransferFunds from "@/cmps/transfer-funds.vue";
import { utilService } from "../services/util.service";
export default {
  data() {
    return {
      contact: null,
      currUser: null,
      amount: 0,
    };
  },
  methods: {
    async onSave() {
      this.contact.balance += this.amount;
      this.currUser.balance -= this.contact.balance;
      const transaction = {
        toId: utilService.makeId(),
        to: this.contact.name,
        at: new Date().toDateString(),
        amount: this.amount,
      };
      this.contact.transfers.unshift(transaction);
      console.log("this.currUser:", this.currUser);
      await userService.update(this.currUser);
      await contactService.saveContact(this.contact);
    },
    deposit() {
      this.$store
        .dispatch({
          type: "deposit",
          name: (this.contact.name = 0),
          amount: this.contact.balance,
        })
        .then((newBalace) => {
          console.log("newBalace:", newBalace);
          // showSuccessMsg('Deposit completed succesfuly, current balance: ' + newBalace)
          this.contact.balance = 0;
        })
        .catch((err) => {
          // showErrorMsg('Deposit failed')
        });
    },
  },
  async created() {
    this.currUser = userService.getLoggedinUser();
    console.log("currUser:", this.currUser);
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
  components: {
    TransferFunds,
  },
};
</script>

<style lang="scss"></style>
