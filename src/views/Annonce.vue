<template>
  <v-layout fill-height>
    <v-flex>
      <v-sheet height="64">
        <v-toolbar flat color="white">
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
          :weekdays="weekdays"
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
                <v-btn icon dark>
                  <v-icon>mail</v-icon>
                </v-btn>
              </v-row>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <div v-if="user.admin">
                <v-dialog v-model="dialog_delete" persistent max-width="400px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text>
                      <p>Etes vous sure de vouloir supprimer cette annonce ?</p>
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
              </div>
            </v-toolbar>
            <v-card-text>
              <p>
                détails :
                <span v-html="selectedEvent.details"></span>
              </p>
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

const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0];

export default {
  data() {
    return {
      today: new Date().toISOString().slice(0, 10),
      focus: new Date().toISOString().slice(0, 10),
      weekdays: weekdaysDefault,
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
      mode: "hexa",
      format: "24hr",
      events: [],
      typeToLabel: {
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        "4day": "4 jour"
      },
      user: {
        lastname: "",
        firstname: "",
        role: "",
        admin: "",
        client: ""
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
    async delete_event() {
      let id = this.selectedEvent.id;
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/event/" + id;
      try {
        await axios.delete(url, {
          headers: {
            token: localStorage.token,
            id: localStorage.id
          }
        });
      } catch (err) {
        if (err.response.status === 403) {
          localStorage.clear();
          await this.$router.push("login");
          window.location.reload();
        }
      }
      window.location.reload();
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
  async mounted() {
    let urlGet =
      "https://sportmanagementsystemapi.herokuapp.com/api/annonce/" +
      localStorage.id;
    try {
      const response = await axios.get(urlGet);
      for (let x = 0; x < response.data.data.length; x++) {
        this.events.push({
          id: response.data.data[x].id,
          name: response.data.data[x].titre,
          details: response.data.data[x].details,
          start: response.data.data[x].date_debut,
          end: response.data.data[x].date_fin,
          color: response.data.data[x].color
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        localStorage.clear();
        await this.$router.push("login");
        window.location.reload();
      }
    }
    try {
      let url =
        "https://sportmanagementsystemapi.herokuapp.com/api/user/" +
        localStorage.id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token,
          id: localStorage.id
        }
      });
      this.user.lastname = response.data.data.nom;
      this.user.firstname = response.data.data.prenom;
      this.user.role = response.data.data.role;
    } catch (err) {
      if (err.response.status === 403) {
        localStorage.clear();
        await this.$router.push("login");
        window.location.reload();
      }
    }
    if (this.user.role === "admin") {
      this.user.admin = true;
    }
  }
};
</script>
