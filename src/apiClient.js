import axios from "axios";
const url = "http://localhost:3000/";

export class ApiClient {

  constructor(token,logoutHandler){
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  apiCall(method, url, data) {
    console.log(url)
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token
      },
      data,
    }).catch((error) => {
      if(error.response.status == 403){
        this.logoutHandler();
        return Promise.reject;
      } else{

      throw error;
      }
    });
  }

  login(username,password){
    console.log("username",username)
    console.log("password",password)
    return this.apiCall("post",`${url}auth`, {
      userName: username,
      password: password
    })
  }

  register(username,password){
    return this.apiCall("post",`${url}register`,{
      userName: username,
      password: password
    })
  }

  getUserlist(){
    return this.apiCall("get", `${url}userlist`);
  }

  getEvents() {
    return this.authenticatedCall("get", url);
  }

  addEve(name, location, information, date) {
    return this.authenticatedCall("post", url, { name, location, information, date });
  }

  removeEve(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEve(id, name, location, information, date) {
    return this.authenticatedCall("put", `${url}${id}`, { name, location, information, date });
  }

  getByLocation(location) {
    return this.authenticatedCall("get", `${url}location/${location}`) ;
  }

  getByName(name) {
    return this.authenticatedCall("get", `${url}name/${name}`) ;
  }
}