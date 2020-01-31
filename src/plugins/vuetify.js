import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.css";
import VueI18n from "vue-i18n";

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
  en: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: "Items per page:",
        pageText: "{0}-{1} of {2}"
      }
    }
  },
  fr: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: "Objet par page:",
        pageText: "{0}-{1} de {2}"
      }
    }
  }
};

const i18n = new VueI18n({
  locale: "fr",
  messages
});

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
});
