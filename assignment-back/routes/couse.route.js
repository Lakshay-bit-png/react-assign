const couseRouter = require('express').Router();
const couseContoller = require('../controller/course.controller');

couseRouter.post('/',couseContoller.registerCourse);
couseRouter.get('/',couseContoller.getCourse);
couseRouter.get('/search',couseContoller.searchcourse);
couseRouter.patch('/:id',couseContoller.updateCourse);
couseRouter.get('/:id',couseContoller.viewCourse);
couseRouter.patch('/:id/:uid',couseContoller.enrollToCourse);

couseRouter.post('/:id',couseContoller.addLecture);


module.exports = couseRouter;