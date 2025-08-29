const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  async get(req) {
    return await prisma.roles.findMany(req);
  },
  async getFirst(req) {
    return await prisma.roles.findFirst(req);
  },
  async getCount(req){
    return await prisma.roles.count(req);
  },
  async create(req) {
    return await prisma.roles.create({
      data: req,
    });
  },
  async update(id, req){
    return await prisma.roles.update({
        where: {
            id
        },
        data: req
    })
  },
  async delete(id, req){
    
  }
};