const connection = require("../db");

class Course {
    constructor() {
        console.log("course constructor is ok");
    }

    getAllInfo() {
        let sql = `select * from course;`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (!err) {
                    resolve(results);
                }
            });
        });
    }

    async getCourseScore(courseID) {
        return await new Promise((resolve, reject) => {
            let sql = `select CourseScore from course where courseID = '${courseID}';`;
            connection.query(sql, (err, result) => {
                if (!err) {
                    resolve(result);
                }
            });
        });
    }

}

let course = new Course();

module.exports = course;