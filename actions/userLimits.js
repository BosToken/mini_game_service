const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  async get(req) {
    return await prisma.userLimits.findMany(req);
  },
  async getFirst(req) {
    return await prisma.userLimits.findFirst(req);
  },
  async getCount(req){
    return await prisma.userLimits.count(req);
  },
  async create(req) {
    return await prisma.userLimits.create({
      data: req,
    });
  },
  async update(id, req){
    return await prisma.userLimits.update({
        where: {
            id
        },
        data: req
    })
  },
  async delete(id, req){
    
  }
};