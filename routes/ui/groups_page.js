import express from 'express';
import con from '../../connection.js';
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

router.get('/:id', async (req,res) => {
    const [data] = await con.query(
        `SELECT * FROM accounts
        LEFT OUTER JOIN test_db.groups
        ON accounts.group_id_accounts=groups.id
        WHERE accounts.user_id = ?`, [req.params.id]);
        res.render('groups', {
            title: 'Grupės',
            list: data
        })
});

export default router