import mongoose from 'mongoose';

let mongodbURL;
if (process.env.NODE_ENV === "test") {
	mongodbURL = 'mongodb://localhost/test_books_api';
} else {
	mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost/books_api2';
}
console.log("mongodbURL", mongodbURL);

mongoose.Promise = global.Promise;
const connect = () => {
	if (mongoose.connection.readyState) return new Promise( resolve => resolve() );
	return mongoose.connect(mongodbURL)
};

export default {
	connect
}
