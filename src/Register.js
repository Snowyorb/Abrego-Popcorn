import React, { Component, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BodyClassName from "react-body-classname";
import { CognitoUserPool } from "amazon-cognito-identity-js";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", pass: "" };
    this.addUsername = this.addUsername.bind(this);
    this.addPass = this.addPass.bind(this);
  }

  addUsername(event) {
    this.setState({ username: event.target.value });
  }

  addPass(event) {
    this.setState({ pass: event.target.value });
  }

  render() {
    // const [username, setUsername] = useState('');
    // const [pass, setPass] = useState('');

    const poolData = {
      UserPoolId: "us-east-2_aRcpJEIUd",
      ClientId: "127aet6koopk3mu71uvkp4ag1i",
    };

    const UserPool = new CognitoUserPool(poolData);

    const onSubmit = (event) => {
      event.preventDefault();

      UserPool.signUp(this.state.username, this.state.pass, [], null, (err, data) => {
        if (err) console.error(err);
        console.log(data);
      });
    };
    return (
      <div>
        <title>Popcorn - Register</title>
        <BodyClassName className="register-page" />
        <h1 id="head2" className="popcorn">
          Popcorn
        </h1>

        <h2 className="under-title">Register</h2>

        <div className="login-form">
          <form onSubmit={onSubmit}>
            <h3 className="pink-title">- Username -</h3>

            <input
              class="login-bar"
              onChange={this.addUsername}
              value={this.state.username}
              type="text"
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
            {/* <h3 className="pink-title">- Confirm Password -</h3>

            <input class="login-bar" type="password"></input>

            <br /> */}
            <input type="hidden" name="password" />
            <br />
            <input class="sbtn" type="submit" value="Create an Account"></input>
          </form>

          <br />
          <div id="button">
            <Link to="/">
              <a className="url-link">Have an Account? Login!</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
