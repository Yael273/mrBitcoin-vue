<template>
  <header>
    <div class="logo">
      <img src="src/assets/img/Dollar-Gold-Coin-PNG.png" alt="" />
      <h1>Mr Bitcoin</h1>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/stats">Chart</RouterLink>
    </nav>
    <div class="user-info">
      <p>{{ currUser.name }}</p>
      <p>Exchange Rate: {{ exchangeRate }}</p>
    </div>
  </header>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      currUser: null,
      //   exchangeRate: null,
      exchangeRate: "0.00004586",
    };
  },
  async created() {
    this.currUser = userService.getUser();
    // this.exchangeRate = await bitcoinService.getRate();
  },
};
</script>

<style>
</style>