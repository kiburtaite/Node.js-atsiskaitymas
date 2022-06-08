import express from 'express';
import bcrypt from 'bcrypt';
import con from '../../connection.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const [data] = await con.query(`
        SELECT * from users
        WHERE email = ?`,
        req.body.email);
        if (data.length === 0){
            return res.send(400).send({err})
        }
        if (await bcrypt.compare(req.body.password, data[0].password)){
            const privateKey = process.env.JWT_TOKEN;
            const token = jwt.sign({
                "id": data[0].id
            }, privateKey, { expiresIn: '5min'});
            return res.cookie('token', token, {
                httpOnly: true
            })
            .status(200)
            .redirect('/login')
        } else {res.status(400).send({err})};
    } catch (err) {
        res.status(400).send({err})
    }
});

export default router