import express from 'express';
import { getAllContacts, getMessagesByUserId,sendMessage, getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.use(protectRoute);

router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessagesByUserId);
router.post("/send/:id",sendMessage);

router.get('/send',(req,res) => {
 res.send('this is message send endpoint')
});

export default router;