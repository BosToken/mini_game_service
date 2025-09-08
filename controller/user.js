const response = require("../utils/response");
const hash = require("../utils/hash");
const userValidate = require("../validators/user.validator");
const teamValidate = require("../validators/team.validator");
const userAction = require("../actions/users");
const teamAction = require("../actions/teams");
const userLimitAction = require("../actions/userLimits");

module.exports = {
  async get(req, res) {
    try {
      const request = req.body;
      const users = await userAction.get(request);
      return res.json(response.success(users));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async getById(req, res) {
    try {
      const id = req.params.id;
      const request = {
        where: {
          id,
        },
      };
      const user = await userAction.getFirst(request);
      return res.json(response.success(user));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async create(req, res) {
    try {
      const request = req.body;
      const { error, value } = userValidate.createSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      if (value.password) {
        value.password = await hash.hash(value.password);
      }
      const user = await userAction.create(value);
      const { error: errorTeam, value: valueTeam } =
        teamValidate.createSchema.validate({ userId: user.id });
      if (errorTeam) {
        return res
          .status(400)
          .json(response.error(errorTeam.details[0].message));
      }
      await teamAction.create(valueTeam);
      await userLimitAction.create({
        userId: user.id,
        gachaLimit: 0,
        battleLimit: 0,
      });
      return res.json(response.success(user));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async update(req, res) {
    try {
      const request = req.body;
      const id = req.user.id;
      const { error, value } = userValidate.updateSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const user = await userAction.update(id, value);
      return res.json(response.success(user));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
