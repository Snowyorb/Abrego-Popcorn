import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BodyClassName from "react-body-classname";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", pass: "", Cpass: "" };
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

  render() {
    const onSubmit = (event) => {
      event.preventDefault();

      const user = new CognitoUser({
        Username: username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: username,
        Pass: pass,
      });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log("Sucess!", data);
        },
        onFailure: err => {
          console.log('onFailure:', err); 
        },

        newPasswordRequired: data =>{
          console.log('newPasswordRequired:', data); 
        }
      }); 
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
            <h3 className="pink-title">- Username -</h3>

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
