const dbconnection = require('../../server/utils/dbConnection.js');
const logger = require('../utils/logger');

const userController = {};

userController.getAllUsers = async (request, h) => {
  const sqlQuery = 'SELECT * FROM USER';
  let result;
  await dbconnection.then((conn) => {
    result = conn.query(sqlQuery);
    logger.info('successfully fetched the users');
    return result;
  }).catch((err) => {
    logger.error(err);
    return h.response(err);
  });
  return result;
};


userController.createUser = async (request, h) => {
  const sqlQuery = `INSERT INTO USER (name, email, role) VALUES ('${request.payload.name}','${request.payload.email}','${request.payload.role}')`;
  let result;
  await dbconnection.then((conn) => {
    result = conn.query(sqlQuery);
    logger.info('1 new user record inserted');
    return result;
  }).catch((err) => {
    const errorMessage = 'error saving the user';
    logger.error(errorMessage, err);
    return h.response(errorMessage);
  });
  return result;
};


module.exports = userController;
