<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import UserMsg from '@/cmps/user-msg.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  },
};
</script>

<template>
  <section class="app">
    <AppHeader />
    <main class="main-layout">
      <RouterView />
    </main>
    <UserMsg />
    <!-- <AppFooter /> -->
  </section>
</template>

<style scoped lang="scss">
.app {
    position: relative;
}
// section{
//   display: flex;
//   flex-direction: column;

//   main {
//         flex-grow: 1;
//     }
// }
</style>
