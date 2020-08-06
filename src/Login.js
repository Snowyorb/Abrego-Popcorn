import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BodyClassName from 'react-body-classname';

export default class Login extends Component {
  render() {
    return (
      <div>
        <title>Popcorn - Login</title>
        <BodyClassName className="login-page" />
        <h1 id="head1" className="popcorn">
          Popcorn
        </h1>
        
        <h2 className="under-title">Login</h2>
      
        <div className="login-form">
          <form>
            <h3 className="pink-title">- Username -</h3>

            <input class="login-bar" type="text"></input>

            <br />
            <br />
            <h3 className="pink-title">- Password -</h3>

            <input class="login-bar" type="password"></input>

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
