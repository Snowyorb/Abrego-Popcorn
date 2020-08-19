const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion:'2012-08-10'})

exports.handler = (event, context, callback) => {
    console.log(event); 
    
    let id = new Date().getTime().toString(16) + Math.random().toString(16).substr(12);
    
    const params = {
        Item: {
            "Id": {S: id},
            "Name": {S: event.name},
            "Age": {N: event.age},
            "Species": {S: event.species}, 
            "Nickname": {S: event.nickname},
            "Victims": {N: event.victim}
            
        },
        TableName: "people"
    };
    dynamodb.putItem(params, (err, data) => {
        if(err){
            console.log(err)
            callback(err);
        } else{
            console.log(data);
            callback(null, data); 
       }
   })
};
