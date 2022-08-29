const router = require('express').Router();
const { Client, Coach, } = require('../../models');

router.get("/", (req, res) => {
    Coach.findAll({
      include: [Client,]
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })

module.exports = router;