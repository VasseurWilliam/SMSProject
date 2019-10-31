<template>
      <div id="acount">
        <div class="form-1">
          <h1> donnée Utilisateur</h1>
          <p> Username: {{ username }}</p>
          <p> Pseudo: {{ pseudo }}</p>
          <p> Email: {{ email }}</p>
          <p> Date de création: {{ date }}</p>
          <br/>
          <router-link class="route" to="/ModifUser">Modifier</router-link>
        </div>
      </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: null,
      pseudo: null,
      email: null,
      color: null,
    };
  },
  async mounted () {
    try {
      var url = 'https://sportmanagementsystemapi.herokuapp.com/api/user' + localStorage.id;
      const response = await axios.get(url, {
        headers: {
          token: localStorage.token
        }
      })
      this.username = response.data.data.username;
      this.pseudo = response.data.data.pseudo;
      this.email = response.data.data.email;
      this.color = response.data.data.color;
    } catch(err) {
      console.log(err)
    }
  }
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
.route, select {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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