import jwt from 'jsonwebtoken';

const authorization = async (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN;
    if (!token) {
        res.redirect('/login');
      } else
      jwt.verify(token, privateKey, (err, decoded) => {
        if(err){
            res.redirect('/timeout');
        } else {
            const identity = decoded.user_id;
            next();
            return res.cookie('identity', identity, {
                httpOnly: true
            });
        }
    })
};

export default authorization