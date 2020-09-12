const connection = require("../db");

/*
    - 实现对学生、教师、课程、授课信息的增加、删除、查询、修改等。
    - 学生的信息包括学号，姓名，性别，出生日期，专业，电话，EMAIL地址等。
    - 教师的信息包括教师号，姓名，性别，职称，电话，EMAIL地址等。
    - 课程信息包括课程号，课程名，学分等。
*/
let selectFromTable = (tableName) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from ${tableName};`;
        connection.query(sql, (err, data) => {
            if (!err) {
                resolve(data);
            }
        });
    });
}

class Administer {
    constructor() {
        this.studentField = ` (studentID, sutdentName, studentGender, studentCollege, studentMajor, studentAge, studentTelephone, studentEmail, studentBirthday, studentPassword) `;
        this.teacherField = ` (teacherID, teacherName, teacherGender, teacherCollege, teacherWork, teacherTelephone,  teacherEmail, teacherPassword) `;
        this.courseField = ` (courseID, courseName, courseScore) `;
    }

    addNewTeacher(newTeacherInformation) {
        let sql = `insert into teachers ${this.teacherField} values (`;
        for (let index in newTeacherInformation) {
            sql += `"${newTeacherInformation[index]}",`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ");";

        console.log(sql);

        connection.query(sql, (err, result, field) => {
            if (!err) {
                console.log("New Teacher Success!");
            } else {
                console.log(err);
            }
        })
    }

    async addNewStudent(newStudentInformation) {
        // Model拿到数据对数据库进行操作，将结果返回给Controller
        let sql = `insert into students ${this.studentField} values (`;
        for (let index in newStudentInformation) {
            sql += `"${newStudentInformation[index]}",`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ");";

        console.log(sql);

        connection.query(sql, (err, result, field) => {
            if (!err) {
                console.log("New Student Success!");
            }
        });
    }

    addNewCourse(newCourseInformation) {
        let sql = `insert into Course ${this.courseField} values (`;
        for (let index in newCourseInformation) {
            sql += `"${newCourseInformation[index]}",`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ");";

        console.log(sql);

        connection.query(sql, (err, result, field) => {
            if (!err) {
                console.log("New Course Success!");
            }
        })
    }

    deleteTeacher(teacherID) {
        let sql = `delete from teachers where teacherID = "${teacherID}";`;
        connection.query(sql, (err, result, field) => {
            if (!err) {
                console.log("Delete Teacher Success!");
            }
        });
    }

    deleteStudent(studentID) {
        let sql = `delete from students where studentID = "${studentID}";`;
        connection.query(sql, (err, result, field) => {
            if (!err) {
                console.log("Delete Student Success!");
            }
        });
    }

    deleteCourse(courseID) {
        let sql = `delete from Course where courseID = "${courseID}";`;
        connection.query(sql, (err, result, field) => {
            console.log("aaa");
            if (!err) {
                console.log("Delete Course Success!");
            }
        })
    }

    updateTeacher(newTeacherInformation) {
        this.deleteTeacher(newTeacherInformation.teacherID);
        this.addNewTeacher(newTeacherInformation);
    }

    updateStudent(newStudentInformation) {
        this.deleteStudent(newStudentInformation.studentID);
        this.addNewStudent(newStudentInformation);
    }

    updateCourse(newCourseInformation) {
        this.deleteCourse(newCourseInformation.courseID);
        this.addNewCourse(newCourseInformation);
    }

    async getOneStudent(studentID) {
        return await new Promise((resolve, reject) => {
            let sql = `select * from Students where studentID = "${studentID}";`;
            connection.query(sql, (err, data) => {
                if (!err) {
                    resolve(data);
                }
            });
        });
    }

    async getOneTeacher(teacherID) {
        return await new Promise((resolve, reject) => {
            let sql = `select * from Teachers where teacherID = "${teacherID}";`;
            connection.query(sql, (err, data) => {
                if (!err) {
                    resolve(data);
                }
            });
        });
    }

    async getOneCourse(courseID) {
        return await new Promise((resolve, reject) => {
            let sql = `select * from Course where courseID = "${courseID}";`;
            connection.query(sql, (err, data) => {
                if(!err) {
                    resolve(data);
                }
            });
        });
    }

    async getAllInfo() {
        let studentData = await selectFromTable('Students');
        let teacherData = await selectFromTable('Teachers');
        let courseData = await selectFromTable('Course');
        return {
            studentData, teacherData, courseData
        };
    }
}

let admin = new Administer();

module.exports = admin;