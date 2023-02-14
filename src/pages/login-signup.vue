<template>
  <main class="home-page">
    <div class="welcome" :class="{ change_color: scrollPosition > 30 }">
      <h2>welcome to</h2>
      <h1 :class="{ display_none: scrollPosition > 400 }">Mr. Bitcoin</h1>
      <!-- <h1>Mr. Bitcoin</h1> -->
    </div>
    <section class="login-signup">
      <h1>Signup</h1>
      <form @submit.prevent="onSave" v-if="user">
        <label for="text">FullName</label>
        <input
          id="text"
          type="text"
          v-model="user.name"
          placeholder="fullname"
        />
        <button class="btn">Save</button>
      </form>
    </section>
  </main>
</template>

<script>
import { userService } from "../services/user.service";
import { bitcoinService } from "../services/bitcoin.service";

export default {
  data() {
    return {
      user: null,
      exchangeRate: null,
      scrollPosition: null,
    };
  },
  methods: {
    async onSave() {
      // if (this.user) await userService.login(this.user);
      await userService.signup(this.user);
      this.$router.push("/home");
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  async created() {
    // if (this.user) return
   this.user = userService.getEmptyCredentials();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    console.log('this.user:', this.user)
  },
  unmounted() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style>
</style>