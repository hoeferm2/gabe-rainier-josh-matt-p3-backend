const router = require('express').Router();
const {Exercise } = require('../../models');

router.get("/", (req, res) => {
    Exercise.findAll().then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })

  router.get("/:id", (req, res) => {
    Exercise.findOne().then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  });

  router.post('/', async (req, res) => {
    try {
      const newExercise = await Exercise.create({
      exerciseName: req.body.exerciseName,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
      client_id: req.body.client_id,
      client_name: req.body.client_name
      });
  
      res.status(200).json(newExercise);
    } catch (err) {
      res.status(400).json(err);
    }
  });




module.exports = router;