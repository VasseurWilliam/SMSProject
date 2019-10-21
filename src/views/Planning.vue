<template>
  <v-layout fill-height>
    <v-flex>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-row>
            <v-dialog v-model="dialog" persistent max-width="800px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Evenement</v-btn>
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
                          label="Client*"
                          required
                          v-model="create_event.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Coach*"
                          required
                          v-model="create_event.nom_coach"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="prix client"
                          v-model="create_event.facture_client"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="prix coach"
                          v-model="create_event.facture_coach"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="description"
                          v-model="create_event.details"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <VueCtkDateTimePicker
                          v-model="create_event.start"
                          format="YYYY-MM-DD HH:mm"
                          formatted="YYYY-MM-DD HH:mm"
                          label="Date et heure de début"
                          minuteInterval="10"
                        />
                        <br />
                        <VueCtkDateTimePicker
                          v-model="create_event.end"
                          format="YYYY-MM-DD HH:mm"
                          formatted="YYYY-MM-DD HH:mm"
                          label="Date et heure de fin"
                          minuteInterval="10"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="create_event.color"
                          :items="color"
                          :rules="[v => !!v || 'Item is required']"
                          label="Couleur"
                          required
                        ></v-select>
                        <v-select
                          v-model="create_event.role"
                          :items="role"
                          :rules="[v => !!v || 'Item is required']"
                          label="type d'évenement"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="red darken-1" text @click="dialog = false"
                    >Fermer</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="validate"
                    >Valider</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-btn outlined class="mr-4" @click="setToday">
            Aujourd'hui
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>arrow_back_ios</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>arrow_forward_ios</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 jour</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-row>
                <v-dialog v-model="dialog_update" persistent max-width="800px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon dark v-on="on">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modifié un évenement</span>
                    </v-card-title>
                    <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Client*"
                          required
                          v-model="create_event.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Coach*"
                          required
                          v-model="create_event.nom_coach"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="prix client"
                          v-model="create_event.facture_client"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="prix coach"
                          v-model="create_event.facture_coach"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="description"
                          v-model="create_event.details"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <VueCtkDateTimePicker
                          v-model="create_event.start"
                          format="YYYY-MM-DD HH:mm"
                          formatted="YYYY-MM-DD HH:mm"
                          label="Date et heure de début"
                          minuteInterval="10"
                        />
                        <br />
                        <VueCtkDateTimePicker
                          v-model="create_event.end"
                          format="YYYY-MM-DD HH:mm"
                          formatted="YYYY-MM-DD HH:mm"
                          label="Date et heure de fin"
                          minuteInterval="10"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="create_event.color"
                          :items="color"
                          :rules="[v => !!v || 'Item is required']"
                          label="Couleur"
                          required
                        ></v-select>
                        <v-select
                          v-model="create_event.role"
                          :items="role"
                          :rules="[v => !!v || 'Item is required']"
                          label="type d'évenement"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="dialog_update = false"
                        >Fermer</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="update_event"
                        >Modifier</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title v-html="selectedEvent.nom_coach"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog_delete" persistent max-width="400px">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <p>Etes vous sure de vouloir supprimer cette evenement ?</p>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="delete_event"
                      >OUI</v-btn
                    >
                    <v-btn
                      color="red darken-1"
                      text
                      @click="dialog_delete = false"
                      >NON</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      today: new Date().toISOString().slice(0, 10),
      focus: new Date().toISOString().slice(0, 10),
      type: "month",
      hideCanvas: false,
      hideInputs: true,
      hideModeSwitch: true,
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      dialog: false,
      dialog_delete: false,
      dialog_update: false,
      enableEvents: "",
      readonly: false,
      multiple: false,
      month: false,
      fullWidth: false,
      reactive: false,
      landscape: false,
      disabled: false,
      token: "",
      id: "",
      mode: "hexa",
      format: "24hr",
      events: [],
      typeToLabel: {
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        "4day": "4 jour"
      },
      role: ["Annonce", "Disponibilité", "RDV"],
      color: ["Rouge", "Vert", "Bleu", "Noir", "Orange", "Jaune"],
      create_event: {
        name: "",
        nom_coach: "",
        start: "",
        end: "",
        details: "",
        color: "",
        durée: "",
        role: "",
        facture_client: "0",
        facture_coach: "0"
      }
    };
  },

  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    async validate(){
      var url = "https://sportmanagementsystemapi.herokuapp.com/api/event/" + localStorage.id;
      if (this.create_event.color != null) {
        if (this.create_event.color == "Rouge") {
          this.create_event.color = "#FF0000";
        } else if (this.create_event.color == "Vert") {
          this.create_event.color = "#11D800";
        } else if (this.create_event.color == "Bleu") {
          this.create_event.color = "#1392FF";
        } else if (this.create_event.color == "Noir") {
          this.create_event.color = "#000000";
        } else if (this.create_event.color == "Orange") {
          this.create_event.color = "#FF9A00";
        } else if (this.create_event.color == "Jaune") {
          this.create_event.color = "#FFFE00";
        }
      }
      if (this.create_event.role != null) {
        if (this.create_event.role == "Annonce") {
          this.create_event.role = 1;
          this.create_event.color = "#B3BAFF";
        } else if (this.create_event.role == "Disponibilité") {
          this.create_event.role = 2;
        } else if (this.create_event.role == "RDV") {
          this.create_event.role = 3;
        }
      }
      var bodyFormData = new FormData();
      bodyFormData.set("titre", this.create_event.name);
      bodyFormData.set("nom_coach", this.create_event.nom_coach);
      bodyFormData.set("details", this.create_event.details);
      bodyFormData.set("date_debut", this.create_event.start);
      bodyFormData.set("date_fin", this.create_event.end);
      bodyFormData.set("color", this.create_event.color);
      bodyFormData.set("role", this.create_event.role);
      bodyFormData.set("facture_client", this.create_event.facture_client);
      bodyFormData.set("facture_coach", this.create_event.facture_coach);
      await axios.post(url, bodyFormData, {
        headers: {
          token: localStorage.token
        }
      });
      this.dialog = false;
      window.location.reload();
    },
    async delete_event(){
      var id = this.selectedEvent.id;
      var url ="https://sportmanagementsystemapi.herokuapp.com/api/event/" + id;
      await axios.delete(url, {
        headers: {
          token: localStorage.token
        }
      });
      window.location.reload();
    },
    async update_event(){
      var url = "https://sportmanagementsystemapi.herokuapp.com/api/event/" + this.selectedEvent.id;
      this.create_event.start = this.create_event.start + " ";
      this.create_event.start =
      this.create_event.start + this.create_event.heureS;
      this.create_event.end = this.create_event.end + " ";
      this.create_event.end = this.create_event.end + this.create_event.heureF;
      await axios.put(
        url,
        {
          titre: this.create_event.name,
          details: this.create_event.details,
          date_debut: this.create_event.start,
          date_fin: this.create_event.end,
          color: this.create_event.color
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      );
      this.dialog_update = false;
      window.location.reload();
    },
    async get_Event(){
      var url ="https://sportmanagementsystemapi.herokuapp.com/api/user/" + localStorage.id;
      url = url + "/event";
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      });
      for (var x = 0; x < response.data.data.length; x++) {
      this.events.push({
        id: response.data.data[x].id,
        name: response.data.data[x].titre,
        nom_coach: response.data.data[x].nom_coach,
        details: response.data.data[x].details,
        start: response.data.data[x].date_debut,
        end: response.data.data[x].date_fin,
        color: response.data.data[x].color,
        user_id: response.data.data[x].user_id,
        facture_coach: response.data.data[x].facture_coach,
        facture_client: response.data.data[x].facture_client
        });
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(events) {
      return events.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  },
  mounted() {
    setTimeout(this.get_Event, 500)
  }  
};
</script>
