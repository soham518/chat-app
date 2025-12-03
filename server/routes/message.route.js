import express from 'express';

const router = express.Router();

router.get('/send',(req,res) => {
 res.send('this is message send endpoint')
});

export default router;