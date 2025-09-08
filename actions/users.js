const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const model = require("../models/user");
const actionCard = require("./cards");

module.exports = {
  async getCount(req) {
    return await prisma.users.count({
      where: {
        ...req?.where,
      },
      ...req,
    });
  },
  async get(req) {
    const user = await prisma.users.findMany({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
    if (user.team?.cardId) {
      const cardIds = JSON.parse(user.team.cardId);
      const cards = await actionCard.get({
        where: {
          id: {
            in: cardIds,
          },
        },
      });
      user.team.cards = cards;
    }
    return user;
  },
  async getFirst(req) {
    const user = await prisma.users.findFirst({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
    if (user.team?.cardId) {
      const cardIds = JSON.parse(user.team.cardId);
      const cards = await actionCard.get({
        where: {
          id: {
            in: cardIds,
          },
        },
      });
      user.team.cards = cards;
    }
    return user;
  },
  async getRandom(req) {
    const user = await prisma.users.findFirst({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
  },
  async create(req) {
    return await prisma.users.create({
      data: req,
    });
  },
  async update(id, req) {
    return await prisma.users.update({
      where: {
        id,
      },
      data: req,
    });
  },
  async delete(id, req) {},
};
