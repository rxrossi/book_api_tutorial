import BooksController from '../../../src/controllers/books.js';

describe('Controllers: Books', () => {
	describe('Get all books: getAll()', () => {
		it('should return a list of books', ()=> {
			const Books = {
				find: td.function()
			};

			const expectedResponse = [{
				id: 1,
				name: 'Test Book',
				created_at: '2017-04-06T12:17:54.649Z',
				updated_at: '2017-04-06T12:17:54.649Z'
			}];

			td.when(Books.find({})).thenResolve(expectedResponse);

			const booksController = new BooksController(Books);
			return booksController.getAll()
				.then(response => expect(response.data).to.be.eql(expectedResponse))
		});
	});

	describe('Get a book: getById()', () => {
		it('should return a book', ()=> {
			const Books = {
				findById: td.function()
			};

			const expectedResponse = {
				id: 1,
				name: 'Test Book',
				created_at: '2017-04-06T12:17:54.649Z',
				updated_at: '2017-04-06T12:17:54.649Z'
			};

			td.when(Books.findById(1)).thenResolve(expectedResponse);

			const booksController = new BooksController(Books);
			return booksController.getById(1)
				.then(response => expect(response.data).to.be.eql(expectedResponse))
		});
	});

	describe('Create a book: create()', () => {
		it('should create a book', ()=> {
			const Books = {
				create: td.function()
			};

			const requestBody = {
				name: 'Test Book'
			};

			const expectedResponse = {
				id: 1,
				name: 'Test Book',
				created_at: '2017-04-06T12:17:54.649Z',
				updated_at: '2017-04-06T12:17:54.649Z'
			};

			td.when(Books.create(requestBody)).thenResolve(expectedResponse);

			const booksController = new BooksController(Books);
			return booksController.create(requestBody)
				.then(response => {
					expect(response.data).to.be.eql(expectedResponse)
					expect(response.statusCode).to.be.eql(201)
				});
		});
	});

	describe('Update a book: update()', () => {
		it('should update a book', ()=> {
			const Books = {
				findByIdAndUpdate: td.function()
			};

			const requestBody = {
				name: 'Test Book Updated'
			};

			const expectedResponse = {
				id: 1,
				name: 'Test Book Updated',
				created_at: '2017-04-06T12:17:54.649Z',
				updated_at: '2017-04-06T12:17:54.649Z'
			};
			td.when(Books.findByIdAndUpdate(1, {$set: requestBody}, {new: true})).thenResolve(expectedResponse);

			const booksController = new BooksController(Books);
			return booksController.update(1, requestBody)
				.then(response => {
					expect(response.data).to.be.eql(expectedResponse)
				});
		});
	});

	describe('Delete a book: delete() ', () => {
		it('should delete a book', ()=> {

			const Books = {
				findByIdAndRemove: td.function()
			};

			td.when(Books.findByIdAndRemove(1)).thenResolve({});

			const booksController = new BooksController(Books);
			return booksController.delete(1)
				.then(response => expect(response.statusCode).to.be.eql(204))
		});
	});
});

