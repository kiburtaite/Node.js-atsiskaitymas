import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN;
    if (!token) {
        res.redirect('/login');
      } else
      jwt.verify(token, privateKey, (err, decoded) => {
        if(err){
            res.redirect('/timeout');
        } else {
            next();
            return res.cookie('user_id', decoded.id, {
                httpOnly: true
            })
        }
    })
};

export default authorization