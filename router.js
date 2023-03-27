const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const router = Router();
//users
//http://localhost:3000/api
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/users/:idUser', UserController.updateUser);
router.delete('/users/:idUser', UserController.deleteUser);
//http://localhost:3000/api/users/instance/7
router.patch('/users/instance/:idUser', UserController.updateUserInstance);
//tasks
router.post('/users/:idUser/tasks', TaskController.createTask);

module.exports = router;
