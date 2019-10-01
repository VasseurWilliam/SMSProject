import axios from "axios";

const action = {
  async authentification(context, user) {
    var bodyFormData = new FormData();
    bodyFormData.set("email", user.email);
    bodyFormData.set("password", user.password);
    await axios
      .post("http://127.0.0.1:8000/api/auth/", bodyFormData)
      .then(response => {
        console.log("response auth", response);
        console.log("header user", window.localStorage);
        return response;
      })
      .then(result => {
        context.commit("LOGIN_REQUEST", result);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async inscription(context, user) {
    var bodyFormData = new FormData();
    bodyFormData.set("nom", user.firstname);
    bodyFormData.set("prenom", user.lastname);
    bodyFormData.set("email", user.email);
    bodyFormData.set("password", user.password);
    bodyFormData.set("role", user.role);
    await axios
      .post("http://127.0.0.1:8000/api/user/", bodyFormData)
      .then(response => {
        console.log("response inscription", response);
        return response.json();
      })
      .then(result => {
        context.commit("REGISTER_REQUEST", result);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default action;
