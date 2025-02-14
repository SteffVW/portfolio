import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER" },
});

const User = mongoose.model('User', UserSchema);

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
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
                res.status(404).send({message: "User not found"});
            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                    if(!isPasswordValid){
                        res.status(401).send({message: "Invalid password or username"});
                    } else {
                        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!);
                        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'strict',
                            path: '/',
                            maxAge: 60 * 60 * 24
                        }));
                    res.send({message: "Logged in successfully"});
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error checking login", error: error });
    }
}

export default handler