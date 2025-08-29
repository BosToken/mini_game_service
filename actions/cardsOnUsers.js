const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const model = require("../models/cardOnUser");
const characterRemote = require("../remotes/character");

module.exports = {
  async get(req) {
    const data = await prisma.cardsOnUsers.findMany({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
    const result = await Promise.all(
      data.map(async (item) => {
        let character = null;
        character = await characterRemote.getById(item.card.characterId);
        return {
          ...item,
          card: {
            ...item.card,
            character,
          },
        };
      })
    );
    return result;
  },
  async getFirst(req) {
    const data = await prisma.cardsOnUsers.findFirst({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
    const character = await characterRemote.getById(data.card.characterId);
    const response = {
      ...data,
      card: {
        ...data.card,
        character,
      },
    };
    return response;
  },
  async create(req) {
    return await prisma.cardsOnUsers.create({
      data: req,
    });
  },
  async update(id, req) {
    return await prisma.cardsOnUsers.update({
      where: {
        id,
      },
      data: req,
    });
  },
  async delete(id, req) {},
};
