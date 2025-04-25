/*
Students.js on reititystiedosto (router), joka tarjoaa REST-apin.
Tietokantaoperaatiot ovat kontrollerin metodeissa. Tietokannan muokkauksen 
mahdollistavat reitit on suojattu authorize -metodilla eli muokkaamaan pääsy 
vaatii kirjautumisen.
*/
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller'); // student-reittien kontrolleri
const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

// get-reiteissa ei ole suojausta, eli kuka tahansa voi hakea tietoa
router.get('/', studentController.findAll);
router.get('/:id', studentController.findById);
router.get('/code/:studentcode', studentController.findByCode);
router.get('/points/:limit', studentController.findBelowLimit);
router.get('/course/:coursecode', studentController.findByCourse);

// post,put ja delete-reitit ovat käytössä vain kirjautuneille käyttäjille.
// Huomaa authorize-argumentit. Jos tokenin vahvistus onnistuu, siirrytään
// seuraavaan argumenttiin, eli suoritetaan kontrollerin metodi.

router.post('/', authorize, studentController.addStudent);
router.delete('/:id', authorize, studentController.deleteStudent);
router.put('/:id', authorize, studentController.updateStudent);
router.put('/addcourse/:id', authorize, studentController.addCourse);
router.post('/:id/grades', authorize, studentController.addGrade);
router.put('/:id/grades/:coursecode', authorize, studentController.updateGrade);

module.exports = router;
