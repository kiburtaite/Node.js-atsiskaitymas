import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN;
    if (!token) {
        res.redirect('/login');
      } else
      jwt.verify(token, privateKey, (err, decoded) => {
          console.log(decoded);
        if(err){
            res.redirect('/timeout');
        } else {
            const user_id = decoded.id;
            next();
            return user_id
        }
    })
};

export default authorization