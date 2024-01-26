const Router = require('express-promise-router');
const pointController = require('../controllers/pointController')
const pointValidator = require('../utils/validator')

const router = Router({ mergeParams: true });

router.get('/:id', pointController.getPoint);
router.post('/', pointValidator('point'), pointController.createPoint)
router.put('/:id', pointValidator('point'), pointController.updatePoint)

module.exports = router
