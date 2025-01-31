import Fastify from "fastify";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from '@fastify/cors';
import bcrypt from "bcrypt";
import jwt from "@fastify/jwt";

dotenv.config({path: "../.env"});
const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
    origin: "*",
});

fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "supersecretkey"
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

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER" },
});

const User = mongoose.model('User', UserSchema);

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
        const posts = await Post.find().sort({ createdAt: -1 });
        reply.send(posts);
    } catch (error) {
        reply.status(500).send({message: "Error fetching posts", error: error});
    }
});

fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const {username, password}: {username: string; password: string} = request.body as {username: string; password: string};
        const user = await User.findOne({username: username});
        console.log(user);
        if(!user){
            reply.status(404).send({message: "User not found"});
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                reply.status(401).send({message: "Invalid password or username"});
            } else {
                const token = fastify.jwt.sign({ id: user._id, role: user.role });
                reply.send({ token });             
            }
        }
    } catch (error) {
        reply.status(500).send({message: "Error logging in", error: error});
    }
});

fastify.listen({ port: 3001 }, async(err: Error | null, address: string) => {
    if (err){
        throw err;
    }

    const createInitialUser = async () => {
        const username = process.env.ADMIN_USERNAME!;
        const password = process.env.ADMIN_PASSWORD!;
        const saltRounds = parseInt(process.env.SALT_ROUNDS!);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, password: hashedPassword, role: "ADMIN" });
        await user.save();
    }

    if(await User.countDocuments() === 0){
        await createInitialUser();
    }

    else {
        console.log(`Server listening at ${address}`);       
    }
});