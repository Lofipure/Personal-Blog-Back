const connection = require('../db');
const admin = require('./Administer');

/*
    - 只能查看和修改自己个人信息、已选课程成绩及总学分；
    - 修改自己密码；
    - 可以查看课程信息、授课及教师信息
    - 可以进行选课操作。
*/
let getInformation = (studentID) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where studentID = "${studentID}";`;
        connection.query(sql, (err, result) => {
            if (!err) {
                resolve(result);
            }
        });
    });
}

class Student {
    constructor(studentID) {
        this.studentID = studentID;
    }

    changePassword(newPassword) {
        let sql = `update students set studentPassword = "${newPassword}"
                   where studentID = "${this.studentID}";`;
        connection.query(sql, (err) => {
            console.log(sql);
            console.log("Change Success");
        })
    }

    async getInfo() {
        return await getInformation(this.studentID);
    }

    async getAlreadyChoice() {
        let sql = `select Teachers.teacherName, Course.courseName, Course.courseScore, Teachers.teacherCollege, Teachers.teacherEmail, Teachers.teacherWork, courseChoice.grade
                    from courseChoice,Course,Teachers
                    where CourseChoice.teacherID is not null
                    and CourseChoice.teacherID = Teachers.teacherID
                    and CourseChoice.courseID = Course.courseID
                    and CourseChoice.studentID = "${this.studentID}";`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if(!err) {
                    resolve(data);
                }
            });
        });
    }

    async getChoiceCourseList() {
        let sql = `select Teachers.teacherName, Course.courseName, Course.courseScore, Teachers.teacherCollege, Teachers.teacherEmail, Teachers.teacherWork, Teachers.teacherID, Course.courseID
                    from courseChoice,Course,Teachers
                    where CourseChoice.teacherID is not null 
                    and CourseChoice.teacherID = Teachers.teacherID 
                    and CourseChoice.courseID = Course.courseID
                    and CourseChoice.studentID is null;`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (!err) {
                    resolve(results);
                }
            });
        });

    }
}

module.exports = Student;