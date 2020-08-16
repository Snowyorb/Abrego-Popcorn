import React, { Component, useContext } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BodyClassName from "react-body-classname";
import UserPool from './userAWS'; 
import {AccountContext} from './Accounts'; 
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", pass: "", Cpass: "", messageShow: "none" };
    this.addUsername = this.addUsername.bind(this);
    this.addPass = this.addPass.bind(this);
    this.confirmPass = this.confirmPass.bind(this);

  }

 

  addUsername(event) {
    this.setState({ username: event.target.value });
  }

  addPass(event) {
    this.setState({ pass: event.target.value });
  }

  confirmPass(event) {
    this.setState({ Cpass: event.target.value });
  }

  showMessage() {
    this.setState({ messageShow: "" });
  }

  hideMessage(){
    this.setState({ messageShow: "none" });
  }

  render() {


    const onSubmit = (event) => {
      AccountContext(this.state.username, this.state.pass)
        .then(data => {
          console.log('LOgged IN', data); 
          this.hideMessage();
        })
        .catch(err => {
          console.log('Failed to Login!', err)
          this.showMessage();
        })
     
    };

    return (
      <div>
        <title>Popcorn - Login</title>
        <BodyClassName className="login-page" />
        <h1 id="head1" className="popcorn">
          Popcorn
        </h1>

        <h2 className="under-title">Login</h2>

        <div className="login-form">
          <form onSubmit={onSubmit}>
            <h4 style={{color: 'red', fontSize: 20, display: this.state.messageShow}}>Password or Username was incorrect!</h4>
            <h3 className="pink-title">- Email -</h3>

            <input
              class="login-bar"
              type="text"
              onChange={this.addUsername}
              value={this.state.username}
            ></input>

            <br />
            <br />
            <h3 className="pink-title">- Password -</h3>
            <input
              class="login-bar"
              type="password"
              onChange={this.addPass}
              value={this.state.pass}
            ></input>

            <br />
            <input type="hidden" name="password" />
            <br />
            <input class="sbtn" type="submit" value="Log In"></input>
          </form>

          <br />
          <div id="button">
            <Link to="/Register">
              <a className="url-link">Don't have an account? Create One!</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
