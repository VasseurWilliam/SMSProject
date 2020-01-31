<template>
  <v-data-table
    :headers="headers"
    :items="client"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="nom"
    show-expand
    class="elevation-1"
  >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">all data</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      expanded: [],
      client: [],
      singleExpand: true,
      headers: [
        {
          text: "Nom de la société",
          align: "left",
          sortable: false,
          value: "pseudo"
        },
        { text: "Facture total", value: "facture_mois" },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  methods: {
    clicked(value) {
      this.expanded.push(value);
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://sportmanagementsystemapi.herokuapp.com/api/client"
      );
      for (let x = 0; x < response.data.data.length; x++) {
        this.client.push({
          pseudo: response.data.data[x].pseudo,
          facture_mois: response.data.data[x].facture_mois
        });
      }
    } catch (err) {}
  }
};
</script>
