// hashPassword.js
const bcrypt = require('bcryptjs');

const plainTextPassword = 'heyhello'; // Replace with a secure password
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
