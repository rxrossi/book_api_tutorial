import Books from '../../../src/models/Book';
import Users from '../../../src/models/Users';
import { jwtSecret } from '../../../auth';
import jwt from 'jwt-simple';

describe('Routes Books', () => {

	const defaultBook = {
		name: 'Default Book',
		description: 'Default description',
	}
	let defaultBookId; // will receive the value bellow

	let request;
	before(() => {
		return setupApp()
			.then( (app) => {
				request = supertest(app);
			})
	});

	let token;
	before(done => {
		Users
			.deleteMany({})
			.then(() => Users.create({
				name: 'Jhon',
				email: 'john@email.com',
				password: '12345'
			}))
			.then(user =>{
				Books
					.deleteMany({})
					.then(() => Books.create(defaultBook))
					.then( answer => {
						defaultBookId = answer._id;
						token = jwt.encode({id: user._id}, jwtSecret)
						done();
					})
			})
	});


	describe('Route GET /books', () => {
		it('shoud return a list of books', done => {
			request
				.get('/books')
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					if (err) return console.log(err);
					expect(res.status).to.be.eql(200);
					expect(res.body[0]._id).to.be.equal(defaultBookId.toString());
					expect(res.body[0].name).to.be.equal(defaultBook.name);
					expect(res.body[0].description).to.be.equal(defaultBook.description);
					done(err);
				});
		});
	});

	describe('Route GET /books/{id}', () => {
		it('shoud return a book', done => {
			request
				.get('/books/'+defaultBookId)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultBookId.toString());
					expect(res.body.name).to.be.equal(defaultBook.name);
					expect(res.body.description).to.be.equal(defaultBook.description);
					done(err);
				});
		});
	});

	describe('Route POST /books', () => {
		it('shoud create a book', done => {
			const newBook = {
				name: 'newBook',
				description: 'newBook description',
			};
			request
				.post('/books')
				.set('Authorization', `JWT ${token}`)
				.send(newBook)
				.end((err, res) => {
					expect(res.body.name).to.be.equal(newBook.name);
					expect(res.body.description).to.be.equal(newBook.description);
					done(err);
				});
		});
	});

	describe('Route PUT /books/{id}', () => {
		it('shoud update a book', done => {
			const updatedBook = {
				name: 'updatedBook',
				description: 'updated description',
			};
			request
				.put('/books/'+defaultBookId)
				.set('Authorization', `JWT ${token}`)
				.send(updatedBook)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultBookId.toString());
					expect(res.body.name).to.be.equal(updatedBook.name);
					expect(res.body.description).to.be.equal(updatedBook.description);
					done(err);
				});
		});
	});

	describe('Route DELETE /books/{id}', () => {
		it('shoud delete a book', done => {
			request
				.delete('/books/'+defaultBookId)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(204);
					done(err);
				});
		});
	});

});
