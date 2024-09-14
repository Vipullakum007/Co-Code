    const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isOwner: {
        type: Boolean,
        default: false,
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;

        } catch (error) {
            next(error);
        }
    }
});

userSchema.methods.generateToken = async function () {
    console.log('Generating token...');
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isOwner: this.isOwner
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        );
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;