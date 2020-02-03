<template>
  <div>
    <h1>Donnée utilisateur</h1>
    <p>Nom: {{ nom }}</p>
    <p>Prénom: {{ prenom }}</p>
    <p>Pseudo: {{ pseudo }}</p>
    <p>Email: {{ email }}</p>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Modifier</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Modifier les informations du compte</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nom" required :rules="rules" v-model="nom"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Prénom"
                  required
                  :rules="rules"
                  v-model="prenom"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Pseudo"
                  required
                  :rules="rules"
                  v-model="pseudo"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="email"
                  required
                  :rules="rules"
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Mot de passe"
                  required
                  :rules="rules"
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false"
            >Fermer</v-btn
          >
          <v-btn color="blue darken-1" text @click="submitmodif">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      nom: null,
      prenom: null,
      pseudo: null,
      email: null,
      password: null,
      role: null,
      color: null,
      rules: [v => !!v || "Ce champs est requis"]
    };
  },
  methods: {
    submitmodif() {
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/user/" +
        localStorage.id;
      if (this.password === "") {
        axios.put(
          url,
          {
            nom: this.nom,
            prenom: this.prenom,
            pseudo: this.pseudo,
            email: this.email,
            role: this.role,
            color: this.color
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        );
      } else {
        axios.put(
          url,
          {
            nom: this.nom,
            prenom: this.prenom,
            pseudo: this.pseudo,
            email: this.email,
            password: this.password,
            role: this.role,
            color: this.color
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        );
      }
      this.dialog = false;
      window.location.reload();
    }
  },
  async mounted() {
    try {
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/user/" +
        localStorage.id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      });
      this.nom = response.data.data.nom;
      this.prenom = response.data.data.prenom;
      this.pseudo = response.data.data.pseudo;
      this.email = response.data.data.email;
      this.role = response.data.data.role;
      this.color = response.data.data.color;
    } catch (err) {
      if (err.response.status === 403) {
        localStorage.clear();
        await this.$router.push("login");
        window.location.reload();
      }
    }
  }
};
</script>
