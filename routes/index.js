const router = require('express').Router({mergeParams:true});
const polygonRoutes = require('./polygon');
const pointRoutes = require('./point')

router.use('/api/point', pointRoutes);
router.use('/api/polygon', polygonRoutes);


module.exports = router;