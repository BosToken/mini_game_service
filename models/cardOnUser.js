module.exports = {
  card: {
    include: {
      cardDetail: {
        include: {
          rarity: true,
          role: true,
        },
      },
    },
  },
  user: true
};
