import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#333333",
        error: "#ff0000",
        success: "#45a5ae",

        secondary: "#d3d3d3",
        accent: "#8c9eff",
      },
      dark: {
        primary: "#696969",
        error: "#ff0000",
        success: "#45a5ae",

        secondary: "#d3d3d3",
        accent: "#8c9eff",
      },
    },
  },
});
