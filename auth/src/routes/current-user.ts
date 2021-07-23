import express from 'express';

import { currentUser } from '@jlyh/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null }); // To send back null instead of undefined
});

export { router as currentUserRouter };