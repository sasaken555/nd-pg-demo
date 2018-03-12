var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DBNAME,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT
});

router.get('/findAll', (req, res, next) => {
  pool.query('SELECT * FROM CUSTOMER;')
      .then(rs => res.json(rs.rows))
      .catch(e => console.error(e.stack));
});

router.get('/find/:uid', (req, res, next) => {
  const uid = req.params.uid;
  console.log(`uid = ${uid}`);
  const query = {
    text: 'SELECT * FROM CUSTOMER WHERE uid = $1;',
    values: [uid]
  };
  pool.query(query)
      .then(rs => res.json(rs.rows[0]))
      .catch(e => console.error(e.stack));
});

router.post('/create', (req, res, next) => {
  const uid = req.body.uid;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const emailaddress = req.body.emailaddress;

  const sqlValues = [uid, first_name, last_name, emailaddress];
  const sql = "INSERT INTO CUSTOMER VALUES ($1, $2, $3, $4, '0') RETURNING *;";

  pool.query(sql, sqlValues)
      .then(rs => res.status(201).json(rs.rows[0]))
      .catch(e => console.error(e.stack));
});

router.delete('/delete/:uid', (req, res, next) => {
  const uid = req.params.uid;
  pool.query('DELETE FROM CUSTOMER WHERE uid = $1 RETURNING *;', [uid])
      .then(rs => res.status(204).json(rs.rows[0]))
      .catch(e => console.error(e.stack));
});

module.exports = router;
