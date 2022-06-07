import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('register', {
        title: 'Registracija'
    })
});

export default router