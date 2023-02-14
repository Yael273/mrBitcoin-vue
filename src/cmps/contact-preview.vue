<template>
    <article>
        <!-- <img
      :src="`https://robohash.org/${contact.name}?set=set5`"
      :alt="contact.name"
    /> -->
        <h2>{{ contact.name }}</h2>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss"></style>
