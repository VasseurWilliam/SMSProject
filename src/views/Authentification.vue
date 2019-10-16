<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm6 md4 lg6>
      <v-form ref="form" v-model="valid" lazy-validation class="text-center">
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          required
          @click:append="show1 = !show1"
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
        email: "",
        password: ""
      },
      valid: true,
      show1: false,
      emailRules: [v => !!v || "Ce champs est requis"],
      passwordRules: [v => !!v || "Ce champs est requis"],
      token: "",
      id: ""
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        var bodyFormData = new FormData();
        bodyFormData.set("email", this.user.email);
        bodyFormData.set("password", this.user.password);
        const response = await axios.post(
          "https://sportmanagementsystemapi.herokuapp.com/api/auth",
          bodyFormData
        );
        this.token = response.data.token;
        console.log(this.token);
        this.id = response.data.id;
        window.location.reload();
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      this.$router.push("planning");
    }
    if (localStorage.id) {
      this.id = localStorage.id;
    }
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    },
    id(newId) {
      localStorage.id = newId;
    }
  }
};
</script>
