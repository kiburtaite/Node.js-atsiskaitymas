import express from 'express';
import con from '../../connection.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authorization = (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN;
    if (!token) {
        res.redirect('/login')
      } else
      jwt.verify(token, privateKey, (err, decoded) => {
        if(err){
            res.redirect('/login')
        } else {
            const verification = jwt.verify(token, privateKey);
            req.user_id = verification.id;
            return next();
        }
    })
};

router.get('/', async (req, res) => {
    try{
        const [data] = await con.query(`
        SELECT * from test_db.groups`);
        res.send(data);
    } catch (err){
        res.status(400).send({err})
    }
});

router.post('/', async (req, res) => {
    try{
        const [data] = await con.query(`
        INSERT INTO test_db.groups
        WHERE name = ?`,
        [req.body.name]);
        res.send(data);
    } catch (err){
        res.status(400).send({err})
    }
});

export default router