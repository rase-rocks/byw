const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

const makeStreamRecordToPut = function(db, tableName) {
    const put = async (newImage) => {

        const params = {
            TableName: tableName,
            Item: newImage
        };
        return db.putItem(params).promise();
    };

    const streamRecordToPut = async(record) => {
        return await put(record.dynamodb.NewImage);
    };

    return streamRecordToPut;
};

const makeGetter = function(db, tableName) {

    const getExisting = async (coordinateHash) => {
        const params = {
            TableName: tableName,
            Key: { "coordinateHash": coordinateHash },
            ProjectionExpression: 'coordinateHash, category'
        };
        return db.getItem(params).promise();
    };

    const streamRecordToLocation = async(record) => {

        const location = record.dynamodb.NewImage;
        const existingLocation = await getExisting(location.coordinateHash);
        return existingLocation;

    };

    return streamRecordToLocation;
}

const makeUpdateCategory = function(db, tableName) {

    const update = async(coordinateHash, category) => {
        const params = {
            "TableName": tableName,
            "Key": {
                "coordinateHash": {
                    "S": coordinateHash
                }
            },
            "UpdateExpression": "SET #attrName =:attrValue",
            "ExpressionAttributeNames": {
                "#attrName": "category"
            },
            "ExpressionAttributeValues": {
                ":attrValue": {
                    "N": `${category}`
                }
            }
        }

        return db.updateItem(params).promise();

    };

    return update;
};

const tbl = "byw-locations-v1";
const INSERT = "INSERT";

const streamRecordToPut = makeStreamRecordToPut(ddb, tbl);
const getRecord = makeGetter(ddb, tbl);
const updateCategory = makeUpdateCategory(ddb, tbl);

const categoryFromItem = (item) => {
    return parseFloat(item.category.N);
};

const coordinateHashFromItem = (item) => {
    return item.coordinateHash.S;
};

const adjustedCategoryFromValues = (oldValue, newValue, factor = 3) => {
    const distance = (Math.abs(newValue - oldValue) / factor);
    return (oldValue > newValue) ?
        oldValue - distance :
        oldValue + distance;
};

const update = async(insertRecord, item) => {
    const currentCategory = categoryFromItem(item);
    const coordinateHash = coordinateHashFromItem(item);
    const targetCategory = categoryFromItem(insertRecord.dynamodb.NewImage);

    const adjustedCategory = adjustedCategoryFromValues(currentCategory, targetCategory);

    let response = "";
    if (adjustedCategory !== currentCategory) {
        const updateResult = await updateCategory(coordinateHash, adjustedCategory);
        response = `Updated: ${coordinateHash} to ${adjustedCategory} | ${JSON.stringify(updateResult)}`;
    }
    else {
        response = `Duplicate submission for ${coordinateHash} at ${adjustedCategory}`;
    }

    return response;
}

exports.handler = async(event, context) => {

    const insertRecords = event.Records
        .filter((record) => record.eventName === INSERT);

    if (insertRecords.length < 1) {
        context.done();
        return;
    }

    for (let i = 0; i < insertRecords.length; i++) {

        const existingRecord = await getRecord(insertRecords[i]);
        const insertRecord = insertRecords[i];

        if (existingRecord.Item) {

            const updateResult = await update(insertRecord, existingRecord.Item);
            console.log(updateResult);

        }
        else {
            const putResult = await streamRecordToPut(insertRecord);
            console.log("Inserted new record: ", insertRecord, JSON.stringify(putResult));
        }

    }

};

