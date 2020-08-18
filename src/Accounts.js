import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./userAWS";

const AccountContext = createContext();

const Account = (props) => {
  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });
      console.log("WHAT DA FUCKSNFSFIJF")
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

  return (
    <AccountContext.Provider
      value={{
        authenticate,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
