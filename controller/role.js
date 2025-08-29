const response = require("../utils/response");
const roleValidate = require("../validators/role.validator");
const roleAction = require("../actions/roles");

module.exports = {
  async get(req, res) {
    try {
      const request = req.body;
      const roles = await roleAction.get(request);
      return res.json(response.success(roles));
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
      const role = await roleAction.getFirst(request);
      return res.json(response.success(role));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async create(req, res) {
    try {
      const request = req.body;
      const { error, value } = roleValidate.createSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const role = await roleAction.create(value);
      return res.json(response.success(role));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async update(req, res) {
    try {
      const request = req.body;
      const id = req.params.id;
      const { error, value } = roleValidate.updateSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const role = await roleAction.update(id, value);
      return res.json(response.success(role));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
