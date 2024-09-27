import express from "express"; 
const login = require('../controllers/login')
const register = require('../controllers/register')
const router = express.Router(); 


router.post("/register", register);
router.post("/login", login);


export default router;
