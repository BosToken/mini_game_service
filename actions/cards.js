const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const model = require("../models/card");
const characterRemote = require("../remotes/character");

module.exports = {
  async get(req) {
    const data = await prisma.cards.findMany({
      ...req,
      include: model,
      where: {
        ...req?.where,
      },
    });
    const result = await Promise.all(
      data.map(async (item) => {
        let character = null;
        character = await characterRemote.getById(item.characterId);
        return {
          ...item,
          character
        }
      })
    )
    return result;
  },
  async getFirst(req) {
    const data = await prisma.cards.findFirst({
      ...req,
      include: model,
      where: {
        ...req?.where,
      },
    });
    const character = await characterRemote.getById(data.characterId);
    const response = {
      ...data,
      character
    }
    return response;
  },
  async create(req) {
    return await prisma.cards.create({
      data: req,
    });
  },
  async update(id, req) {
    return await prisma.cards.update({
      where: {
        id,
      },
      data: req,
    });
  },
  async delete(id, req) {},
};
