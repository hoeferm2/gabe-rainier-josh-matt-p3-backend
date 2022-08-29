const router = require('express').Router();
const { Client, Exercise } = require('../../models');

router.get("/", (req, res) => {
    Client.findAll({
      include: [Exercise,]
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })

module.exports = router;