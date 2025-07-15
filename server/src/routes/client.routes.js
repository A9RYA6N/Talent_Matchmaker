import express from 'express'
import {match} from '../controllers/client.controller.js'

const router=express.Router();

router.post('/match', match);

export default router