import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_G6K8cPQRA",
    ClientId: "12dbcjovhj2bjnkfn8rscjq73j",
  };

  export default new CognitoUserPool(poolData);