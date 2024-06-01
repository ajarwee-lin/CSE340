const pool = require('../database/database');

exports.getAccountById = async (account_id) => {
  const sql = 'SELECT * FROM accounts WHERE account_id = $1';
  try {
    const result = await pool.query(sql, [account_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error fetching account by ID: ' + error.message);
  }
};

exports.updateAccount = async (accountData) => {
  const { account_id, first_name, last_name, email } = accountData;
  const sql = 'UPDATE accounts SET first_name = $1, last_name = $2, email = $3 WHERE account_id = $4';
  try {
    await pool.query(sql, [first_name, last_name, email, account_id]);
  } catch (error) {
    throw new Error('Error updating account: ' + error.message);
  }
};

exports.updatePassword = async (account_id, hashedPassword) => {
  const sql = 'UPDATE accounts SET password = $1 WHERE account_id = $2';
  try {
    await pool.query(sql, [hashedPassword, account_id]);
  } catch (error) {
    throw new Error('Error updating password: ' + error.message);
  }
};
