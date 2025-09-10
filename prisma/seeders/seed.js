const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      discordId: "419138179065708544",
    },
  });

  const userLimit = await prisma.userLimits.create({
    data: {
      userId: user.id,
      gachaLimit: 0,
      battleLimit: 0
    },
  });

  const rarity = await prisma.rarities.create({
    data: {
        name: "Common",
        description: "Common",
        rate: 60,
        minAtk: 10,
        maxAtk: 50,
        minHealth: 100,
        maxHealth: 150
    }
  });

  const rarity2 = await prisma.rarities.create({
    data: {
        name: "Uncommon",
        description: "Uncommon",
        rate: 25,
        minAtk: 40,
        maxAtk: 100,
        minHealth: 140,
        maxHealth: 200
    }
  });

  const rarity3 = await prisma.rarities.create({
    data: {
        name: "Rare",
        description: "Rare",
        rate: 10,
        minAtk: 90,
        maxAtk: 150,
        minHealth: 190,
        maxHealth: 250
    }
  });

  const rarity4 = await prisma.rarities.create({
    data: {
        name: "Super Rare",
        description: "Super Rare",
        rate: 4,
        minAtk: 140,
        maxAtk: 200,
        minHealth: 240,
        maxHealth: 300
    }
  });

  const rarity5 = await prisma.rarities.create({
    data: {
        name: "Specially Super Rare",
        description: "Specially Super Rare",
        rate: 1,
        minAtk: 190,
        maxAtk: 250,
        minHealth: 290,
        maxHealth: 350
    }
  });

  const role = await prisma.roles.create({
    data: {
        name: "Saber",
        description: "Saber",
        priority: 1
    }
  });
  
  const role2 = await prisma.roles.create({
    data: {
        name: "Lancer",
        description: "Lancer",
        priority: 2
    }
  });

  const role3 = await prisma.roles.create({
    data: {
        name: "Archer",
        description: "Archer",
        priority: 3
    }
  });

  const card = await prisma.cards.create({
    data: {
        characterId: "01ac3a20-9a7b-4482-8254-76b36e06a67e",
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
        level: 1,
        cardId: card.id,
        rarityId: rarity.id,
        roleId: role.id,
        atk: 50,
        health: 150 
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
