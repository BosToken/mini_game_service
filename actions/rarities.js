const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  async get(req) {
    return await prisma.rarities.findMany(req);
  },
  async getFirst(req) {
    return await prisma.rarities.findFirst(req);
  },
  async getCount(req){
    return await prisma.rarities.count(req);
  },
  async create(req) {
    return await prisma.rarities.create({
      data: req,
    });
  },
  async update(id, req){
    return await prisma.rarities.update({
        where: {
            id
        },
        data: req
    })
  },
  async delete(id, req){
    
  }
};