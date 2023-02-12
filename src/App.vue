<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <section>
    <AppHeader />
    <main class="main-layout">
      <RouterView />
    </main>
    <!-- <AppFooter /> -->
  </section>
</template>

<style scoped lang="scss">
// section{
//   display: flex;
//   flex-direction: column;

//   main {
//         flex-grow: 1;
//     }
// }
</style>
