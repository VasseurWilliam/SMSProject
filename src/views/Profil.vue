<template>
    <div id="acount">
        <div class="form-1">
          <h1>Donnée utilisateur</h1>
          <p> Nom: {{ nom }}</p>
          <p> Prénom: {{ prenom }}</p>
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
            <v-card-text>
                <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nom"
                          required
                          v-model="nom"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Prénom"
                          required
                          v-model="prenom"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="email"
                          required
                          v-model="email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Mot de passe"
                          required
                          v-model="password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
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
      email: null,
      password: null
    };
  },
  methods: {
    submitmodif() {
        var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + localStorage.id;
        axios
        .put(url, {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
        }, {
            headers: {
                token: localStorage.token
            }
        });
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
      this.email = response.data.data.email;
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.route, select {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type=password], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>