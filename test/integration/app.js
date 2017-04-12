import Books from '../../src/models/Book';

describe('Routes Books', () => {

	const defaultBook = {
		name: 'Default Book'
	}
	let defaultBookId; // will receive the value bellow

	let request;
	before(() => {
		return setupApp()
			.then( (app) => {
				request = supertest(app);
			})
	});

	before(done => {
		Books
			.deleteMany({})
			.then(() => Books.create(defaultBook))
			.then( answer => {
				defaultBookId = answer._id;
				done()
			});
	});


	describe('Route GET /books', () => {
		it('shoud return a list of books', done => {
			request
				.get('/books')
				.end((err, res) => {
					expect(res.body[0]._id).to.be.equal(defaultBookId.toString());
					expect(res.body[0].name).to.be.equal(defaultBook.name);
					done(err);
				});
		});
	});

	describe('Route GET /books/{id}', () => {
		it('shoud return a book', done => {
			request
				.get('/books/'+defaultBookId)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultBookId.toString());
					expect(res.body.name).to.be.equal(defaultBook.name);
					done(err);
				});
		});
	});

	describe('Route POST /books', () => {
		it('shoud create a book', done => {
			const newBook = {
				name: 'newBook'
			};
			request
				.post('/books')
				.send(newBook)
				.end((err, res) => {
					expect(res.body.name).to.be.equal(newBook.name);
					done(err);
				});
		});
	});

	describe('Route PUT /books/{id}', () => {
		it('shoud update a book', done => {
			const updatedBook = {
				name: 'updatedBook'
			};
			request
				.put('/books/'+defaultBookId)
				.send(updatedBook)
				.end((err, res) => {
					expect(res.body._id).to.be.equal(defaultBookId.toString());
					expect(res.body.name).to.be.equal(updatedBook.name);
					done(err);
				});
		});
	});

	describe('Route DELETE /books/{id}', () => {
		it('shoud delete a book', done => {
			request
				.delete('/books/'+defaultBookId)
				.end((err, res) => {
					expect(res.statusCode).to.be.equal(204);
					done(err);
				});
		});
	});

});
