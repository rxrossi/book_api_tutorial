import jwt from 'jwt-simple';
import Users from '../models/Users';
import { jwtSecret } from '../../auth';

export default app => {
	app.post('/token', (req, res) => {
		if (req.body.email && req.body.password) {
			const { email, password } = req.body;
			console.log(email);
			Users.findOne({ email })
				.then(user => {
					if(user.isPassCorrect(password, user.password)) {
						const payload = {id: user._id}
						res.json({
							token: jwt.encode(payload, jwtSecret)
						})
					} else {
						res.sendStatus(401);
					}
				})
				.catch((err) => { console.log("could not find user", err); res.sendStatus(401) } );
		} else {
			console.log("incomplete request")
			res.sendStatus(401);
		}
	});
};
