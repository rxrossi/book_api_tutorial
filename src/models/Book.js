import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

export default mongoose.model('Book', bookSchema);
