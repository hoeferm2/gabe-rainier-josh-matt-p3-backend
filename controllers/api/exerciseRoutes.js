const router = require('express').Router();
const {Exercise } = require('../../models');


// DONE
router.get("/", (req, res) => {
    Exercise.findAll().then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  })
//DONE
  router.get("/:id", (req, res) => {
    Exercise.findOne().then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).json({ msg: "womp womp", err })
    })
  });
//DONE

// GET route for getting client by coach id
router.get("/search/:client_id", async (req, res) => {
  try {
    const exerciseClient = await Exercise.findAll({
      where:
      {
        client_id: req.params.client_id
      }
    });

    if (!exerciseClient) {
      res.status(404).json({ message: 'No Exercises found with that client id!' });
      return;
    }

    res.status(200).json(exerciseClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.post('/', async (req, res) => {
    try {
      const newExercise = await Exercise.create({
      exerciseName: req.body.exerciseName,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
      client_id: req.body.client_id,
      dateSelected: req.body.dateSelected
      });
  
      res.status(200).json(newExercise);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const deleteExercise = await Exercise.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deleteExercise) {
        res.status(404).json({ message: 'No Exercise found with this id!' });
        return;
      }
  
      res.status(200).json(deleteExercise);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// TODO: EDIT Exercise

router.put('/:id', async (req, res) => {
  try {
    const updateExercise = await Exercise.update(
      req.body,
      {
      where: {
        id: req.params.id,
      },
    });

    if (!updateExercise) {
      res.status(404).json({ message: 'No Exercise found with this id!' });
      return;
    }

    res.status(200).json(updateExercise);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;