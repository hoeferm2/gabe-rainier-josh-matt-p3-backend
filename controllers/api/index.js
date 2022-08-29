const router = require('express').Router();
const clientRoutes = require('./clientRoutes');
const coachRoutes = require('./coachRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/clients', clientRoutes);
router.use('/coaches', coachRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;
