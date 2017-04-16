import UsersController from '../controllers/users';
import Users from '../models/Users';

export default (app) => {
	const usersController = new UsersController(Users);
	app.route('/users')
		.get( (req, res) => {
			usersController.getAll()
				.then( response => {
					res.status(response.statusCode);
					res.json(response.data);
			});

		})
		.post( (req, res) => {
			usersController.create(req.body)
				.then( response => {
					res.status(response.statusCode);
					res.json(response.data);
				});
		});

	app.route('/users/:id')
		.get( (req, res) => {
			usersController.getById(req.params.id)
				.then( response => {
					res.status(response.statusCode);
					res.json(response.data);
				});
		})
		.put( (req, res) => {
			usersController.update(req.params.id, req.body)
				.then( response => {
					res.status(response.statusCode);
					res.json(response.data);
				});
		})
		.delete( (req, res) => {
			usersController.delete(req.params.id)
				.then( response => {
					res.status(response.statusCode);
					res.json(response.data);
				});
		});
}
