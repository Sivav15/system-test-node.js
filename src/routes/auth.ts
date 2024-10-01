import express, { Router } from "express"; 
const login = require('../controllers/login')
const register = require('../controllers/register')
const router:Router = express.Router(); 


router.post("/register", register);
router.post("/login", login);


export default router;
