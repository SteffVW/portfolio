import Fastify from "fastify";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from '@fastify/cors';

dotenv.config({path: "../.env"});
const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
    origin: "*",
});

const MONGODB_URI = process.env.MONGODB_URI!;

mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch((err: Error) => console.log("MongoDB connection error: ", err));

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String, required: true }],
});

const Post = mongoose.model('Post', PostSchema);

fastify.post("/posts", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { title, content, tags }: { title: string; content: string; tags: string[] } = request.body as { title: string; content: string; tags: string[] };
        const post = new Post({ title, content, tags });
        await post.save();
        reply.send({message: "Post created successfully", post: post});
    } catch (error) {
        reply.status(500).send({message: "Error creating post", error: error});
    }
});

fastify.get("/posts", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const posts = await Post.find();
        reply.send(posts);
    } catch (error) {
        reply.status(500).send({message: "Error fetching posts", error: error});
    }
});

fastify.listen({ port: 3001 }, (err: Error | null, address: string) => {
    if (err){
        throw err;
    }
    else {
        console.log(`Server listening at ${address}`);       
    }
});