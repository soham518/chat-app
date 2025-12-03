import express from 'express';

const router = express.Router();

//register route
router.get('/register',(req,res) => {
 res.send('this is signup page')
});

export default router;