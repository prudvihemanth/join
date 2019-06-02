const dbconnection = require('../../server/utils/dbConnection.js');
const logger = require('../utils/logger');

const theftController = {};

theftController.reportCase = async (request, h) => {
  // create theft and assign police
  const sqlQuery = `INSERT INTO THEFT (title, description, location, reportedDate, theftDate, ownerId) VALUES ('${request.payload.title}','${request.payload.description}','${request.payload.location},'${request.payload.reportedDate}','${request.payload.theftDate}','${request.payload.ownerId})`;
  return h.respone(sqlQuery);
};

theftController.bikeFound = async (request, h) => {
  // update the theft and make the police free
  let result;
  await dbconnection.then((conn) => {
    const sqlQuery = `UPDATE THEFT ACTIVE = 0 WHERE id = ${request.payload.theftId} and policeId = ${request.payload.policeId}`;
    const sqlQuery2 = `UPDATE USER ACTIVE = 1 WHERE id = ${request.payload.policeId}`;
    conn.query(sqlQuery);
    result = conn.query(sqlQuery2);
    logger.info('successfully updated the theft and made police free');
    return result;
  }).catch((err) => {
    logger.error(err);
    return h.response(err);
  });
  return result;
};

theftController.getAllCases = async (request, h) => {
  const sqlQuery = 'SELECT * FROM THEFT WHERE active = true';
  let result;
  await dbconnection.then((conn) => {
    result = conn.query(sqlQuery);
    logger.info('successfully fetched the thefts');
    return result;
  }).catch((err) => {
    logger.error(err);
    return h.response(err);
  });
  return result;
};

module.exports = theftController;
