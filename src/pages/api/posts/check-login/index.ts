import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import jwt from "jsonwebtoken";


const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error checking login", error: error });
    }
}

export default handler