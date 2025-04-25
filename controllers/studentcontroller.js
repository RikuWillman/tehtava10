/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student');

const StudentController = {
  findAll(req, res) {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  findById(req, res) {
    Student.findById(req.params.id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  findByCode(req, res) {
    Student.findOne({ studentcode: req.params.studentcode })
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  addStudent(req, res) {
    const newStudent = new Student(req.body);
    newStudent
      .save()
      .then((student) => {
        res.status(201).json(student);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  },

  deleteStudent(req, res) {
    Student.findByIdAndDelete(req.params.id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  updateStudent(req, res) {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  },

  findBelowLimit(req, res) {
    Student.find({ studypoints: { $lt: req.params.limit } })
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  addCourse(req, res) {
    Student.findByIdAndUpdate(
      req.params.id,
      {
        $push: { grades: req.body },
        $inc: { studypoints: 5 },
      },
      { new: true }
    )
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  },

  updateGrade(req, res) {
    Student.findOneAndUpdate(
      {
        _id: req.params.id,
        'grades.coursecode': req.params.coursecode,
      },
      {
        $set: { 'grades.$.grade': req.body.grade },
      },
      { new: true }
    )
      .then((student) => {
        if (!student) {
          return res
            .status(404)
            .json({ message: 'Student or course not found' });
        }
        res.json(student);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  },

  findByCourse(req, res) {
    Student.find({ 'grades.coursecode': req.params.coursecode })
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },
};

module.exports = StudentController;
