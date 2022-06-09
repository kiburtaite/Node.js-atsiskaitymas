import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN;
    if (!token) {
        res.status(400).send({err})
      } else
      jwt.verify(token, privateKey, (err, decoded) => {
        if(err){
            res.status(400).send({err})
        } else {
            const verification = jwt.verify(token, privateKey);
            req.user_id = verification.id;
            return next();
        }
    })
};

export default authorization