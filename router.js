const router = require("koa-router")();
const article = require("./model/article");
router.get('/default/getArticleList', async (ctx) => {
    ctx.body = { data: await article.getArticleList() };
});
router.get('/default/getArticleById', async (ctx) => {
    ctx.body = { data: await article.getArticleById(ctx.query.id) };
});
router.post('/admin/addNewArticle', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        ctx.body = article.addNewArticle(data);
    });
    ctx.body = true;
})

router.get('/admin/showAllUsers', async (ctx) => {
    ctx.body = { data: await admin.getAllInfo() };
});

router.post('/admin/addNewStudent', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        admin.addNewStudent(data);
    });
    ctx.body = true;
});

router.get('/admin/deleteStudent', async (ctx) => {
    admin.deleteStudent(ctx.query.index);
    ctx.body = true;
});

router.get('/student/getPassword', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getInfo();
});

router.post('/student/changePassword', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        let studentObj = new Student(data.studentID);
        studentObj.changePassword(data.studentPassword);
    });
});

router.get('/student/getChoiceList', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getChoiceCourseList();
});

router.get('/teacher/getPassword', async (ctx) => {
    let obj = new Teacher(ctx.query.teacherID);
    ctx.body = await obj.getInfo();
});

router.post('/teacher/changePassword', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = "";
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        let teacherObj = new Teacher(data.teacherID);
        teacherObj.changePassword(data.teacherPassword);
    });
});

router.get('/course/getAll', async (ctx) => {
    ctx.body = await course.getAllInfo();
});

router.post('/teacher/sendCourseChoice', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = "";
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        courseChoice.teacherChoiceCourse(data);
    });

    ctx.body = true;
});

router.get('/student/getAlreadyChoice', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getAlreadyChoice();
});

router.get('/teacher/getAlreadyChoice', async (ctx) => {
    let obj = new Teacher(ctx.query.teacherID);
    ctx.body = await obj.getAlreadyChoice();
})

router.post('/student/choiceCourse', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        courseChoice.studentChoiceCourse(data);
    });
    ctx.body = true;
});

router.get('/teacher/getTeachCourse', async (ctx) => {
    ctx.body = await courseChoice.getTeachCourse(ctx.query.teacherID);
});

router.get('/teacher/getStudentList', async (ctx) => {
    ctx.body = await courseChoice.getStudentList(ctx.query.teacherID, ctx.query.courseID);
});

router.get('/teacher/inGradeForStudent', async (ctx) => {
    ctx.body = await courseChoice.inGradeForStudent(ctx.query.teacherID, ctx.query.courseID, ctx.query.studentID, ctx.query.grade);
});

module.exports = router;