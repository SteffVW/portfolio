import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../lib/mongoose";
import Post from "../../../../models/Posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    } 
    
    else if (req.method === 'POST') {
        const { title, content, tags } = req.body;
        const newPost = new Post({ title, content, tags });
        await newPost.save();
        return res.status(201).json(newPost);
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
