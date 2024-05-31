const pool = require('./database');

exports.getAccountById = async (account_id) => {
  const sql = 'SELECT * FROM accounts WHERE account_id = $1';
  const result = await pool.query(sql, [account_id]);
  return result.rows[0];
};

exports.updateAccount = async (accountData) => {
  const { account_id, first_name, last_name, email } = accountData;
  const sql = 'UPDATE accounts SET first_name = $1, last_name = $2, email = $3 WHERE account_id = $4';
  await pool.query(sql, [first_name, last_name, email, account_id]);
};

exports.updatePassword = async (account_id, hashedPassword) => {
  const sql = 'UPDATE accounts SET password = $1 WHERE account_id = $2';
  await pool.query(sql, [hashedPassword, account_id]);
};
