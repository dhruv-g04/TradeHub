const User = require("./models/user");
const bcrypt = require("bcryptjs"); // Use bcryptjs consistently
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (username, password, done) => {
            try {
                const data = await User.findOne({ username: username });
                if (!data) {
                    return done(null, false, { message: "No user exists" });
                }

                // Use bcrypt.compare with error handling
                const match = await bcrypt.compare(password, data.password);
                if (match) {
                    console.log("User logged in successfully:", username);
                    return done(null, data);
                } else {
                    return done(null, false, { message: "Invalid password" });
                }
            } catch (err) {
                console.error("Error during login: ", err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ _id: id });
            done(null, user);
        } catch (err) {
            console.error("Error during deserialization: ", err);
            done(err);
        }
    });
};
