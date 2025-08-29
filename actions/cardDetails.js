const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  async get(req) {
    return await prisma.cardDetails.findMany(req);
  },
  async getFirst(req) {
    return await prisma.cardDetails.findFirst(req);
  },
  async create(req) {
    return await prisma.cardDetails.create({
      data: req,
    });
  },
  async update(id, req){
    return await prisma.cardDetails.update({
        where: {
            id
        },
        data: req
    })
  },
  async delete(id, req){
    
  }
};
