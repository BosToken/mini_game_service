const hash = require("../utils/hash");
const jwt = require("../utils/jwt");
const response = require("../utils/response");
const authValidator = require("../validators/auth.validator");
const userAction = require("../actions/users");

module.exports = {
  async login(req, res) {
    try {
      const request = req.body;
      const { error: authError, value: authValue } =
        await authValidator.loginSchema.validate(request);
      if (authError) {
        return res
          .status(400)
          .json(response.error(authError.details[0].message));
      }
      //   return res.json(response.success(authValue))
      const user = await userAction.getFirst({
        where: { email: authValue.email },
      });
      if (await hash.compare(authValue.password, user.password)) {
        const payload = {
          id: user.id,
        };
        const token = { token: jwt.sign(payload) };
        return res.json(response.success(token));
      } else {
        return res
          .status(400)
          .json(response.error("wrong's username or password"));
      }
    } catch (error) {
      return res.status(500).json(response.error(error));
    }
  },
};
