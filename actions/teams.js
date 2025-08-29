const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const model = require("../models/team");
const actionCard = require("./cards");
const characterRemote = require("../remotes/character");

module.exports = {
  async get(req) {
    return await prisma.teams.findMany({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
  },
  async getFirst(req) {
    const team = await prisma.teams.findFirst({
      include: model,
      where: {
        ...req?.where,
      },
      ...req,
    });
    if (team.cardId) {
      const cardIds = JSON.parse(team.cardId);
      const cards = await actionCard.get({
        where: {
          id: {
            in: cardIds,
          },
        },
      });
      const characterFetch = await Promise.all(
        cards.map(async (item) => {
          let character = await characterRemote.getById(item.characterId);
          return {
            ...item,
            character,
          };
        })
      );
      team.cards = characterFetch;
    }
    return team;
  },
  async create(req) {
    return await prisma.teams.create({
      data: req,
    });
  },
  async update(id, req) {
    return await prisma.teams.update({
      where: {
        id,
      },
      data: req,
    });
  },
  async delete(id, req) {},
};
