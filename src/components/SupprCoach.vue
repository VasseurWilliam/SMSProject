<template>
  <div align="center">
    <v-dialog v-model="dialog_delete" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn class="v-btn error" v-on="on">Supprimer</v-btn>
      </template>
      <v-card>
        <v-card-text>
          &nbsp;
          <p>
            Etes vous sure de vouloir supprimer le coach {{ coach }}
            {{ idCoach }} ?
          </p>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="delete_coach">OUI</v-btn>
          <v-btn color="red darken-1" text @click="dialog_delete = false"
            >NON</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_delete: false
    };
  },
  props: ["coach", "delete_coach", "idCoach"]
};
</script>
