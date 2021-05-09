const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String},
		password:{ type: String, required: true }
	},
	
	{ collection: 'users' }
)

const User = mongoose.model('UserSchema', UserSchema)

module.exports = User ;