'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// fake database: ****************
const users = [
    {
        user_id: 1,
        name: 'Foo Bar',
        email: 'foo@bar.fi',
        password: 'foobar',
    },
    {
        user_id: 2,
        name: 'Bar Foo',
        email: 'bar@foo.fi',
        password: 'barfoo',
    },
];
// *******************

// fake database functions *********
const getUser = (id) => {
    const user = users.filter((usr) => {
        if (usr.user_id === id) {
            return usr;
        }
    });
    return user[0];
};

const getUserLogin = (email) => {
    const user = users.filter((usr) => {
        if (usr.email === email) {
            return usr;
        }
    });
    return user[0];
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
    console.log('serialize', id);
    done(null, user.id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
    // get user data by id from getUser
    console.log('deserialize', user);
    done(err, user);
});

passport.use(new Strategy(
    (username, password, done) => {
        getUserLogin.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user.user_id);
        });
        // get user by username from getUserLogin
        // if user is undefined
        // return done(null, false);
        // if passwords dont match
        // return done(null, false);
        // if all is ok
        // return done(null, user.user_id);
    }
));

module.exports = passport;