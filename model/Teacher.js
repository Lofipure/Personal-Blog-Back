const connection = require('../db');

/*
    - 只能查看和修改自己个人信息；修改自己的密码；
    - 只能录入自己所授课程的学生成绩，
    - 一旦提交将不能修改，否则必须通过管理员授权才可修改学生成绩。能够输出所授课程的成绩单。
*/
let getInfo = (teacherID) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from teachers where teacherID = ${teacherID};`;
        connection.query(sql, (err, result) => {
            if (!err) {
                resolve(result);
            }
        });
    });
}

class Teacher {
    constructor(teacherID) {
        this.teacherID = teacherID;
    }

    async getInfo() {
        return await getInfo(this.teacherID);
    }

    changePassword(newPassword) {
        let sql = `update teachers set teacherPassword = ${newPassword}
                   where teacherID = "${this.teacherID}";`;
        connection.query(sql, (err) => {
            console.log(sql);
            console.log("change success");
        });
    }

    async getAlreadyChoice() {
        let sql = `select Course.* from Course, CourseChoice
                    where Course.courseID = CourseChoice.courseID
                    and CourseChoice.studentID is null and CourseChoice.teacherID = "${this.teacherID}";`
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
               if(!err) {
                   resolve(results);
               }
            });
        });
    }
}

module.exports = Teacher;