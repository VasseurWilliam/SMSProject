<template>
    <form class="flex flex-col" @submit.prevent="submitmodif">
        <div class="form-1">
            <label for="nom">Modifier votre Nom: </label>
            <input type="text" id="nom" v-model="nom" >
        </div>
        <div class="form-1">
            <label for="prenom">Modifier votre prenom: </label>
            <input type="text" id="prenom" v-model="prenom" >
        </div>
        <div class="form-1">
            <label for="email">Modifier votre email: </label>
            <input type="text" id="email" v-model="email" >
        </div>
        <div class="form-1">
            <label for="Mot de passe">Modifier votre mot de passe: </label>
            <input type="password" id="password" v-model="password" >
        </div>     
        <button>Valider</button>
    </form>
</template>

<script>
import axios from 'axios';
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export default {
    name: "modifUser",
    data() {
        return {
            nom: '',
            prenom: '',
            email: '',
            password: ''
        };
    },
    methods: {
        submitmodif() {
            var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user/' + localStorage.id;
            axios
            .put(url, {
                    nom: this.nom,
                    prenom: this.prenom,
                    email: this.email,
                    password: this.password,
            }, {
                headers: {
                    token: localStorage.token
                }
            });
            this.$router.push('/profil');
        }
    },
}
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=password], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>