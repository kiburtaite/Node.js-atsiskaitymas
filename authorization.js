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
            //res.status(400).send({err: "Sesija baigėsi. Prašome prisijungti"})
        } else {
            const verification = jwt.verify(token, privateKey);
            req.user_id = verification.id;
            return next();
        }
    })
};

export default authorization