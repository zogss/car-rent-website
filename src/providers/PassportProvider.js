import passport from "passport";
import Users from "../app/models/Users";

class PassportProvider {
  boot() {
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await Users.findById(id);
        if (!user) {
          return done(new Error("User not found"));
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });
  }
}

export default new PassportProvider();
