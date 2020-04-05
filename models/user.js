const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: 'that username is already in use',
        validate: [({ length }) => length >= 6, 'username must be at least 3 characters'],
        required: 'username is required'
    },
    password: {
        type: String,
        validate: [({ length }) => length >= 6, 'password must be at least 6 characters'],
        required: 'password is required'
    },
    email: {
        type: String,
        unique: 'that email is already registered',
        match: [/.+@.+\..+/, 'Email must be valid'],
        required: 'email is required'
    },
    nickname: {
        type: String,
        validate: [({ length }) => length <= 20, 'name cannot exceed 20 characters']
    },
    bio: {
        type: String,
        validate: [({ length }) => length <= 160, 'bio cannot exceed 160 characters']
    },
    journal: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Journal'
        }
    ],
    works: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Art'
        }
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Art'
        }
    ]
})

UserSchema.methods.encryptPass = function (password) {
    this.password = bcrypt.hashSync(password, 10)
    return this.password;
}

// UserSchema.methods.comparePass = function (user) {
//     user.password = User.
// }

const User = mongoose.model("User", UserSchema);


module.exports = User;