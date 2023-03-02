const { Router } = require("express");
const router = Router();
const controllers = require('../controllers/loginControllers');

router.get("/login", controllers.getLogin);

router.get("/signup", controllers.getSignup);

router.post("/login", controllers.postLogin);

router.post("/signup", controllers.postSignup);

module.exports = router;