import React, {Component} from 'react';
import './App.css';
import { Link } from "react-router-dom";
import BodyClassName from 'react-body-classname';

export default class Register extends Component {

    render() {
        return(
            <div>
              <BodyClassName className="register-page" />
        <h1 id="head2" className="popcorn">
          Popcorn
        </h1>
        
        <h2 className="under-title">Register</h2>
      
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
            <h3 className="pink-title">- Confirm Password -</h3>

            <input class="login-bar" type="password"></input>

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
        )
    }
}
