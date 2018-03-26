const mongoose = require('mongoose');

// Genre Schema
const genreSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Genre = module.exports = mongoose.model('Genre', genreSchema);
