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
        `SELECT * FROM test_db.accounts
        LEFT OUTER JOIN test_db.groups
        ON test_db.accounts.group_id_accounts=test_db.groups.id
        WHERE test_db.accounts.user_id = ?`, [req.params.id]);
        res.render('groups', {
            title: 'Grupės',
            list: data
        })
});

export default router