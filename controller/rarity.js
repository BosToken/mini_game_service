const response = require("../utils/response");
const rarityValidate = require("../validators/rarity.validator");
const rarityAction = require("../actions/rarities");

module.exports = {
  async get(req, res) {
    try {
      const request = req.body;
      const rarity = await rarityAction.get(request);
      return res.json(response.success(rarity));
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
      const rarity = await rarityAction.getFirst(request);
      return res.json(response.success(rarity))
    } catch (error) {
      return res.status(500).json(response.error);
    }
  },
  async create(req, res) {
    try {
      const request = req.body;
      const { error, value } = rarityValidate.createSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const rarity = await rarityAction.create(value);
      return res.json(response.success(rarity));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async update(req, res) {
    try {
      const request = req.body;
      const id = req.params.id;
      const { error, value } = rarityValidate.updateSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const rarity = await rarityAction.update(id, value);
      return res.json(response.success(rarity));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
