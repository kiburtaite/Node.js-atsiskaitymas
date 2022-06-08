import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

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

router.get('/', authorization, async (req, res) => {
    res.render('groups', {
        title: 'Grupės'
    })
});

export default router