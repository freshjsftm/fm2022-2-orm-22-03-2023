const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');
const { checkTask } = require('./middlewares/task.mw');
const router = Router();
//users
//http://localhost:3000/api
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/users/:idUser', checkUser, UserController.updateUser);
router.delete('/users/:idUser', checkUser, UserController.deleteUser);
//http://localhost:3000/api/users/instance/7
router.patch('/users/instance/:idUser', checkUser, UserController.updateUserInstance);
//tasks
//router.post('/users/:idUser/tasks', TaskController.createTask);
router.post('/users/:idUser/tasks', checkUser, TaskController.createTask);
router.get('/users/:idUser/tasks', checkUser, TaskController.getUserTasks);
//router.patch('/users/:idUser/tasks/:idTask', checkUser,);
//DELETE http://localhost:3000/api/users/1/tasks/4 HTTP/1.1
router.delete('/users/:idUser/tasks/:idTask', checkUser, checkTask, TaskController.deleteUserTask);

//router.get('/users/:idUser/tasks/:idTask', checkUser,); //get one!!!

module.exports = router;
