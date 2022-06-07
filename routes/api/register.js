import express from 'express';
import con from '../../connection.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
    if (validation(req.body)){
        const hashedPass = await bcrypt.hash(req.body.pass, 5);
        await con.query(`
        INSERT INTO users (full_name, email, password)
        VALUES (?,?,?)`,
        [req.body.full_name, req.body.email, hashedPass]);
        res.redirect('/');
    } else {
        res.send("Netinkami registracijos duomenys")}
    } catch (err){
        res.status(500).send({err})
    }
});

let validation = body => {
    if (body.email.includes('@') &&
        body.email.includes('.') &&
        body.pass === body.passRepeat &&
        body.pass.length >= 8 &&
        /[a-z]/.test(body.pass) &&
        /[0-9]/.test(body.pass)
        ){return true}
    };

export default router