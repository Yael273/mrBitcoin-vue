<template>
  <main class="home-page">
    <h1>{{ currUser.name }}</h1>
    <h3>Balance: {{ currUser.balance }}</h3>
    <p>Rate: {{ exchangeRate }}</p>
  </main>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      currUser: null,
    //   exchangeRate: null,
      exchangeRate: '0.00004586',
    };
  },
  async created() {
    this.currUser = userService.getUser();
    // this.exchangeRate = await bitcoinService.getRate();
  },
};
</script>

