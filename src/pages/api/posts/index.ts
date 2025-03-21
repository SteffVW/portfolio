import { error } from "console";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv'

dotenv.config()

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
    const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
    if(req.method === 'GET'){
        if(req.query.latest) {
            const latestPost = await Post.findOne().sort({createdAt: -1})
            res.status(200).json(latestPost);
        }
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } else if(req.method === "POST"){
        const { title, content, tags }: { title: string; content: string; tags: string[] } = req.body as { title: string; content: string; tags: string[] };
        const post = new Post({ title, content, tags });
        await post.save();
        res.send({message: "Post created successfully", post: post});
        res.status(500).send({message: "Error creating post", error: error});
    }
};

export default handler;