const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'recycling',
  password        : 'password',
  database        : 'recycling-project'
});

exports.getCenterDeliveries = (req, res) => {
  res.send({getDeliveries: 'getDeliveries'});
}

exports.addDelivery = (req, res, next) => {
  const { dateTime, centerId } = req.body;
  pool.query(`INSERT INTO deliveries(
    \`center_id\`) 
    VALUES
    ('${centerId}')`, (err, delivery) => {
      if (err) { return next(err) }
      console.log(delivery);
      res.send({id: delivery.insertId});
    })
}

exports.getUnverifiedDeliveries = (req, res) => {
  res.send({getDeliveries: 'getUnverifiedDeliveries'});
}