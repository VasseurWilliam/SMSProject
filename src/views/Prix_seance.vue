<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Modifier</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Modifier prix par séance</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="user.pseudo"
                :items="item"
                item-text="pseudo"
                label="Pseudo"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="user.prix_par_seance"
                :items="item"
                item-text="prix_par_seance"
                label="Prix par seance"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false"
          >Fermer</v-btn
        >
        <v-btn color="blue darken-1" text @click="submitmodif"
          >Valider</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      pseudo: [],
      prix_par_seance: [],
      user: {
        pseudo: "",
        prix_par_seance: ""
      },
    };
  },
  methods: {
    submitmodif() {
        var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + localStorage.id;
        axios
        .put(url, {
            pseudo: this.user.pseudo,
            prix_par_seance: this.user.prix_par_seance,
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