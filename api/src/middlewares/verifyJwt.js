import jwt from 'jsonwebtoken';
import handleError from '../untils/error/handleError.js';

class verifyToken {
    isUser(req, res, next) {
        const authHeader = req.headers.authorization;
        // lấy jwt key từ cookie
        const signatureJwt = req.cookies.keyUuidv
        if (authHeader) {
            const token = authHeader.split(' ')[1];  
            jwt.verify(token, signatureJwt, (err, user) => {
                if (err) return res.json(handleError(false,401, err.message, 'Token invalid!'));
                req.user = user;
                next();
            });
        } else res.json(handleError(false,403, 'You are not authenticated!!!'));
    }
    isAdmin(req, res, next) {

    }
}

export default new verifyToken();
