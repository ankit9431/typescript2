import express from 'express'
import { createSongs, getAll } from '../controllers/song.controller.js';
import { protect} from '../db/auth.js';

const app=express();
const router=express.Router();
router.post('/',protect,createSongs)
router.get('/getAll',protect,getAll)

export default router