const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String},
		password:{ type: String, required: true }
	},
	
	{ collection: 'users' }
)

UserSchema.index({ username : 'text' });

const User = mongoose.model('UserSchema', UserSchema)

User.createIndexes();

module.exports = User ;