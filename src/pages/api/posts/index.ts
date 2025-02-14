import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String, required: true }],
});

const MONGODB_URI = process.env.MONGODB_URI!;
mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch((err: Error) => console.log("MongoDB connection error: ", err));

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    const Post = mongoose.model('Post', PostSchema);
    if(req.method === 'GET'){
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
};

export default handler;