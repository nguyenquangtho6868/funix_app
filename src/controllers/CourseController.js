
const CourseModal = require('../models/course');

class CourseController {
    async addCourse (req, res) {
        try {
            const { name,code } = req.body;
            const newCourse = await CourseModal.create({
                name,
                code,
            });
            res.json({message: 'Add Course Successfully!', data: newCourse, statusCode: 200});
        }
        catch (e) {
            res.status(422).json(e)
        }
    }

    async getListCourse(req, res) {
        try {
            const listCourse = await CourseModal.find({});
            res.json({message: 'Get List Course Successfully!', data: listCourse, statusCode: 200});
        }
        catch (e) {
            res.status(422).json(e)
        }
    }

    async deleteCourse(req, res) {
        try {
            const { id } = req.body;
            await CourseModal.deleteOne({_id: id});
            res.json({message: 'Delete Course Successfully!', statusCode: 200});
        }
        catch (e) {
            res.status(422).json(e)
        }
    }

    async editUser(req, res) {
        // try {
        //     const listUser = await User.find({});
        //     res.json({message: 'Get List User Successfully!', data: listUser, statusCode: 200});
        // }
        // catch (e) {
        //     res.status(422).json(e)
        // }
    }
}

module.exports = new CourseController;