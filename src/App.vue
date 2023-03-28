<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import UserMsg from "@/cmps/user-msg.vue";

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
    <!-- <main class="main-layout"> -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <UserMsg />
    <!-- <AppFooter /> -->
  </section>
</template>

<style scoped lang="scss">
.app {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// section{
//   display: flex;
//   flex-direction: column;
//   // height: 100%;

//   main {
//         flex-grow: 1;
//     }
// }
</style>
