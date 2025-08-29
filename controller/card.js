const response = require("../utils/response");
const cardValidate = require("../validators/card.validator");
const cardDetailValidate = require("../validators/cardDetail.validator");
const cardOnUserValidate = require("../validators/cardOnUser.validator");
const cardAction = require("../actions/cards");
const rarityAction = require("../actions/rarities");
const roleAction = require("../actions/roles");
const cardDetailAction = require("../actions/cardDetails");
const cardOnUserAction = require("../actions/cardsOnUsers");
const userAction = require("../actions/users");
const characterRemote = require("../remotes/character");

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
      const {request} = req.body;
      const user = await userAction.getFirst({
        where: {
          request,
        },
      });
      const character = await characterRemote.random();
      const {error: errorCard, value: valueCard} = cardValidate.createSchema.validate({
        characterId: character.data.uuid
      })
      if (errorCard) {
        return res.status(400).json(response.error(errorCard.details[0].message))
      }
      const card = await cardAction.create(valueCard);
      const skipRole = Math.floor(Math.random() * await roleAction.getCount())
      const skipRarity = Math.floor(Math.random() * await rarityAction.getCount())
      const role = await roleAction.getFirst(skipRole)
      const rarity = await rarityAction.getFirst(skipRarity)
      const { error: errorDetail, value: valueDetail } = cardDetailValidate.createSchema.validate({
        level: 0,
        cardId: card.id,
        roleId: role.id,
        rarityId: rarity.id
      })
      if (errorDetail) {
        return res.status(400).json(response.error(errorDetail.details[0].message))
      }
      const cardDetail = await cardDetailAction.create(valueDetail)
      const { error: errorCardUser, value: valueCardUser } = cardOnUserValidate.createSchema.validate({
        userId: user.id,
        cardId: card.id
      })
      if (errorCardUser) {
        return res.status(400).json(response.error(errorCardUser.details[0].message))
      }
      const cardOnUser = await cardOnUserAction.create(valueCardUser)
      return res.json(response.success(card))
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async update(req, res) {
    try {
      const id = req.params.id;
      const request = req.body;
      const { error, value } = cardOnUserValidate.updateSchema.validate(request);
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
