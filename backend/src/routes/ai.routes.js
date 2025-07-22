import express from 'express';
import aiController from "../controllers/ai.controller.js";
const router = express.Router();


router.post("/getresponse",aiController.getresponse);

router.post("/register",aiController.register);

router.post("/login",aiController.login);




export default router;

