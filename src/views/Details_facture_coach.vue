<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
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
        singleExpand: true,
        headers: [
          {
            text: 'facture coach',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'nom', value: 'nom' },
          { text: 'prenom', value: 'prenom' },
          { text: 'facture total', value: 'facture_mois' },
          { text: '', value: 'data-table-expand' },
        ],
        coach: []
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
      }
    },
  }
</script>