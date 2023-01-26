import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
           
        },
        googleID:{
            type:String,
            require:true
        },
        FirstName:{
            type:String,
            require:true
        },
        LasteName:{
            type:String,
            require:true
        },
        Age:{
            type:Number,
            require:true
        },
        Numero:{
            type:String,
            require:true
        },
        Sexe:{
            type:String,
            require:true
        },
        Image:{
            type:String,
            require:true
        },
        Matches:{
            type:[mongoose.Schema.Types.ObjectId]
        },
      
        AboutYou:{
            type:String,
            require:true
        },
        Job :{
            type:String,
            require:true
        },
        School:{
            type:String,
            require:true
        },
        AgeMax:{
            type:String,
          
        },
        AgeMin:{
            type:String,
          
        },
        
        longitude:{
            type:String,
          
        },
        latitude:{
            type:String,
          
        },

    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);