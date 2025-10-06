import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const history = await SearchHistory.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);
        
        res.json(history);
    } catch (error) {
        console.error('History Fetch Error:', error);
        res.status(500).json({ message: 'Server error fetching history.' });
    }
});

export default router;
