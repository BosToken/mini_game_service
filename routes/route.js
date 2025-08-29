const express = require("express");
const { app, port } = require("../server");

const userController = require("../controller/user");
const rarityController = require("../controller/rarity");
const roleController = require("../controller/role");
const cardController = require("../controller/card");
const teamController = require("../controller/team");

const userRouter = express.Router();
const rarityRouter = express.Router();
const roleRouter = express.Router();
const cardRouter = express.Router();
const teamRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User
userRouter.get("/id/:id", (req, res) => {
  userController.getById(req, res);
});
userRouter.post("/create", (req, res) => {
  userController.create(req, res);
});
userRouter.post("/update/:id", (req, res) => {
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
teamRouter.post("/update/:id", (req, res) => {
  teamController.update(req, res);
});

app.use("/user", userRouter);
app.use("/rarity", rarityRouter);
app.use("/role", roleRouter);
app.use("/card", cardRouter);
app.use("/team", teamRouter);
