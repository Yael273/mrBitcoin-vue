<template>
  <section class="transfer-funds">
    <form @submit.prevent="onSave" v-if="contact">
      <label for="tel">Transfer</label>
      <input
        type="number"
        v-model.number="contact.transfers"
      />
      <button class="btn">Save</button>
    </form>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>