import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { query } = req.body;
       const userId = req.user._id || req.user.id;


        const searchResults = {
            answer: `This is a generated answer for "${query}".`,
            sources: [{ title: 'Example Source', link: 'https://example.com' }],
        };

        const newSearch = new SearchHistory({
            query,
            userId,
        });
        await newSearch.save();
        console.log("User ID:", req.user.id);


        res.json(searchResults);
    } catch (error) {
        console.error('Search Route Error:', error);
        res.status(500).json({ message: 'Server error during search.' });
    }
});

export default router;
