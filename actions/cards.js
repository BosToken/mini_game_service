const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const model = require("../models/card");

module.exports = {
  async get(req) {
    return await prisma.cards.findMany({
      ...req,
      include: model,
      where: {
        ...req?.where,
      },
    });
  },
  async getFirst(req) {
    return await prisma.cards.findFirst({
      ...req,
      include: model,
      where: {
        ...req?.where,
      },
    });
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
