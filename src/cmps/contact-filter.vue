<template>
    <div class="contact-filter">
        <h1>Search Contacts</h1>
        <input @input="onFilter" v-model="filterBy.text" type="text" placeholder="search">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                text: '',
            }
        }
    },
    methods: {
        onFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
</script>

<style lang="scss"></style>
