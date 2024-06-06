/* eslint-disable implicit-arrow-linebreak */
import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { User } from '@src/models/user.model';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || ' ',
};

passport.use(
  new JwtStrategy(options, async (loggedInUser, done) => {
    try {
      const user = await User.findById(loggedInUser.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export const initializePassport = () => passport.initialize();
export const authenticateJwt = () =>
  passport.authenticate('jwt', { session: false });
