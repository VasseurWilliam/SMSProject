<template>
  <v-data-table
    :headers="headers"
    :items="coach"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="nom"
    show-expand
    class="elevation-1"
  >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">Peek-a-boo!</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        expanded: [],
        coach:[],
        singleExpand: true,
        headers: [
          {
            text: 'Nom',
            align: 'left',
            sortable: false,
            value: 'nom',
          },
          { text: 'Prenom', value: 'prenom' },
          { text: 'Facture total', value: 'facture_mois' },
          { text: '', value: 'data-table-expand' },
        ],
      }
    },
    methods: {

    },
    async mounted() {
      const response = await axios.get("https://sportmanagementsystemapi.herokuapp.com/api/coach");
      for (var x = 0; x < response.data.data.length; x++) {
        this.coach.push({
          nom: response.data.data[x].nom,
          prenom: response.data.data[x].prenom,
          facture_mois: response.data.data[x].facture_mois,
        });
        console.log(this.coach);
      }
    },
  }
</script>