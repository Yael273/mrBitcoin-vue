<template>
  <!-- <div :on-click="onCloseModal" class="modal"> -->
    <section v-if="contact" class="main-layout contact-edit">
      <h1>{{ getTitle }}</h1>
      <form @submit.prevent="onSave" v-if="contact">
        <label for="text">FullName</label>
        <input
          id="text"
          type="text"
          v-model="contact.name"
          placeholder="fullname"
        />
        <label for="email">Email</label>
        <input
          type="email"
          v-model="contact.email"
          placeholder="sophie@example.com"
        />
        <label for="tel">Phone number</label>
        <input
          type="tel"
          v-model.number="contact.phone"
          placeholder="123-4567-8901"
        />
        <button class="btn">Save</button>
      </form>
    </section>
  <!-- </div> -->
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contact = await contactService.getContactById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async onSave() {
      await contactService.saveContact(this.contact);
      this.$router.push("/contact");
    },
    // onCloseModal() {
    //   this.$router.push("/contact");
    // },
  },
  computed: {
    getTitle() {
      return (this.contact._id ? "Edit" : "Add") + " Contact";
    },
  },
};
</script>

<style lang="scss">
// .modal {
//   // display: none;
//   position: fixed;
//   z-index: 1;
//   left: 0;
//   top: 0;
//   /* inset: 0; */
//   min-width: 100%;
//   min-height: 100%;
//   /* background-color: rgb(0, 0, 0); */
//   background-color: rgba(0, 0, 0, 0.597);
// }

// .modal-content {
//   text-align: center;
//   border-radius: 1em;
//   background-color: aquamarine !important;
//   margin: 15% auto !important;
//   padding: 5px;
//   width: 50%;
// }
// .modal1 {
//   position: fixed;
//   z-index: 999;
//   top: 20%;
//   left: 50%;
//   width: 300px;
//   margin-left: -150px;
//   background-color: aquamarine;
// }
</style>
