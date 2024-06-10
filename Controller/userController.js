import userSchema from "../Model/UserModel.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()

const Secreat_key = process.env.SECREAT_KEY

class User{
    constructor(){

    }

    static Register = async (req, res) => {
        const { name, email, password } = req.body;
      
        if (!name || !email || !password) {
          return res.json({ message: "Please fill all details" });
        }
      
        try {
          const check = await userSchema.findOne({ email });
          if (check) {
            return res.json({ success: false, message: "Email already exists" });
          }
      
          let cart = {};
          for (let i = 0; i < 300; i++) {
            cart[i] = 0;
          }
      
          const user = new userSchema({
            name,
            email,
            password,
            cartData: cart,
          });
      
          await user.save();
      
          const token = jwt.sign({ id: user.id }, Secreat_key, { expiresIn: "2d" });
          res.json({ success: true, token });
        } catch (error) {
         
          res.status(500).json({ error: "Internal server error" }); // Handle generic errors
        }
      };



      static login = async(req, res)=>{
        const{email , password} = req.body
        if(!email || !password){
        return res.status(400).json({ message: "Please fill all details" });

        }

        try{
            const user = await userSchema.findOne({email : email})
            if(user){
                const passcompare = password === user.password
                if(passcompare){
                    const token = jwt.sign({id : user.id} , Secreat_key , {expiresIn : "2d"})
                    res.json({ success : true ,  token: token  , userdata : user  });
    
                }
    
             
            }

            else {
                res.json({ success : false ,  error: "user not found" });
            }

      


        }

        catch(error){
         res.status(500).json({ error: "Internal server error" }); // Handle generic errors

        }

      }
      
}


export default User