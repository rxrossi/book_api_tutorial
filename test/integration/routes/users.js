
import Users from '../../../src/models/Users';

describe('Routes Users', () => {

	const defaultUser = {
		name: 'default user',
		email: 'test@gmail.com',
		password: 'pass123'
	}
	let defaultUserId; // will receive the value bellow

	let request;
	before(() => {
		return setupApp()
			.then( (app) => {
				request = supertest(app);
			})
	});

	before(done => {
		Users
			.deleteMany({})
			.then(() => Users.create(defaultUser))
			.then( answer => {
				defaultUserId = answer._id;
				done()
			});
	});


	describe('Route GET /users', () => {
		it('shoud return a list of users', done => {
			request
				.get('/users')
				.end((err, res) => {
					expect(res.body[0]._id).to.be.equal(defaultUserId.toString());
					expect(res.body[0].name).to.be.equal(defaultUser.name);
					expect(res.body[0].email).to.be.equal(defaultUser.email);
					done(err);
				});
		});
	});

	describe('Route GET /users/{id}', () => {
		it('shoud return a user', done => {
			request
				.get('/users/'+defaultUserId)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultUserId.toString());
					expect(res.body.name).to.be.equal(defaultUser.name);
					expect(res.body.email).to.be.equal(defaultUser.email);
					done(err);
				});
		});
	});

	describe('Route POST /users', () => {
		it('shoud create a user', done => {
			const newUser = {
				name: 'user 2',
				email: 'user2@gmail.com',
				password: 'pas456'
			};
			request
				.post('/users')
				.send(newUser)
				.end((err, res) => {
					expect(res.body.name).to.be.equal(newUser.name);
					expect(res.body.email).to.be.equal(newUser.email);
					done(err);
				});
		});
	});

	describe('Route PUT /users/{id}', () => {
		it('shoud update a user', done => {
			const updatedUser = {
				name: 'updated username',
				email: 'updated@gmail.com',
			};
			request
				.put('/users/'+defaultUserId)
				.send(updatedUser)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultUserId.toString());
					expect(res.body.name).to.be.equal(updatedUser.name);
					expect(res.body.email).to.be.equal(updatedUser.email);
					done(err);
				});
		});
	});

	describe('Route DELETE /users/{id}', () => {
		it('shoud delete a user', done => {
			request
				.delete('/users/'+defaultUserId)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(204);
					done(err);
				});
		});
	});

});
