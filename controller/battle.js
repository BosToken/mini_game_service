const response = require("../utils/response");
const userAction = require("../actions/users");
const userLimitAction = require("../actions/userLimits");
const cardAction = require("../actions/cards");

module.exports = {
  // Random Battle
  async findBattle(req, res) {
    try {
      const user = req.user
      const request = {
        id: user.id
      };
      const player = await this.teamCheck(request);
      if (!player) {
        return res
          .status(400)
          .json(response.error("You have not yet formed a team."));
      }
      const playerBattleLimit = await this.battleLimitCheck(
        player.userLimit.id
      );
      if (!playerBattleLimit) {
        const date = new Date(Number(player.userLimit.battleLimit));
        const formatted = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()} : ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return res
          .status(400)
          .json(
            response.error(
              `This feature is limited, please wait until ${formatted}`
            )
          );
      }
      const requestEnemy = {
        where: {
          team: {
            AND: [{ cardId: { not: null } }, { cardId: { not: "" } }],
          },
        },
      };

      let enemy = null;
      let attempts = 0;
      const maxAttempts = 5;

      while (!enemy && attempts < maxAttempts) {
        const skipEnemy = Math.floor(
          Math.random() * (await userAction.getCount(requestEnemy))
        );
        const candidate = await userAction.getFirst({
          ...requestEnemy,
          skip: skipEnemy,
          take: 1,
        });

        if (candidate && candidate.id !== player.id) {
          enemy = candidate;
        }
        attempts++;
      }

      if (!enemy) {
        return res
          .status(404)
          .json(response.error("No valid enemy found, try again."));
      }
      const battleRequest = {
        player: player.team.cardId,
        enemy: enemy.team.cardId,
      };
      const battle = await this.battleLogic(battleRequest);
      await this.battleLimitUpdate(player.userLimit.id);
      return res.json(response.success(battle));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async requestBattle(req, res) {
    try {
      const request = req.body;
      const user = req.user
      const requestPlayer = {
        id: user.id
      };
      const player = await this.teamCheck(requestPlayer);
      if (!player) {
        return res
          .status(400)
          .json(response.error("You have not yet formed a team."));
      }
      const playerBattleLimit = await this.battleLimitCheck(
        player.userLimit.id
      );

      if (!playerBattleLimit) {
        const date = new Date(player.userLimit.battleLimit);
        const formatted = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()} : ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return res
          .status(400)
          .json(
            response.error(
              `This feature is limited, please wait until ${formatted}`
            )
          );
      }
      const enemy = await userAction.getFirst({
        where: request.enemy,
      });
      if (enemy.id == requestPlayer.id) {
        return res
          .status(400)
          .json(
            response.error(
              `You can't battle yourself.`
            )
          );
      }
      if (enemy.team.cardId == null) {
        return res
          .status(400)
          .json(response.error("The enemy has not yet set up team formation."));
      }
      const battleRequest = {
        player: player.team.cardId,
        enemy: enemy.team.cardId,
      };
      const battle = await this.battleLogic(battleRequest);
      await this.battleLimitUpdate(player.userLimit.id);
      return res.json(response.success(battle));
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
  async battleLogic(req) {
    try {
      const playerCard = await cardAction.get({
        where: {
          id: {
            in: JSON.parse(req.player),
          },
        },
      });
      const enemyCard = await cardAction.get({
        where: {
          id: {
            in: JSON.parse(req.enemy),
          },
        },
      });

      const player = playerCard.slice(0, 3).map((c) => ({
        id: c.id,
        card: c,
        health: c.cardDetail.health * c.cardDetail.level,
        atk: c.cardDetail.atk * c.cardDetail.level,
        priority: c.cardDetail.role.priority,
      }));

      const enemy = enemyCard.slice(0, 3).map((c) => ({
        card: c,
        health: c.cardDetail.health * c.cardDetail.level,
        atk: c.cardDetail.atk * c.cardDetail.level,
        priority: c.cardDetail.role.priority,
      }));

      let turn = Math.random() < 0.5 ? "player" : "enemy";

      while (true) {
        const alivePlayer = player.filter((c) => c.health > 0);
        const aliveEnemy = enemy.filter((c) => c.health > 0);

        if (alivePlayer.length === 0) {
          return { winner: "Enemy", player: alivePlayer, enemy: aliveEnemy };
        }
        if (aliveEnemy.length === 0) {
          return { winner: "Player", player: alivePlayer, enemy: aliveEnemy };
        }

        if (turn === "player") {
          const attacker = alivePlayer[0];
          const targetIndex = attacker.priority - 1;
          const target =
            enemy[targetIndex] && enemy[targetIndex].health > 0
              ? enemy[targetIndex]
              : aliveEnemy[0];

          target.health -= attacker.atk;
          turn = "enemy";
        } else {
          const attacker = aliveEnemy[0];
          const targetIndex = attacker.priority - 1;
          const target =
            player[targetIndex] && player[targetIndex].health > 0
              ? player[targetIndex]
              : alivePlayer[0];

          target.health -= attacker.atk;
          turn = "player";
        }
      }
    } catch (error) {
      return false;
    }
  },
  async teamCheck(req) {
    try {
      const player = await userAction.getFirst({
        where: req,
      });
      if (player.team.cardId == null) {
        return false;
      }
      return player;
    } catch (error) {
      return false;
    }
  },
  async battleLimitCheck(id) {
    try {
      const userLimit = await userLimitAction.getFirst({ where: { id } });
      if (userLimit.battleLimit > Date.now()) {
        return false;
      }
      return userLimit;
    } catch (error) {
      return false;
    }
  },
  async battleLimitUpdate(id) {
    try {
      const userLimit = await userLimitAction.update(id, {
        battleLimit: Date.now() + 5 * 60 * 1000,
      });
      return userLimit;
    } catch (error) {
      return false;
    }
  },
};
