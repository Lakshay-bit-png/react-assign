const courseModel = require("../models/course.model");
const lectureModel = require("../models/lecture.model");
const userModel = require("../models/user.model");

exports.registerCourse = async (req, res) => {
  try {
    const { name, ImageUrl, description, price ,startdate , time ,mode} = req.body;

    const createCourse = new courseModel({
      name,
      ImageUrl,
      description,
      price,
startdate,
time,mode
    });

    await createCourse.save();

    return res.json({
      status: true,
      data: createCourse,
      message: "course crested",
    });
  } catch (error) {
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courses = await courseModel.find();

    return res.json({ success: true, data: courses });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const cId = req.params.id;
    const updateData = req.body;

    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: cId},
      updateData,
      { new: true }
    );

    if (!updatedCourse) {
      throw "couse not found!";
    }

    return res.json({
      success: true,
      data: updatedCourse,
      message: "User updated!",
    });
  } catch (ex) {
    //console.log(ex)
    return res.json({ success: false, message: ex });
  }
};

exports.enrollToCourse = async (req, res) => {
  try {
    const cId = req.params.id;
    const uId = req.params.uid;

    const course = await courseModel.findByIdAndUpdate(
      cId,
      { 
          $addToSet: { 
              students: uId,
              progress: "60"
          }
      },
      { new: true }
  );
  
    const student = await userModel.findByIdAndUpdate(
      uId,{
        $addToSet : {courses : cId}
      },
      {new : true}
    )
    return res.json({
      status: true,
      data: course,
      data2:student,
      message: "enrolled to " + course.name,
    });
  } catch (error) {
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};

exports.viewCourse = async (req, res) => {
  try {
    const cId = req.params.id;

    const course = await courseModel.findById(cId);

    return res.json({
      status: true,
      data: course,
      message: "enrolled to " + course.name,
    });
  } catch (error) {
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};

exports.addLecture = async (req, res) => {
  try {
    const course = req.params.id;
    const { name, ImageUrl, description, videoUrl } = req.body;

    const createLeacture = new lectureModel({
      name,
      ImageUrl,
      description,
      videoUrl,
      course,
    });

    await createLeacture.save();

    const updatedCourse = await courseModel.findByIdAndUpdate(
      course,
      { $addToSet: { lecture: [createLeacture._id] } },
      { new: true }
    );

    return res.json({
      status: true,
      data: { createLeacture: updatedCourse },
      message: "lecture crested",
    });
  } catch (error) {
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};


exports.searchcourse = async (req,res)=>{
  try {
      // Extract the search term from the query parameters
      const { keyword } = req.query
      const query = {
        $or: [
            { instructor: { $regex: keyword, $options: 'i' } }, // Case-insensitive regex search for instructor name
            { name: { $regex: keyword, $options: 'i' } } // Case-insensitive regex search for course name
        ]
    }
      // Search for courses based on instructor name or course name
      const courses = await courseModel.find(query);

      // Return the list of matching courses
      res.json({success:true,data:courses});
  } catch (error) {
      console.error('Error searching for courses:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}