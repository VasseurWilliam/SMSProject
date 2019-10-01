import axios from "axios";

const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJsZXlAbS5ydSIsImV4cCI6MTU2NjMzMTM4NH0.YpRmWqDdjFsbFkQPhRdDTZ39NIEUD-Sv830gqP4jJj_Pe55N6m8S_BUCTKfXh9CToyrq2V6G0jMYBEi6c_y5oA"
  }
};

const action = {
  async createGroup(context, groupName) {
    var bodyFormData = new FormData();
    bodyFormData.set("name", groupName);
    await axios
      .post("http://api.setandmatch.tk:8080/group/create", bodyFormData)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        context.commit("ADD_GROUP", result);
      })
      .catch(error => {
        console.log(error);
      });
  },
  // async myGroups(context) {
  //   await axios({ method: 'GET', url: 'http://api.setandmatch.tk:8080/group/getMyGroups',
  //         headers: {autorization: "Bearer: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJsZXlAbS5ydSIsImV4cCI6MTU2NjMzMTM4NH0.YpRmWqDdjFsbFkQPhRdDTZ39NIEUD-Sv830gqP4jJj_Pe55N6m8S_BUCTKfXh9CToyrq2V6G0jMYBEi6c_y5oA"},
  //   })
  //     .then(response => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then(result => {
  //       context.commit("SET_MY_GROUPS", result);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  async myGroups(context) {
    fetch("http://api.setandmatch.tk:8080/group/getMyGroups", requestOptions)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        context.commit("SET_MY_GROUPS", result);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default action;
