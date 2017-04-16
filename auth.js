import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import Users from './src/models/Users';
const jwtSecret = 'a-Random_string_anything';
export { jwtSecret };

export default app => {
	const opts = {
		secretOrKey: jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeader()
	};

	const strategy = new Strategy(opts, (payload, done) => {
		Users.findById(payload.id)
		.then(user => {
			if(user) {
				return done(null, { id: user._id });
			}
			return done(null, false);
		})
		.catch(err => done(err, null))
	});
	passport.use(strategy);

	return {
		initialize: () => passport.initialize(),
		authenticate: () => passport.authenticate('jwt', { session: false }),
	};
};
