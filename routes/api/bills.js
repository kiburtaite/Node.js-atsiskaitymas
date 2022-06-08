import express from 'express';
import con from '../../connection.js';

const router = express.Router();

router.get('/:group_id', async (req, res) => {
    try{
        const [data] = await con.query(`
        SELECT * FROM test_db.bills
        WHERE test_db.group_id_bills.group_id_bills = ?`
        [req.params.group_id]);
        res.send(data);
    } catch (err){
        res.status(400).send({err})
    }
});

router.post('/', async (req, res) => {
    try{
        const [data] = await con.query(
        `INSERT INTO test_db.bills SET ?`, {
            group_id_bills: '',
            amount: req.body.amount,
            description: req.body.description
        });
        res.send(data);
    } catch (err){
        res.status(400).send({err})
    }
});

export default router