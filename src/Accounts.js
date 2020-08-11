import React, { createContext } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from './userAWS'; 

const AccountContext = createContext();

const Account = (props) => {
  const authenticate = async (Username, Password) => {
   await new Promise((resolve, reject) => {
    const user = new CognitoUser({
        Username: this.state.username,
        Pool: UserPool,
      });
  
      const authDetails = new AuthenticationDetails({
        Username: this.state.username,
        Password: this.state.pass,
      });
  
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("Sucess!", data);
          resolve(data); 
          
        },
        onFailure: (err) => {
          console.log("onFailure:", err);
          reject(err);
          
        },
  
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
        },
      });
   });
  };

  return <AccountContext.Provider value={{
      authenticate
  }}>
      {props.children}
  </AccountContext.Provider>;
};

export { Account, AccountContext };
