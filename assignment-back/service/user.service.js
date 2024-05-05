const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()


class UserService{
    static async registerUser(name, email, password, phone){
        try {             
            const createUser = new UserModel({name, email, password, phone});
            
            await createUser.save();

            return createUser;

        } catch (error) {
            return error
        }
    }

    static async getUserByEmail(email){
        try{
            //console.log("ByEmail")
            
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }
    static async checkUser(phone){
        try {
           // console.log(phone)
            return await UserModel.findOne({phone});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        JWTSecret_Key = process.env.SECRET || JWTSecret_Key;
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}


module.exports = UserService;