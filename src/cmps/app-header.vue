<template>
  <header>
    <div class="logo">
      <img src="src/assets/img/Dollar-Gold-Coin-PNG.png" alt="" />
      <h1>Mr. Bitcoin</h1>
    </div>
    <div class="user-info">
      <p v-if="currUser">{{ currUser.name }}</p>
      <p  v-if="exchangeRate">1$ = {{ exchangeRate }}₿</p>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/stats">Chart</RouterLink>
    </nav>
   
  </header>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      currUser: null,
        exchangeRate: null,
    };
  },
  async created() {
    this.currUser = userService.getUser();
    this.exchangeRate = await bitcoinService.getRate();
  },
};
</script>

<style>
</style>