const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String
    }
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(13);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

module.exports = model('User',userSchema);