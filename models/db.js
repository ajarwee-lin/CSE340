// models/db.js
const db = require('./dbConnection');

exports.updateAccount = (accountId, { firstName, lastName, email }) => {
  const query = 'UPDATE accounts SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
  return db.execute(query, [firstName, lastName, email, accountId]);
};

exports.changePassword = (accountId, hashedPassword) => {
  const query = 'UPDATE accounts SET password = ? WHERE id = ?';
  return db.execute(query, [hashedPassword, accountId]);
};
