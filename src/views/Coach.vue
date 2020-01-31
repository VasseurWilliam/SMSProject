<template>
  <v-container fluid>
    <v-data-iterator
      :items="coach"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in coach"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{
                item.pseudo
              }}</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Prenom:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.prenom
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Nom:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.name
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Email:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.email
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Specialite:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.specialite
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Couleur:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.color
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Facture mois:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.facture_mois
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Facture coach:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.prix_par_seance
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <ModifCoach
                      :id="item.id"
                      :nom="item.name"
                      :prenom="item.prenom"
                      :email="item.email"
                      :specialite="item.specialite"
                      :couleur="item.color"
                      :facture_mois="item.facture_mois"
                      :facture_coach="item.prix_par_seance"
                    >
                    </ModifCoach>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    <SupprCoach
                      :coach="item.prenom"
                      :delete_coach="deletecoach"
                    >
                    </SupprCoach>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from "axios";
import ModifCoach from "../components/ModifCoach";
import SupprCoach from "../components/SupprCoach";
export default {
  components: { ModifCoach, SupprCoach },
  data: () => ({
    itemsPerPage: 4,
    coach: [],
    id: null,
    pseudo: null,
    name: null,
    prenom: null,
    email: null,
    password: null,
    role: null,
    specialite: null,
    color: null,
    facture_mois: null,
    prix_par_seance: null
  }),
  async mounted() {
    try {
      const response = await axios.get(
        "https://sportmanagementsystemapi.herokuapp.com/api/coach"
      );
      for (let x = 0; x < response.data.data.length; x++) {
        this.coach.push({
          id: response.data.data[x].id,
          pseudo: response.data.data[x].pseudo,
          name: response.data.data[x].nom,
          prenom: response.data.data[x].prenom,
          email: response.data.data[x].email,
          password: response.data.data[x].password,
          role: response.data.data[x].role,
          specialite: response.data.data[x].specialite,
          color: response.data.data[x].color,
          facture_mois: response.data.data[x].facture_mois,
          prix_par_seance: response.data.data[x].prix_par_seance
        });
      }
    } catch (err) {}
  }
  /*methods: {
            submitmodif() {
                var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + id; //this.selectedElement.id;
                axios
                    .put(url, {
                        nom: this.nom,
                        prenom: this.prenom,
                        pseudo: this.pseudo,
                        email: this.email,
                        specialite: this.specialite,
                        role: this.role,
                        color: this.color,
                        facture_mois: this.facture_mois,
                        prix_par_seance: this.prix_par_seance
                    }, {
                        headers: {
                            token: localStorage.token
                        }
                    });
                this.dialog = false;
                window.location.reload();
            },
            delete_coach() {
                var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + this.coach.id;
                return url
            }
        }*/
};
</script>
