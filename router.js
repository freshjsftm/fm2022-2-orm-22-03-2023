const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const router = Router();

//method & controllers
//http://localhost:3000/api/test
//router.get('/test', ()=>{})

//users
//http://localhost:3000/api
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/users/:idUser', UserController.updateUser);
router.delete('/users/:idUser', UserController.deleteUser);
//http://localhost:3000/api/users/instance/7
router.patch('/users/instance/:idUser', UserController.updateUserInstance);

module.exports = router;
