<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm6 md4 lg6>
      <v-form ref="form" v-model="valid" lazy-validation class="text-center">
        <v-text-field
          v-model="user.nom"
          :counter="20"
          :rules="nomRules"
          label="Nom"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="user.prenom"
          :counter="20"
          :rules="prenomRules"
          label="Prénom"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="user.pseudo"
          :counter="30"
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
          :counter="20"
          label="Password"
          required
          @click:append="user.show1 = !user.show1"
          autocomplete="off"
        ></v-text-field>
        
        <v-select
          v-model="user.role"
          :items="item"
          item-text="role"
          label="role"
        ></v-select>

        <v-text-field v-if="this.user.role === 'coach'"
          v-model="user.specialite"
          :rules="specialiteRules"
          :counter="30"
          label="Spécialité"
          autocomplete="off"
        ></v-text-field> 

        <v-color-picker v-if="this.user.role === 'coach'"
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
        nom: "",
        prenom: "",
        pseudo: "",
        email: "",
        password: "",
        role: "",
        color : "",
        specialite: "",
        show1: false
      },
      item: ["coach", "sociéte"],
      mode: "hexa",
      hideCanvas: true,
      hideInputs: true,
      hideModeSwitch: true,
      showSwatches: false,
      id: "",
      token: "",
      valid: false,
      nomRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 20 || "20 caractères maximum"
      ],
      pseudoRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 20 || "20 caractères maximum"
      ],
      prenomRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 20 || "20 caractères maximum"
      ],
      pseudoRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 30 || "20 caractères maximum"
      ],
      emailRules: [
        v => !!v || "Ce champs est requis",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 20 || "20 caractères maximum"
      ],
      specialiteRules: [
        v => !!v || "Ce champs est requis",
        v => v.length < 30 || "30 caractères maximum"
      ]
    };
  },
  methods: {
    async validate() {
        if (this.user.role == 'sociéte') {
          this.user.color = "#000000";
        }
        var bodyFormData = new FormData();
        bodyFormData.set("nom", this.user.nom);
        bodyFormData.set("prenom", this.user.prenom);
        bodyFormData.set("pseudo", this.user.pseudo);
        bodyFormData.set("email", this.user.email);
        bodyFormData.set("password", this.user.password);
        bodyFormData.set("role", this.user.role);
        bodyFormData.set("specialite", this.user.specialite);
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
