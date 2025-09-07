const response = require("../utils/response");
const cardValidate = require("../validators/card.validator");
const cardDetailValidate = require("../validators/cardDetail.validator");
const cardOnUserValidate = require("../validators/cardOnUser.validator");
const cardAction = require("../actions/cards");
const userLimitAction = require("../actions/userLimits");
const rarityAction = require("../actions/rarities");
const roleAction = require("../actions/roles");
const cardDetailAction = require("../actions/cardDetails");
const cardOnUserAction = require("../actions/cardsOnUsers");
const userAction = require("../actions/users");
const characterRemote = require("../remotes/character");
const rarityController = require("./rarity");

module.exports = {
  async getById(req, res) {
    try {
      const id = req.params.id;
      const request = {
        where: {
          id,
        },
      };
      const card = await cardAction.getFirst(request);
      return res.json(response.success(card));
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
      const cards = await cardOnUserAction.get({
        where: {
          userId: user.id,
        },
      });
      return res.json(response.success(cards));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async randomCreate(req, res) {
    try {
      const { request } = req.body;
      const user = await userAction.getFirst({
        where: {
          request,
        },
      });
      const limit = await userLimitAction.getFirst({
        where: {
          id: user.userLimit.id,
        },
      });
      if (limit.gachaLimit > Date.now()) {
        const date = new Date(limit.gachaLimit);
        const formatted = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()} : ${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;
        return res.json(
          response.success(
            null,
            `This feature is limited, please wait until ${formatted}`
          )
        );
      }
      const character = await characterRemote.random();
      const { error: errorCard, value: valueCard } =
        cardValidate.createSchema.validate({
          characterId: character.data.uuid,
        });
      if (errorCard) {
        return res
          .status(400)
          .json(response.error(errorCard.details[0].message));
      }
      const card = await cardAction.create(valueCard);
      const skipRole = Math.floor(
        Math.random() * (await roleAction.getCount())
      );
      const role = await roleAction.getFirst(skipRole);
      const rarity = await rarityController.random();
      const { error: errorDetail, value: valueDetail } =
        cardDetailValidate.createSchema.validate({
          level: 1,
          cardId: card.id,
          roleId: role.id,
          rarityId: rarity.id,
          atk: rarity.atk,
          health: rarity.health,
        });
      if (errorDetail) {
        return res
          .status(400)
          .json(response.error(errorDetail.details[0].message));
      }
      await cardDetailAction.create(valueDetail);
      const { error: errorCardUser, value: valueCardUser } =
        cardOnUserValidate.createSchema.validate({
          userId: user.id,
          cardId: card.id,
        });
      if (errorCardUser) {
        return res
          .status(400)
          .json(response.error(errorCardUser.details[0].message));
      }
      await cardOnUserAction.create(valueCardUser);
      await userLimitAction.update(limit.id, {gachaLimit: Date.now() + (60 * 60 * 1000)})
      const cardDetail = await cardAction.getFirst({
        where: {
          id: card.id
        }
      });
      return res.json(response.success(cardDetail));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async update(req, res) {
    try {
      const id = req.params.id;
      const request = req.body;
      const { error, value } =
        cardOnUserValidate.updateSchema.validate(request);
      if (error) {
        return res.status(400).json(response.error(error.details[0].message));
      }
      const card = await cardOnUserAction.update(id, value);
      return res.json(response.success(card));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
