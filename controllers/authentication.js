const jwt = require('jwt-simple')
const mysql = require('mysql');
const keys = require('../config/keys');
var crypto = require('crypto');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'recycling',
  password        : 'password',
  database        : 'recycling-project'
});

const tokenForUser = user => {
  return jwt.encode({ sub: user.id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
}

const setPassword = password => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}


exports.signin = (req, res, next) => {
  // User has already had their username and password auth'd
  // We just need to give them a token
  res.json({
    token: tokenForUser(req.user),
  })
}

exports.currentUser = (req, res) => {
  res.send(req.user)
}

exports.signup = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide username and password'})
  }

  // See if a user with the given email exists
  await pool.query(`SELECT * FROM users WHERE \`username\`='${username}'`, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser.length !== 0) {
      return res.status(422).send({ error: 'Username is in use' })
    }
  })

    // If a user with username does NOT exist, create and save user record
    await pool.query(`INSERT INTO users(
      \`username\`)
      VALUES
      ('${username}')`, async (err, user) => {
        if (err) { return next(err) }
        const { salt, hash } = await setPassword(password);
        console.log(salt);
        await pool.query(`UPDATE users SET \`salt\`='${salt}', \`hash\`='${hash}' WHERE \`username\`='${username}'`, async (err, result) => {
         // Respond to request indicating the user was created
        await res.json({ token: tokenForUser(user) })
        })

      })

    

  }
