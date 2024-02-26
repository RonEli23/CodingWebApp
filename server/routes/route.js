import express from 'express';
const router = express.Router();
import { handleSubmitCode,  handleSetComponentUp} from '../controllers/api.controller.js';

router.get("/SetComponentUp/:title", handleSetComponentUp)

router.post("/codeBlock", handleSubmitCode)

export default router;