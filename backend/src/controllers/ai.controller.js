import aiService from '../sevices/ai.services.js';
import User from '../models/user.js';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getresponse =  async (req, res) => {
 try{
    const code = req.body.code  || "default prompt"; 
    console.log("Incoming prompt:", code); 


    if(!code){
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await aiService(code);
       console.log("AI Response:", result); 
       res.json({ review: result });
} catch (error) {
    console.error("Error generating response:", error); 
    res.status(500).json({ error: 'Failed to generate response' });
 }
}

const register = async (req, res)=>{
    try{
    let {username,email,password} = req.body;
    console.log("received:",req.query);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword
    })

    await user.save();
    const token = JWT.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h"}
    )
     console.log("user saved successfully");
     res.status(201).json({message:"user created succesfully",token,user});
}catch(err){
        res.status(500).json({error:err.message});
}
}

const login = async(req, res)=>{
    try{
        let {email,password} = req.body;
        console.log("email:" + email , "password:" + password);

        const user = await User.findOne({email});
        if(!user){
            console.log("invalid email");
            return res.status(400).json({message:"invalid email"});
        }

        const isSame = await bcrypt.compare(password, user.password);
        if(!isSame){
            console.log("invalid password");
            return res.status(400).json({message:"invalid credentials"});
        }
            const token = JWT.sign(
            {
                userId : user._id
            },
            process.env.JWT_SECRET,
            {expiresIn:"2h"}
        );

         res.status(200).json({ token,
        message: "Login successful",
        user: {
         email: user.email
       }
       });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export default {
    getresponse,
    register,
    login 
};
