const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
mongoose.promise = Promise;


// user schema
const UserSchema = new Schema({
    // unique username
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
    // user's displayed name
    nickname: {
        type: String,
        validate: [({ length }) => length <= 20, 'name cannot exceed 20 characters']
    },
    // space to put a short bio
    bio: {
        type: String,
        validate: [({ length }) => length <= 160, 'bio cannot exceed 160 characters']
    },
    // journal posts stored here for each user
    journal: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Journal'
        }
    ],
    // artworks stored here for each user
    works: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Works'
        }
    ],
    // favorite artworks for each user
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Works'
        }
    ]
});

// Define schema methods
UserSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

// Define hooks for pre-saving
UserSchema.pre("save", function (next) {
    if (!this.password) {
        console.log("models/user NO PASSWORD PROVIDED");
        next();
    } else {
        console.log("models/user hashPassword in pre save");

        this.password = this.hashPassword(this.password);
        next();
    }
});

const User = mongoose.model("User", UserSchema);


module.exports = User;