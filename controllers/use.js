
import User from "../models/use.js";
import bcrypt from 'bcrypt';
import async, { forEach } from'async';
import crypto from 'crypto';
import nodemailer from'nodemailer';
import {sendmailresetpassword} from "../services/mailer.js"
import {generatePassword} from '../services/generatePassword.js'
import mongoose from "mongoose";
import { match } from "assert";
var saltRounds = 10;
const password = generatePassword();
// export async function login(req, res) {
//     User
//     .findOne({ "login": req.body.login, "password": req.body.password })
	
//     .then(doc => {
		
//         res.status(200).json(doc);
//     })
//     .catch(err => {
//         res.status(500).json({ error: err });
//     });
// }
	export async function signup(req, res) {
		const  hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
		User.create({ login: req.body.login,
			lastname: "",
			password: hashedPwd,	
			FirstName:"",
			LasteName:"",
			Age:req.body.Age,
			Numero:"",
			Sexe:"",
			location:req.body.location,
			Image:`${req.protocol}://matchiniiback-production.up.railway.app/img/${req.file.filename}`,
			})
		  .then(
			res.status(200).json({
				login: req.body.login,
			  password: req.body.password,
			}))
		 
		}
	export async function login(req, res) {
		const user = await User.findOne({ login: req.body.login });
		if (user) {
		  // check user password with hashed password stored in the database
		  const validPassword = await bcrypt.compare(req.body.password, user.password);
		  if (validPassword) {
			res.status(200).json({ message: "Valid password" });
		  }
		else {
		  res.status(400).json({ error: "Invalid Password" });
		}
	  } else {
		res.status(401).json({ error: "User does not exist" });
	  }
	  };
	export function patchOnce(req, res) {
		User
		.findOneAndUpdate({ "login": req.body.login }, { "password": req.body.password})
		.then(doc => {
			res.status(200).json(doc);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
	}
	   export async function sendmail(req, res, next) {
	 	async.waterfall([
			function (done) {
	 			crypto.randomBytes(20, function (err, buf) {
	 				var token = buf.toString('hex');
					done(err, token);
				});
			},
			function (token, done) {
				User.findOne({ login: req.body.login }, function (err, user) {
					if (!user) {
						console.log('No account with that email address exists.')
					}
	
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	
	 				user.save(function (err) {
						done(err, token, user);
					});
	 			});
	 		},
			function (token, user, done) {
				let smtpTransport= nodemailer.createTransport({
	 				service: 'gmail',
					auth: {
					  user: 'khitem.mathlouthi@esprit.tn',
					  pass: 'loicfhwbjlkevfqg'
					}
				
				});
	 			
	 			var mailOptions = {
					to: user.login,
				from: 'khitem.mathlouthi@esprit.tn',
					subject: 'Password Reset',
				   text: `Follow this link to reset your Code for new Password: ${password}`,
                  
						
				};
				smtpTransport.sendMail(mailOptions, function (res) {
	 				console.log('mail sent' , password);
					res.send("mail sent" );
					
					done(res, 'done');
					
				});
		}
	 	], function (res) {
	 		res.status(200).json({password});
			
		});
	 }; 
	export async function googleSignIn(req, res) {
		const user = await User.findOne({ googleID: req.body.googleID });
		if (user) {
		  // check user password with hashed password stored in the database
			   res.status(200).json(user);
		  }
		else {
		res.status(401).json({ error: "User does not exist" });
	  }
	  };
	  export async function googleSignUp(req, res) {
		const password = generatePassword();
		User.create({ login: req.body.login,
		 
		  password: password,
		  
		  googleID: req.body.googleID})
		.then(
		   
		  res.status(200).json({
			login: req.body.login,
			password: req.body.password,
		  }))
		.catch((err) => {
		  res.status(500).json({ error: err });
		});
		
	  }

export async function googleVerifier(req, res) {
  const user = await User.findOne({ googleID: req.body.googleID });
  if (user) {
    // check user password with hashed password stored in the database
         res.status(200).json(user);
    }
  else {
  res.status(401).json({ error: "User does not exist" });
}
}	 
export function putOnce(req, res) {
	User
	.findOneAndUpdate({ "login": req.body.login }, { "FirstName": req.body.FirstName,  "LasteName": req.body.LasteName,  "Age": req.body.Age ,  "Numero": req.body.Numero, "Sexe": req.body.Sexe ,"AboutYou" : req.body.AboutYou,"Job" : req.body.Job,"School" : req.body.School},{new: true})
	.then(doc => {
	  res.status(200).json({message: "your account is now verified"});
	})
	.catch(err => {
	  res.status(500).json({ error: err });
	});

} 
export async function forgot(req, res) {
	
	const user = await User.findOne({ login: req.body.login });
	if(user){
		const verificationcode = generatePassword();
		sendmailresetpassword( user.login,verificationcode);
		res.status(200).json({key: "key", value:verificationcode });
		
		console.log("test",verificationcode)
	}
	else {
		res.status(500).json({ message: "no account with this mail to restor" });
	}
  };
  
  export async function restorPassword(req,res) {
	const  hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
	User
	.findOneAndUpdate({login: req.body.login}, {password: hashedPwd}, {new: true})
	.then(doc1 => {
	   
			res.status(200).json({message: "password has been changed succefully"});
		
	})
	.catch(err => {
		res.status(500).json({ error: err });
	});
  }

  export  async function getUser(req, res) {
	var agemax = null
	var agemin = null
	var index2 = null
	 await User.findOne({ login: req.body.login }).then((doc)=>{
		agemax = doc?.AgeMax
		agemin = doc?.AgeMin
	})
	await User.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
		if (docs[i].login != null) {
				list.push({
					login: docs[i].login,
					FirstName: docs[i].FirstName,
					Age: docs[i].Age,
					Image: docs[i].Image,
					id: docs[i]._id
					});
				 list.forEach((el)=>{
				 	if(el.Age > agemin  || el.Age < agemax){
							console.log(el.Age);
					 	}
						
					})
					if(agemax!= null && agemin != null){
						 index2 = list.findIndex((el) => (el.Age > agemax || el.Age < agemin ));
						
						
		}
      }
	  if (index2 != -1) {
		if (agemax != "" && agemax!= null && agemin != "" && agemin!= null) {
			list.splice(index2 , 1)
			
		 }
	  }
	
	}
		
		 const index = list.findIndex((el) => (el.login ===req.body.login  ));
		 list.splice(index , 1)
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  };
  export  async function getConnectedUser(req, res) {
	User.findOne({ login: req.body.login }).then((docs) => {
		let list = [];
		  list.push({
		  login: docs.login,
		  FirstName: docs.FirstName,
		  Age: docs.Age,
		  Image: docs.Image,
		  id : docs._id,
		  });
		res.status(200).json(list);
	  })
    };
	export  async function getObjectId(req, res) {
		var id1=""
		var id2 = ""
		var list = []
		
		await User.findOne({ login: req.body.login }).then((docs) => {
				 id1 =docs._id;
		  })
		await User.findOne({ login: req.params.login }).then((doc) => {
			id2 =doc._id;
			console.log("=======",id2);
		 
	 })
	 list.push({id1 , id2})
	 var list2 = [{key : "key" , value : id1 },{key : "key1" , value: id2}]
	 res.status(200).json(list2);

		};
// export  async function addMatches(req, res) {

// 	 var user = User.find({ login: req.body.login })
// 	 .then((docs) => {
// 			let list =[];
//       console.log(list);
// 	list.push({Matches :req.body.Matches})
// 	console.log("hhhhhhhhh" +docs[i].Matches)
// 	res.status(200).json(list);
// }
// ).catch(err=> {
// 	res.status(505).json({error: err});
// })
//     }

 export  async function addMatches(req, res) {
 	var user = User.findOneAndUpdate({ login: req.body.login },{ $push: { Matches: req.body.Matches } } , {new: true}).then((docs)=>{
		res.status(200).json( user);
	}).catch(err=> {
			res.status(505).json({error: err});
		})

 
 }
 export  async function addMatches2(req, res) {
	var id = ""
	 await User.findOne({ login: req.params.login }, {new: true}).then((docs) => {
			 id = docs._id; 
	  })
	var user = User.findOneAndUpdate({ login: req.body.login },{ $push: { Matches: id } } , {new: true}).then((docs)=>{
	  
   })
}
	// 	var user = await User
	// .findOneAndUpdate({ "login": req.body.login}, { "Matches": req.body.Matches}, {new: true})
	
	//   res.status(200).json(user);
	//   console.log("hhhhhhhhh" +req.body.Matches)

	export async function filter(req,res){
		/*const user =await User.find({ Age: req.body.Age })
		const filter = {}
		if (user) {
		const { Age } =user
		if (Age) {
			filter.Age = Age 
		}
		res.status(200).json( {filter});
	}
	else{
		res.status(500).json("error" );
	}*/
	User.find({
		$or: [
			{ Age: req.body.Age }, { Age: 100}
		]
	}, (err, res) => {
		console.log(res)
		
	});
	}
export async function IsMatched(req,res ){
	
	var id = ""
	 await User.findOne({ login: req.body.login }, {new: true}).then((docs) => {
			 id = docs._id; 
			var user2= User.findOne({login: req.params.login}).then((docss) => {
				var matches = docss.Matches
				for (let i = 0; i < matches.length; i++) {
					if (docss.Matches[i].equals(id)) {
						
						res.send("match already exists");
					} else {
						console.log("---------------" );
				    User.findOneAndUpdate({ login: req.params.login },{ $push: { Matches: id } } ).then((docss) => {
							res.send("done");
						})
					}	}
		 })
	  })
	  let list = null
	  var user =await User.findOne({login:req.params.login})
	  list = {Matches :user.Matches}
			list.Matches.forEach((i)=>{
			 if(id.equals(i)){
				res.status(200).json({key: "key", value:  true});
			}
	}
	)
}
	export async function showme(req,res){
		const users = await User.find({ Sexe: req.body.Sexe});
	
	
		if (User.Sexe === "Male" && User.sexualPreference === "Straight") {
	
		const users = await User.find({ gender: "Female", sexualPreference: "Straight"}).toArray();
		 
	
		};
		res.status(200).json(users)
	  }
	  
	  export async function Userconnect (req,res){
		const users = await User.find({ login: req.body.login});
		 User.find({})
		.then((doc) => {
			let list = [];
			for (let i = 0; i < doc.length; i++) {
			  if (doc[i].status==true){
				list.push({
					login: doc[i].login
					});
				res.status(200).json(list)
			}else{
				res.status(500).json("user is not connected !!!")
			}
			}
		})
	  }
	  
	  export async function chatconecte(req,res){
		let list1 = [];
		let list = [];
		User.find({})
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        list1.push(
		 docs[i]._id
        );
		console.log("les ids 1 :",list1);
	}})
	await User.findOne({ login: req.body.login}).then((doc)=>{
		doc.Matches.forEach((i)=>{
			for (let j = 0; j <=list1.length; j++){
				if(i.equals(list1[j]))
				{User.findById(mongoose.Types.ObjectId(i))
					.then((docs) => {
					list.push({doc : docs}); 
					console.warn("list=====",list)
					})}
				}})
				console.warn("l////////",list)
				res.status(200).json(list);	
			 })

		.catch(err =>{
			res.status(500).json({error: err})
		})
	}
	export async function getId(req,res){
		var id=""
	var user=	await User.findOne({login: req.body.login }).then((docs) => {
			id =docs._id;
	 })
	 console.log("====---===",id)
	 res.status(200).json({key: "key", value:id })
	}
	export async function addAgePref(req , res ){
		var user = await User.findOneAndUpdate({ "login": req.body.login },{ "AgeMax" : req.body.AgeMax,"AgeMin" : req.body.AgeMin}).then(
			
		)
		res.status(200).json({user})
	}
	export async function DeleteAcc(req,res){
		await 	User
		.findOneAndUpdate
		({ "login": req.params.login },
		 { "login" : null ,
		  "password" : null,
		  "FirstName": null, 
		   "LasteName": null, 
			"Age": null , 
			 "Numero": null, 
			 "Sexe": null ,
			  "Image" : null,
			  "AboutYou" : null,
			  "Job" : null,
			  "School" : null }
			  ,{new: true})
			  .then(res.status(200).json({message: "done"}))
		
	}
	export async function getOne(req,res) {
		await User.findOne({ login: req.body.login }).then((doc)=>{
			res.status(200).json({
				login : doc.login ,
				Image : doc.Image
			});
		})
		
	  }
	  export function updateLocation(req, res) {
        User
        .findOneAndUpdate({ "login": req.body.login },  { "longitude": req.body.longitude , "latitude": req.body.latitude } )
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }