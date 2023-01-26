import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const matcheSchema = new Schema(
    {
        User1:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
        User2:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    
        User1_Right:{
            type : Boolean,
            default:true
        },
    
        User2_Right:{
    
            type : Boolean,
            default:false
        },
    
        Match:{
    
            type : Boolean,
            default:false
        },
        RommeName:{
    
            type : String,
            require:true
        },
    
    
    },{timestamps : true })



export default model('Matche', matcheSchema);