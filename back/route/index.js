const Router = require("express").Router;
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const newsController = require("../controllers/news-controller");
const authMiddleware = require("../miidlewares/auth-middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/upload", userController.upload);

router.get("/news", newsController.getAll);
router.get("/news/:id", newsController.getNewsId);
router.post("/newsEdit", newsController.updateNews);
router.post("/createnews", authMiddleware, newsController.createNews);
// router.post("/createnews", newsController.createNews);
// router.patch("/updatenews/:id", authMiddleware, newsController.updateNewsContent);
router.post("/updatenews", newsController.updateNewsContent);
router.delete("/news/:id", newsController.deleteNews);

module.exports = router;
