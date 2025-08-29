const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      discordId: "419138179065708544",
    },
  });

  const rarity = await prisma.rarities.create({
    data: {
        name: "Rare",
        description: "Rare"
    }
  });

  const role = await prisma.roles.create({
    data: {
        name: "Saber",
        description: "Saber"
    }
  })

  const card = await prisma.cards.create({
    data: {
        characterId: "1549d061-3449-4220-91c3-f538f11d386a",
    }
  })

  const cardOnUser = await prisma.cardsOnUsers.create({
    data: {
        userId: user.id,
        cardId: card.id
    }
  })

  const cardDetail = await prisma.cardDetails.create({
    data: {
        level: 0,
        cardId: card.id,
        rarityId: rarity.id,
        roleId: role.id
    }
  })

  const team = await prisma.teams.create({
    data: {
        userId: user.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
