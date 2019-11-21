<template>
    <div class="acount">
        <div class="info">
          <h1>Donnée utilisateur</h1>
          <p> Nom: {{ nom }}</p>
          <p> Prénom: {{ prenom }}</p>
          <p> Pseudo: {{ pseudo }}</p>
          <p> Email: {{ email }}</p>
        </div>
          <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Modifier</v-btn>
            </template>
            <v-card>
            <v-card-title>
                <span class="headline">Crée un évenement</span>
            </v-card-title>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="red darken-1" text @click="dialog = false"
                    >Fermer</v-btn
                >
                <v-btn color="blue darken-1" text @click="submitmodif"
                    >Valider</v-btn
                >
            </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';

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
      color: null
    };
  },
  methods: {
    submitmodif() {
        var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + localStorage.id;
        axios
        .put(url, {
            nom: this.nom,
            prenom: this.prenom,
            pseudo: this.pseudo,
            email: this.email,
            password: this.password,
            role: this.role,
            color: this.color,
        }, {
            headers: {
                token: localStorage.token
            }
        });
        this.dialog = false;
        window.location.reload();
    }
},
  async mounted () {
    try {
      var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + localStorage.id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      })
      this.nom = response.data.data.nom;
      this.prenom = response.data.data.prenom;
      this.pseudo = response.data.data.pseudo;
      this.email = response.data.data.email;
      this.role = response.data.data.role;
      this.color = response.data.data.color;
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.info{
  background-color: white;
}
h1 {
  color: white;
}
p {
  color: white;
}
</style>