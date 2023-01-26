
import express from 'express';

import { login,signup, patchOnce,googleSignUp,googleSignIn,googleVerifier, putOnce, forgot ,restorPassword,getUser,getConnectedUser , getObjectId , addMatches,filter , IsMatched, addMatches2,showme,Userconnect ,chatconecte,getId,addAgePref,DeleteAcc,getOne,updateLocation} from '../controllers/use.js';
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route('/login')
  .post(login);
  router
  .route('/signup')
  .post(multer("Image", 512 * 1024) , signup);
  router
  .route('/forgot')
  .post(forgot);
  router 
  .route('/patchOnce')
  .post(patchOnce)
  router
  .route('/googleSignup')
  .post(googleSignUp);

router
  .route('/googleSignIn')
  .post(googleSignIn);

router
  .route('/googleVerifier')
  .post(googleVerifier);
router
  .route('/modifier')
  .put(putOnce);
  router
  .route('/restorPassword')
  .put(restorPassword);
  router
  .route('/getUser')
  .post(getUser);
  router
  .route('/getConnectedUser')
  .post(getConnectedUser);
  router
  .route('/getObjectId/:login')
  .post(getObjectId);
  router
  .route('/addMatches')
  .put(addMatches);
  router
  .route('/filter')
  .get(filter);
  router
  .route('/IsMatched/:login')
  .post(IsMatched);
  router
  .route('/addMatches2/:login')
  .put(addMatches2);
  router
  .route('/showme')
  .post(showme);
  router
  .route('/Userconnect')
  .get(Userconnect);
  router
  .route('/chatconecte')
  .put(chatconecte);
  router
  .route('/getId')
  .put(getId)
  router
  .route('/addAgePref')
  .put( addAgePref);
  router
  .route('/DeleteAcc/:login')
  .put( DeleteAcc);
  router
  .route('/getOne')
  .post(getOne);
  router
  .route('/updateLocation')
  .post(updateLocation);
  export default router;