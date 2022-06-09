import express from 'express';
import con from '../../connection.js';
import authorization from '../../authorization.js';

const router = express.Router();

router.get('/:id', authorization, async (req,res) => {
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