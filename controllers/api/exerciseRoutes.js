const router = require('express').Router();
const {Exercise } = require('../../models');

router.get("/", (req, res) => {
    Exercise.findAll().then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })



module.exports = router;