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
          v-model="user.pseudo"
          :counter="15"
          :rules="pseudoRules"
          label="Pseudo"
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
        
        <v-color-picker
          v-model="user.color"
          :hide-canvas="hideCanvas"
          :hide-inputs="hideInputs"
          :hide-mode-switch="hideModeSwitch"
          :mode.sync="mode"
          :show-swatches="showSwatches"
          class="mx-auto"
        ></v-color-picker>
        
        <br />

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
        pseudo: "",
        email: "",
        password: "",
        role: "coach",
        color : "",
        show1: false
      },
      mode: "hexa",
      hideCanvas: true,
      hideInputs: true,
      hideModeSwitch: true,
      showSwatches: false,
      id: "",
      token: "",
      valid: false,
      lastnameRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 15 || "15 caractères maximum"
      ],
      pseudoRules: [
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
        bodyFormData.set("pseudo", this.user.pseudo);
        bodyFormData.set("email", this.user.email);
        bodyFormData.set("password", this.user.password);
        bodyFormData.set("role", this.user.role);
        bodyFormData.set("color", this.user.color);
        try {
          await axios.post("https://sportmanagementsystemapi.herokuapp.com/api/user", bodyFormData);
        } catch (err) {
          if (err.response.status === 403) {
            localStorage.clear();
            this.$router.push("login");
            window.location.reload();
          }
        }      
        window.location.reload();
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
