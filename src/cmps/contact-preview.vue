<template>
    <article>
        <RouterLink :to="`/contact/${contact._id}`">
        <img
      :src="contact.imgId"
      :alt="contact.name"
    />
</RouterLink>
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
