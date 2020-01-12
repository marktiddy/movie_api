var jwtSecret = "your_jwt_secret"; //Must match the one in your passport Js configuration
var jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport"); // your passport file

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //The username you're encoding in the JWT
    expiresIn: "7d", //Speicies that it will expire in 7 days
    algorithm: "HS256" //Says you will use this algorithim to sign/encode the JWT values
  });
}

// POST API LOGIN
module.exports = router => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res
          .status(400)
          .json({ message: "Something is not right", user: user });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, rest);
  });
};
