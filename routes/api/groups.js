import express from 'express';
import con from '../../connection.js';

const router = express.Router();

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