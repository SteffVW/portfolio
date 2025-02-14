// import Fastify from "fastify";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { FastifyReply, FastifyRequest } from "fastify";
// import fastifyCors from '@fastify/cors';
// import bcrypt from "bcrypt";
// import jwt from "@fastify/jwt";
// import fastifyCookie from "@fastify/cookie";

// dotenv.config({path: "../.env"});
// const fastify = Fastify({ logger: true });

// fastify.register(fastifyCors, {
//     origin: ["http://localhost:3000", "https://portfolio-steff.aertssen.be"],
//     credentials: true
// });

// fastify.register(jwt, {
//     secret: process.env.JWT_SECRET!
// });

// fastify.register(fastifyCookie);

// const MONGODB_URI = process.env.MONGODB_URI!;

// mongoose.connect(MONGODB_URI, {
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err: Error) => console.log("MongoDB connection error: ", err));

// const PostSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     tags: [{ type: String, required: true }],
// });

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     role: { type: String, required: true, default: "USER" },
// });

// const User = mongoose.model('User', UserSchema);

// const Post = mongoose.model('Post', PostSchema);

// fastify.post("/posts", async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const { title, content, tags }: { title: string; content: string; tags: string[] } = request.body as { title: string; content: string; tags: string[] };
//         const post = new Post({ title, content, tags });
//         await post.save();
//         reply.send({message: "Post created successfully", post: post});
//     } catch (error) {
//         reply.status(500).send({message: "Error creating post", error: error});
//     }
// });

// fastify.get("/posts", async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const posts = await Post.find().sort({ createdAt: -1 });
//         reply.send(posts);
//     } catch (error) {
//         reply.status(500).send({message: "Error fetching posts", error: error});
//     }
// });

// // export const getPosts = async(): Promise<IPost[]>  => {
// //     const posts = await Post.find().sort({ createdAt: -1 });
// //     console.log(posts);
// //     return posts;
// // }

// fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const {username, password}: {username: string; password: string} = request.body as {username: string; password: string};
//         const user = await User.findOne({username: username});
//         console.log(user);
//         if(!user){
//             reply.status(404).send({message: "User not found"});
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if(!isPasswordValid){
//                 reply.status(401).send({message: "Invalid password or username"});
//             } else {
//                 const token = fastify.jwt.sign({ id: user._id, role: user.role });
//                 reply.setCookie("token", token,
//                      {
//                         httpOnly: true,
//                         secure: true,
//                         sameSite: "strict",
//                         path: "/",
//                         maxAge: 60 * 60 * 24 
//                     });
//                 reply.send({message: "Logged in successfully"});
//             }
//         }
//     } catch (error) {
//         reply.status(500).send({message: "Error logging in", error: error});
//     }
// });

// fastify.get("/check-login", async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const token = request.cookies.token;
//         if(!token){
//             reply.send({isAdmin: false, message: "No token found"});
//         }
//         if(token){
//             const decoded = fastify.jwt.verify(token) as {id: string, role: string};
//             if(decoded.role === "ADMIN"){
//                 reply.send({isAdmin: true, message: "Admin logged in"});
//             }
//         }
//     } catch (error) {
//         reply.status(500).send({message: "Error checking login", error: error});
//     }
// });

// export const startServer = async() =>{ 
//     fastify.listen({ port: Number(process.env.PORT) || 8080, host: "0.0.0.0" }, async(err: Error | null, address: string) => {
//     if (err){
//         throw err;
//     }
//     else {
//         console.log(`Server listening at ${address}`);       
//     }
//  });
// }

// startServer();

// // fastify.listen({ port: Number(process.env.PORT) || 8080, host: "0.0.0.0" }, async(err: Error | null, address: string) => {
// //     if (err){
// //         throw err;
// //     }

// //     const createInitialUser = async () => {
// //         const username = process.env.ADMIN_USERNAME!;
// //         const password = process.env.ADMIN_PASSWORD!;
// //         const saltRounds = parseInt(process.env.SALT_ROUNDS!);
// //         const hashedPassword = await bcrypt.hash(password, saltRounds);
// //         const user = new User({ username, password: hashedPassword, role: "ADMIN" });
// //         await user.save();
// //     }

// //     if(await User.countDocuments() === 0){
// //         await createInitialUser();
// //     }

// //     else {
// //         console.log(`Server listening at ${address}`);       
// //     }
// // });
