<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
  name: "App",
  data: () => ({
    //
  })
};
</script>
