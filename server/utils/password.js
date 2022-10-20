const crypto = require('crypto');

// hash and salt password 
const generatePass = (password) => {
    if(password.length > 0){
        // creates extra characters
        let salt = crypto.randomBytes(32).toString('hex');
        // adds characters to salt 
        let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return {salt: salt, hash: genHash};
    }
}

const verifyPass = (password, hash, salt) => {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports.generatePass = generatePass;
module.exports.verifyPass = verifyPass;