const response = require("../utils/response");
const teamValidate = require("../validators/team.validator");
const teamAction = require("../actions/teams");
const userAction = require("../actions/users");

module.exports = {
  async getById(req, res) {
    try {
      const id = req.params.id;
      const request = {
        where: {
          id,
        },
      };
      const team = await teamAction.getFirst(request);
      return res.json(response.success(team));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async getByUser(req, res) {
    try {
      const { request } = req.body;
      const user = await userAction.getFirst({
        where: {
          request,
        },
      });
      const team = await teamAction.getFirst({
        where: {
          userId: user.id,
        },
      });
      return res.json(response.success(team));
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async update(req, res) {
    try {
      const id = req.params.id;
      const request = req.body;
      const { error, value } = teamValidate.updateSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const team = await teamAction.update(id, {
        cardId: JSON.stringify(value.cardId),
      });
      return res.json(response.success(team));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
