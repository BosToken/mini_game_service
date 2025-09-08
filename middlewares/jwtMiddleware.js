const { expressjwt: jwt } = require("express-jwt");
const userAction = require("../actions/users");

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

async function authMiddleware(req, res, next) {
  try {
    await jwtMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(401).json({ status: 401, message: "Invalid JWT" });
      }

      let user = null;
      if (req.auth && req.auth.id) {
        user = await userAction.getFirst({
          where: { id: req.auth.id },
        });

        if (!user) {
          return res
            .status(401)
            .json({ status: 401, message: "Invalid user from JWT" });
        }
      }
      if (!user && req.headers["x-discord-id"] && req.headers["x-bot-secret"] == process.env.BOT_SECRET) {
        const discordId = req.headers["x-discord-id"];

        user = await userAction.getFirst({
          where: { discordId },
        });

        if (!user) {
          return res
            .status(401)
            .json({ status: 401, message: "Invalid DiscordId" });
        }
      }
      if (!user) {
        return res
          .status(401)
          .json({ status: 401, message: "Unauthorized (no JWT or DiscordId)" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Server error", error: error.message });
  }
}

module.exports = { authMiddleware };