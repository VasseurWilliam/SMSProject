const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJsZXlAbS5ydSIsImV4cCI6MTU2NTczOTExOX0.SROG0BmLpcNMbupVNOFgSUTYsQlpwuFVDvb0qBtGyFZOaoWJr9gtI_heM792NCoa0oDftLuzwOuK4Bxu0D20bQ"
  }
};

const action = {
  async allUsers(context) {
    fetch("http://api.setandmatch.tk:8080/users/findAll", requestOptions)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        context.commit("SET_USERS", result);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default action;
