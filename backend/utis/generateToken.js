import  jwt  from 'jsonwebtoken';

function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '10s',
    });
}
