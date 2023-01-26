import { log } from "async";
import Matche from "../models/matche.js";
import User from "../models/use.js";
import mongoose from "mongoose";
import { login } from "./use.js";
export async function matches(req, res){
    try {
        const { User1_param, User2_param } = req.params;
      
        const ExistingMatch= await Matche.findOne({
          $or: [
            {
              User1: User1_param,
              User2: User2_param,
            },
            {
              User1: User2_param,
              User2: User1_param,
            },
          ],
        });
        let createdMatche;
        if (ExistingMatch) {
            createdMatche = await Matche.findByIdAndUpdate(ExistingMatch._id, {
            User2_Right: true,
            Match: true,
            RommeName:ExistingMatch._id
          });
        } 
        else {
          const Matchee = new Matche({
            User1: User1_param,
            User2: User2_param,
          });
          createdMatche = Matchee.save();
        }
        res.status(200).json(createdMatche);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  export async function amie (req,res){
    var finalList =[]
    const {userid}=req.params
    const List= []
   const docs = await Matche.find({})
      for (let i = 0; i < docs.length; i++) {
       if ( docs[i].Match==true && docs[i].User1._id .equals(mongoose.Types.ObjectId(userid))) List.push(docs[i].User2 );
       if (docs[i].Match==true && docs[i].User2._id .equals(mongoose.Types.ObjectId(userid))) List.push(docs[i].User1  );
       console.log("test2",List+"\n")
	}
  for(let k = 0; k <List.length; k++){
    console.log('=====',k)
    var friend = await User.findById({_id: mongoose.Types.ObjectId(List[k])})
finalList.push({login : friend.login ,
                FirstName : friend.FirstName ,
                LasteName : friend.LasteName ,
                Age: friend.Age,
                Image : friend.Image ,
                longitude : friend.longitude,
                latitude : friend.latitude,
  })
  }
   res.status(200).json(finalList)
 }
export async function rome(req,res){
  try {
    const { User1_param1, User2_param2 } = req.params;
    const Existingrome= await Matche.findOne({
      $or: [
        {
          User1: User1_param1,
          User2: User2_param2,
        },
        {
          User1: User2_param2,
          User2: User1_param1,
        },
      ],
    });
    
    if (Existingrome && Matche.Match==true){
    Matche.RommeName=Existingrome
  }
    res.status(200).json(Existingrome.RommeName)

  } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
