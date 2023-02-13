<template>
  <Transition name="slide-fade">
    <div v-if="msg" class="user-msg">
      <p>{{ msg.txt }}</p>
    </div>
  </Transition>
</template>

<script>
import { eventBus } from "@/services/eventBus.service.js";
export default {
  data() {
    return {
      msg: null,
    };
  },
  created() {
    this.unListen = eventBus.on("user-msg", this.showMsg);
  },
  unmounted() {
    this.unListen();
  },
  methods: {
    showMsg(msg) {
      console.log(msg);
      this.msg = msg;
      setTimeout(() => (this.msg = null), msg.timeout || 1500)
    },
  },
};
</script>

<style lang="scss">
.user-msg {
  position: absolute;
  bottom: 0;
  right: 10px;
  background-color: rgba(0, 139, 139, 0.267);
  padding: 0px 10px;
  border-radius: 0.3rem;
  margin-top: 10px;

 
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
