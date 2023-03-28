<template>
    <section>

        <TransitionGroup name="list" tag="ul" class="contact-list">
       
            <li class="contact-preview" v-for="contact in contacts" :key="contact._id">
                <!-- <RouterLink :to="`/contact/${contact._id}`"> -->
                <ContactPreview :contact="contact" />
                <section class="actions">
                    <RouterLink :to="`/contact/${contact._id}`">
                        <button><font-awesome-icon icon="fa-solid fa-circle-info" /></button>
                    </RouterLink>
                    <RouterLink :to="`/contact/edit/${contact._id}`">
                        <button><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
                    </RouterLink>
                    <button @click="onRemoveContact(contact._id)">    <font-awesome-icon icon="fa-regular fa-trash-can" /></button>
                </section>
            <!-- </RouterLink> -->
            </li>
        </TransitionGroup>

    </section>
</template>

<script>
import ContactPreview from '@/cmps/contact-preview.vue'
export default {
    // props: ['contacts']
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        },
    },
    components: {
        ContactPreview,
    },
}
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
