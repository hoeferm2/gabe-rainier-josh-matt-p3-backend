const router = require('express').Router();

const coachRoutes = require('./coachRoutes');

const clientRoutes = require('./clientRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/coaches', coachRoutes);

router.use('/clients', clientRoutes);
router.use('/exercises', exerciseRoutes);

router.get("/check-token", (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        res.json(userData)
    } catch {
        res.status(403).json({ msg: "invalid token" })
    }
})


module.exports = router;
