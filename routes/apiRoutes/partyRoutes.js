const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// GET a list of all the parties
router.get('/parties', (req, res) => {
   const sql = `SELECT * FROM parties`;
   const params = [];
   db.all(sql, params, (err, rows) => {
      if (err) {
         res.status(500).json({ error: err.message });
         return;
      }
      res.json({
         message: 'success',
         data: rows
      });
   });
});

// GET a single party based on id
router.get(`/party/:id`, (req, res) => {
   const sql = `SELECT * FROM parties WHERE id = ?`;
   const params = [req.params.id];
   db.get(sql, params, (err, row) => {
      if (err) {
         res.status(400).json({ error: err.message });
         return;
      }
      res.json({
         message: 'success',
         data: row
      });
   });
});

module.exports = router;