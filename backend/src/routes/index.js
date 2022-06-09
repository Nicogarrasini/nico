const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz')




//Auth

router.get('/', verifyToken ,(req, res) => res.send('hello world'))

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({username, password});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'fatiga');
    res.status(200).json({token})
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username})
    if(!user) return res.status(401).send('Invalid Username');
    if(user.password !== password) return res.status(401).send('Invalid Password');
    
   const token = jwt.sign({_id: user._id}, 'fatiga')

    return res.status(200).json({token})
});


// Quizzes


router.get('/quizselector', verifyToken, async (req, res) => {   
    const quizzesList = await Quiz.find({})
    return  res.send(quizzesList)
})


module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    const payload = jwt.verify(token, 'fatiga')
    req.payload = payload._id;
    next();
}



