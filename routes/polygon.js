const Router = require('express-promise-router');
const polygonController = require('../controllers/polygonController')
const polygonValidator = require('../utils/validator')

const router = Router({ mergeParams: true });

router.get("/",(req,res)=>{res.status(200).json('bla')})
router.get("/:id", polygonController.getPolygon);
router.post("/",polygonValidator('polygon'), polygonController.createPolygon);
router.put("/:id", polygonValidator('polygon'), polygonController.updatePolygon);


module.exports = router;
