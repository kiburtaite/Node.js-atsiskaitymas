import express from 'express';
import con from '../../connection.js';
import authorization from '../../authorization.js';

const router = express.Router();

router.get('/', authorization, async (req, res) => {
    try{
        const [data] = await con.query(`
        SELECT * FROM test_db.accounts
        LEFT OUTER JOIN test_db.groups
        ON test_db.accounts.group_id_accounts=test_db.groups.id
        WHERE test_db.accounts.user_id = ?`
        [req.cookies.identity]);
        res.send(data);
    } catch (err){
        res.status(400).send({err})
    }
});

router.post('/', async (req, res) => {
    try{
        await con.query(
        `INSERT INTO test_db.accounts SET ?`, {
            group_id_accounts: req.body.group_id,
            user_id: req.cookies.identity
        });
        res.redirect('/groups')
    } catch (err){
        res.status(400).send({err})
    }
});

export default router