const defaultResponse = (data, statusCode = 200) => ({
	data,
	statusCode
});

const errorResponse = (message, statusCode = 400) =>
	defaultResponse({error: message}, statusCode);

class BooksController {
	constructor(Books) {
		this.Books = Books;
	}

	getAll() {
		return this.Books.find({})
			.then(result => defaultResponse(result))
			.catch(err => errorResponse(error.message));
	}

	getById(id) {
		return this.Books.findById(id)
			.then(result => defaultResponse(result))
			.catch(err => errorResponse(error.message));
	}

	create (data) {
		return this.Books.create(data)
			.then(result => defaultResponse(result, 201))
			.catch(error => errorResponse(error.message, 422));
	}

	update (id, body) {
		return this.Books.findByIdAndUpdate(id, {$set: body}, {new: true})
			.then(result => defaultResponse(result))
			.catch(error => errorResponse(error.message, 422));
	}

	delete (id) {
		return this.Books.findByIdAndRemove(id)
			.then(result => defaultResponse(result, 204))
			.catch(err => errorResponse(err.message, 422))
	}
}

export default BooksController;
