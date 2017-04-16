const defaultResponse = (data, statusCode = 200) => ({
	data,
	statusCode
});

const errorResponse = (message, statusCode = 400) =>
	defaultResponse({error: message}, statusCode);

class UsersController {
	constructor(Users) {
		this.Users = Users;
	}

	getAll() {
		return this.Users.find({})
			.then(result => defaultResponse(result))
			.catch(err => errorResponse(error.message));
	}

	getById(id) {
		return this.Users.findById(id)
			.then(result => defaultResponse(result))
			.catch(err => errorResponse(error.message));
	}

	create (data) {
		return this.Users.create(data)
			.then(result => defaultResponse(result, 201))
			.catch(error => errorResponse(error.message, 422));
	}

	update (id, body) {
		return this.Users.findByIdAndUpdate(id, {$set: body}, {new: true})
			.then(result => defaultResponse(result))
			.catch(error => errorResponse(error.message, 422));
	}

	delete (id) {
		return this.Users.findByIdAndRemove(id)
			.then(result => defaultResponse(result, 204))
			.catch(err => errorResponse(err.message, 422))
	}
}

export default UsersController;
