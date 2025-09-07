const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function clearData() {
    await prisma.cardsOnUsers.deleteMany();
    await prisma.cardDetails.deleteMany();
    await prisma.cards.deleteMany();
    await prisma.userLimits.deleteMany();
    await prisma.teams.deleteMany();
    await prisma.users.deleteMany();
    await prisma.rarities.deleteMany();
    await prisma.roles.deleteMany();
}

clearData();