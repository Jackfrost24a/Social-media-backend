const jwt = require("jsonwebtoken");

// Import .env
require("dotenv").config();

const jwtVerify = (req, res, next) => {
  console.log("Trigger1");
  const token = req.headers.authorization;
  console.log(token);

  if (!token)
    return res.status(406).send({ error: true, message: "Token Not Found!" });

  jwt.verify(token, process.env.JWT_KEY, (err, dataToken) => {
    try {
      if (err) throw err;

      req.dataToken = dataToken;
      console.log("jwt verify", req.dataToken);
      console.log("Trigger");
      next();
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  });
};

module.exports = jwtVerify;
