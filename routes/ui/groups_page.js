import express from 'express';
import con from '../../connection.js';
import authorization from '../../authorization.js';

const router = express.Router();

router.get('/', authorization, async (req,res) => {
    const [data] = await con.query(
        `SELECT * FROM test_db.accounts
        LEFT OUTER JOIN test_db.groups
        ON test_db.accounts.group_id_accounts=test_db.groups.id
        WHERE test_db.accounts.user_id = ?`, [req.cookies.identity]);
    const [users] = await con.query(
        `SELECT * FROM test_db.users
        WHERE test_db.users.id = ?`, [req.cookies.identity]);
        res.render('groups', {
            title: 'Grupės',
            list: data,
            user: users
        })
});

export default router