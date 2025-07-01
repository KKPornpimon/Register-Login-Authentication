
import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { loginSchema, registerSchema, validate } from '../utils/validater.js';
const router = express.Router()



// endpoint
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)


export default router