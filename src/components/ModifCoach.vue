<template>
    <div align="center">
        <v-dialog v-model="dialog" persistent max-width="800px">
            <template v-slot:activator="{ on }">
                <v-btn class="v-btn success" v-on="on">Modifier</v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Prénom"
                                        required
                                        v-model="prenom"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Nom"
                                        required
                                        v-model="nom"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Email"
                                        required
                                        v-model="email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Spécialité"
                                        required
                                        v-model="specialite"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="couleur"
                                        required
                                        v-model="couleur"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Facture Mois"
                                        required
                                        v-model="facture_mois"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Facture Coach"
                                        required
                                        v-model="facture_coach"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red darken-1" text @click="dialog = false"
                    >Fermer</v-btn>
                    <v-btn color="blue darken-1" text @click="submitmodif(prenom)"
                    >Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                dialog: false
            };
        },
        props: ['prenom', 'nom', 'email', 'specialite', 'couleur', 'facture_mois', 'facture_coach', 'submitmodif']
    }
</script>
