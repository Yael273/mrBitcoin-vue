<template>
  <main  class=" home-page">
    <div class="welcome" :class="{ change_color: scrollPosition > 30 }">
      <h2 >welcome to</h2>
      <h1 :class="{ display_none: scrollPosition > 400 }">Mr. Bitcoin</h1>
      <!-- <h1>Mr. Bitcoin</h1> -->
    </div>
    <div class="user-info">
      <img
      :src="`https://robohash.org/${currUser.name}?set=set5`"
      :alt="currUser.name"
    />
      <h1>{{ currUser.name }}</h1>
    <h3>Your balance <span>{{ currUser.balance }}</span></h3>
    <p  v-if="exchangeRate">1$ = {{ exchangeRate }}₿</p>
    </div>
  </main>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      currUser: null,
      exchangeRate: null,
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  async created() {
    this.currUser = userService.getUser();
    this.exchangeRate = await bitcoinService.getRate();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style>

</style>