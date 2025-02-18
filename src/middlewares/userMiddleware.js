import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

export const jwt_secret = "jwt_secret";
export const userMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                msg: "Token not found ....",
            });
        }
         
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        // need to check the expiry of the token 
        

    } catch (error) {
        console.log(error);
    }
};
