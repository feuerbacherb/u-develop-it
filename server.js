// dependencies

//const sqlite3 = require('sqlite3').verbose();
const db = require('./db/database');
const express = require("express");
const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');

// express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

// add port and default
const PORT = process.env.PORT || 3001;


// // connect to database
// const db = new sqlite3.Database('./db/election.db', err => {
//    if (err) {
//       return console.error(err.message);
//    }
//    console.log('Connected to the election database');
// })


// // GET for all candidates
// app.get('/api/candidates', (req, res) => {
//    const sql = `SELECT candidates.*, parties.name
//       AS party_name
//       FROM candidates
//       LEFT JOIN parties
//       ON candidates.party_id = parties.id`;
//    const params = [];
//    db.all(sql, params, (err, rows) => {
//       if (err) {
//          res.status(500).json({ error: err.message });
//          return;
//       }

//       res.json({
//          message: 'success',
//          data: rows
//       });
//    });
// });

// // GET a single candidate
// app.get('/api/candidate/:id', (req, res) => {
//    const sql = `SELECT candidates.*, parties.name
//    AS party_name
//    FROM candidates
//    LEFT JOIN parties
//    ON candidates.party_id = parties.id
//    WHERE candidates.id = ?`;
//    const params = [req.params.id];
//    db.get(sql, params, (err, row) => {
//       if (err) {
//          res.status(400).json({ error: err.message });
//          return;
//       }

//       res.json({
//          message: 'success',
//          data: row
//       });
//    });
// });


// // DELETE a candidate
// app.delete('/api/candidate/:id', (req, res) => {
//    const sql = `DELETE FROM candidates WHERE id = ?`;
//    const params = [req.params.id];
//    db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//       if (err) {
//             res.status(400).json({ error: res.message });
//             return;
//       }
//       res.json({
//          message: 'successfully deleted',
//          changes: this.changes
//       });
//    });
// });


// // CREATE a candidate
// app.post('/api/candidate', ({ body }, res) => {
//    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//    if (errors) {
//       res.status(400).json({ error:errors });
//       return;
//    }

//    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
//    const params = [body.first_name, body.last_name, body.industry_connected];
//    db.run(sql, params, function(err, result) {
//       if (err) {
//          res.status(400).json({ error: err.message });
//          return;
//       }

//       res.json({
//          message: 'success',
//          data: body,
//          id: this.lastID
//       });
//    });
// });

// // GET a list of all the parties
// app.get('/api/parties', (req, res) => {
//    const sql = `SELECT * FROM parties`;
//    const params = [];
//    db.all(sql, params, (err, rows) => {
//       if (err) {
//          res.status(500).json({ error: err.message });
//          return;
//       }
//       res.json({
//          message: 'success',
//          data: rows
//       });
//    });
// });

// // GET a single party based on id
// app.get(`/api/party/:id`, (req, res) => {
//    const sql = `SELECT * FROM parties WHERE id = ?`;
//    const params = [req.params.id];
//    db.get(sql, params, (err, row) => {
//       if (err) {
//          res.status(400).json({ error: err.message });
//          return;
//       }
//       res.json({
//          message: 'success',
//          data: row
//       });
//    });
// });

// // PUT a candidates allegiance to a different one
// app.put('/api/candidate/:id', (req, res) => {
//    const errors = inputCheck(req.body, 'party_id');

//    if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//    }

//    const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
//    const params = [req.body.party_id, req.params.id];

//    db.run(sql, params, function(err, result) {
//       if (err) {
//          res.status(400).json({ error: err.message });
//          return;
//       }
//       res.json({
//          message: 'success',
//          data: req.body,
//          changes: this.changes
//       });
//    });
// });

// //  DELETE a party based on id
// app.delete(`/api/party/:id`, (req, res) => {
//    const sql = `DELETE FROM parties WHERE id = ?`;
//    const params = [req.params.id];
//    db.run(sql, params, function(err, result) {
//       if (err) {
//          res.status(400).json({ error: res.message });
//          return;
//       }

//       res.json({ message: 'successfully deleted', changes: this.changes });
//    });
// });



// default to handle any other request (Not Found) Catch all
app.use((req, res) => {
   res.status(404).end();
});

// start server after DB connection
db.on('open', () => {
   // listen for any activity on our port
   app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
   });
});
