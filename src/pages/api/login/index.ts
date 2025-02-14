import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config()

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER" },
});

const MONGODB_URI = process.env.MONGODB_URI!;
mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch((err: Error) => console.log("MongoDB connection error: ", err));

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    const User = mongoose.model('User', UserSchema);
    try {
        if(req.method === "GET"){
            const cookies = cookie.parse(req.headers.cookie || '');
            const token = cookies.token;

        if (!token) {
            res.status(200).json({ isAdmin: false, message: "No token found" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, role: string };

        if (decoded.role === "ADMIN") {
            res.status(200).json({ isAdmin: true, message: "Admin logged in" });
        } else {
            res.status(200).json({ isAdmin: false, message: "Not an admin" });
        }

        } else if(req.method === "POST") {
            const {username, password}: {username: string; password: string} = req.body as {username: string; password: string};
            const user = await User.findOne({username: username});
            if(!user){
                res.status(404).json({message: "User not found"})
            } else {
                const validPassword = await bcrypt.compare(password, user.password)
                if(!validPassword){
                    res.status(401).json({message: "Invalid username or password"})
                } else {
                    const payload = {
                        id: user._id,
                        role: user.role
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET!)
                     res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        path: '/',
                        maxAge: 60 * 60 * 24
                    }));
                    return res.status(200).json({message: "Success"})
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error checking login", error: error });
    }
}

export default handler