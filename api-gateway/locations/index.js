const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const params = {
        TableName: "byw-locations-v1",
        ProjectionExpression: "coordinateHash, #tm, #n, address, postcode, category",
        ExpressionAttributeNames: { "#tm": "timestamp", "#n": "name" }
    };

    const results = await docClient.scan(params).promise();

    return results.Items;
};