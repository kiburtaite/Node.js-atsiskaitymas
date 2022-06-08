import express from 'express';
import con from '../../connection.js';

const router = express.Router();

router.get('/:group_id', async (req,res) => {
    const [data] = await con.query(
        `SELECT * FROM test_db.bills
        WHERE test_db.bills.group_id_bills = ?`, 
        [req.params.group_id]);
        res.render('bills', {
            title: 'Sąskaitos',
            list: data
        })
}); 

export default router