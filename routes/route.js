const express = require("express");
const { app, port } = require("../server");

const userController = require("../controller/user");
const rarityController = require("../controller/rarity");
const roleController = require("../controller/role");
const cardController = require("../controller/card");
const teamController = require("../controller/team");
const battleController = require("../controller/battle");
const authController = require("../controller/auth");

const userRouter = express.Router();
const rarityRouter = express.Router();
const roleRouter = express.Router();
const cardRouter = express.Router();
const teamRouter = express.Router();
const battleRouter = express.Router();
const authRouter = express.Router();

const { authMiddleware } = require("../middlewares/jwtMiddleware");
const limitMiddleware = require("../middlewares/limitMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User
userRouter.get("/id/:id", (req, res) => {
  userController.getById(req, res);
});
userRouter.post("/create", (req, res) => {
  userController.create(req, res);
});
userRouter.post("/update", authMiddleware, (req, res) => {
  userController.update(req, res);
});

// Rarity
rarityRouter.get("/", (req, res) => {
  rarityController.get(req, res);
});
rarityRouter.get("/id/:id", (req, res) => {
  rarityController.getById(req, res);
});
rarityRouter.post("/create", (req, res) => {
  rarityController.create(req, res);
});
rarityRouter.post("/update/:id", (req, res) => {
  rarityController.update(req, res);
});
rarityRouter.get("/random", (req, res) => {
  rarityController.randomTest(req, res);
});

// Role
roleRouter.get("/", (req, res) => {
  roleController.get(req, res);
});
roleRouter.get("/id/:id", (req, res) => {
  roleController.getById(req, res);
});
roleRouter.post("/create", (req, res) => {
  roleController.create(req, res);
});
roleRouter.post("/update/:id", (req, res) => {
  roleController.update(req, res);
});

// Card
cardRouter.get("/user", (req, res) => {
  cardController.getByUser(req, res);
});
cardRouter.post("/random", (req, res) => {
  cardController.randomCreate(req, res);
});
cardRouter.post("/update/:id", (req, res) => {
  cardController.update(req, res);
});

// Team
teamRouter.get("/id/:id", (req, res) => {
  teamController.getById(req, res);
});
teamRouter.get("/user", (req, res) => {
  teamController.getByUser(req, res);
});
teamRouter.post("/update", authMiddleware, (req, res) => {
  teamController.update(req, res);
});

// Battle
battleRouter.get("/enemy/random", authMiddleware, (req, res) => {
  battleController.findBattle(req, res)
})
battleRouter.post("/enemy/request", authMiddleware, (req, res) => {
  battleController.requestBattle(req, res)
})

// Auth
authRouter.post("/login", limitMiddleware.limiter, (req, res) => {
  authController.login(req, res)
})

app.use("/user", userRouter);
app.use("/rarity", rarityRouter);
app.use("/role", roleRouter);
app.use("/card", cardRouter);
app.use("/team", teamRouter);
app.use("/battle", battleRouter);
app.use("/auth", authRouter);
