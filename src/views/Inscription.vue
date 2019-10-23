<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm6 md4 lg6>
      <v-form ref="form" v-model="valid" lazy-validation class="text-center">
        <v-text-field
          v-model="user.lastname"
          :counter="15"
          :rules="lastnameRules"
          label="Nom"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="user.firstname"
          :counter="15"
          :rules="firstnameRules"
          label="Prénom"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Email"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          :append-icon="user.show1 ? 'visibility' : 'visibility_off'"
          :type="user.show1 ? 'text' : 'password'"
          :counter="15"
          label="Password"
          required
          @click:append="user.show1 = !user.show1"
          autocomplete="off"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        role: "coach",
        show1: false
      },
      id: "",
      token: "",
      valid: false,
      lastnameRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 15 || "15 caractères maximum"
      ],
      firstnameRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 15 || "15 caractères maximum"
      ],
      pseudoRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 15 || "15 caractères maximum"
      ],
      emailRules: [
        v => !!v || "Ce champs est requis",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 15 || "15 caractères maximum"
      ],
    };
  },
  methods: {
    async validate() {
        var bodyFormData = new FormData();
        bodyFormData.set("nom", this.user.lastname);
        bodyFormData.set("prenom", this.user.firstname);
        bodyFormData.set("email", this.user.email);
        bodyFormData.set("password", this.user.password);
        bodyFormData.set("role", this.user.role);
        await axios.post("https://sportmanagementsystemapi.herokuapp.com/api/user", bodyFormData);
        window.location.reload();
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
