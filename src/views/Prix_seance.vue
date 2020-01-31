<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tout"
      item-key="pseudo"
      class="elevation-1"
    >
    </v-data-table>
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
                  :items="tout"
                  item-text="pseudo"
                  label="Pseudo"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.prix_par_seance"
                  label="Prix par seance"
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
      tout: [],
      headers: [
        {
          text: "Pseudo",
          align: "left",
          sortable: false,
          value: "pseudo"
        },
        { text: "Prix par séance", value: "prix_par_seance" }
      ],
      user: {
        pseudo: "",
        prix_par_seance: ""
      }
    };
  },
  methods: {
    submitmodif() {
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/user/prix_par_seance/" +
        localStorage.id;
      axios.put(
        url,
        {
          pseudo: this.user.pseudo,
          prix_par_seance: this.user.prix_par_seance
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      );
      this.dialog = false;
      window.location.reload();
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://sportmanagementsystemapi.herokuapp.com/api/coach"
      );
      for (let x = 0; x < response.data.data.length; x++) {
        this.tout.push({
          pseudo: response.data.data[x].pseudo,
          prix_par_seance: response.data.data[x].prix_par_seance
        });
      }
    } catch (err) {}
    try {
      const response = await axios.get(
        "https://sportmanagementsystemapi.herokuapp.com/api/client"
      );
      for (let y = 0; y < response.data.data.length; y++) {
        this.tout.push({
          pseudo: response.data.data[y].pseudo,
          prix_par_seance: response.data.data[y].prix_par_seance
        });
      }
    } catch (err) {}
  }
};
</script>
