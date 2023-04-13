const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = {
    comparePassword(hashPassword, password){
        return await bcrypt.compare(password, hashPassword);
    },

}

module.exports =  helper