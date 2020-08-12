import React, { Component } from "react";
import "./App.css";
import { Link, Redirect } from "react-router-dom";
import BodyClassName from "react-body-classname";
import UserPool from "./userAWS";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", pass: "", Cpass: "", messageShow: "none", toHome: false };
    this.addUsername = this.addUsername.bind(this);
    this.addPass = this.addPass.bind(this);
    this.confirmPass = this.confirmPass.bind(this);
    this.showMessage = this.showMessage.bind(this)
  }

  showMessage() {
    this.setState({ messageShow: "" });
  }

  hideMessage() {
    this.setState({ messageShow: "none" });
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
    if (this.state.toHome) {
      return <Redirect to='/' />
    }

    const onSubmit = (event) => {
      event.preventDefault();

      UserPool.signUp(
        this.state.username,
        this.state.pass,
        [],
        null,
        (err, data) => {
          if (err) {
            console.error(err)
            this.showMessage();
          }
          else {this.hideMessage(); this.setState({ toHome: true });}
          console.log(data);
        }
      );
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
          <h4
              style={{
                color: "red",
                fontSize: 20,
                display: this.state.messageShow,
              }}
            >
              Password and Email must be more then 6 characters long
            </h4>
            <h3 className="pink-title">- Email -</h3>

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
            {/* <h3 className="pink-title">- Confirm Password -</h3> */}

            {/* <input class="login-bar" type="password" onChange={this.confirmPass}
              value={this.state.Cpass}></input> */}

            <br />
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
