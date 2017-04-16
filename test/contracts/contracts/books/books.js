import Books from '../../../../src/models/Book';

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
			const bookslist = Joi.array().items(Joi.object().keys({
				_id: Joi.string(),
				name: Joi.string(),
				__v: Joi.number(),
			}));

			request
				.get('/books')
				.end((err, res) => {
					JoiAssert(res.body, bookslist);
					done(err);
				});
		});
	});

	describe('Route GET /books/{id}', () => {
		it('shoud return a book', done => {
			const book = Joi.object().keys({
				_id: Joi.string(),
				name: Joi.string(),
				__v: Joi.number(),
			});

			request
				.get('/books/'+defaultBookId)
				.end((err, res) => {
					JoiAssert(res.body, book);
					done(err);
				});
		});
	});

	describe('Route POST /books', () => {
		it('shoud create a book', done => {
			const bookSchema = Joi.object().keys({
				_id: Joi.string(),
				name: Joi.string(),
				__v: Joi.number()
			});

			const newBook = {
				name: "newBook"
			} ;

			request
				.post('/books')
				.send(newBook)
				.end((err, res) => {
					JoiAssert(res.body, bookSchema);
					done(err);
				});
		});
	});

	describe('Route PUT /books/{id}', () => {
		it('shoud update a book', done => {
			const book = Joi.object().keys({
				_id: Joi.string(),
				name: Joi.string(),
				__v: Joi.number()
			});

			const updatedBook = {
				name: "updatedBook name"
			};

			request
				.put('/books/'+defaultBookId)
				.send(updatedBook)
				.end((err, res) => {
					JoiAssert(res.body, book);
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
