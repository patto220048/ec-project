import jwt from 'jsonwebtoken';

export const generateAccessToken = (user, key) => {
    return jwt.sign({ id: user._id, admin: user.isAdmin }, key, {
        expiresIn: '1m',
    });
};

export const generateRefreshToken = (user, key) => {
    return jwt.sign({ id: user._id, admin: user.isAdmin }, key, {
        expiresIn: '1y',
    });
};
