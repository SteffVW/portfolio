import { useState } from "react";
import Header from "@/components/home/Header";
import styles from "@/styles/blog/Blog.module.css";

const Blog = () => {
    const [openPosts, setOpenPosts] = useState<boolean[]>([]);
    const [filter, setFilter] = useState<string>("");

    const togglePost = (index: number) => {
        setOpenPosts(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const posts = [
        { title: "Example Title 1", content: "Example post content goes here...", tags: "example, blog, post" },
        { title: "Example Title 2", content: "Example post content goes here...", tags: "example, blog, post" },
        // Add more posts here
    ];

    const filteredPosts = posts.filter(post => 
        post.tags.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <Header />
            <input 
                type="text" 
                placeholder="Filter by tags" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className={styles.filterInput}
            />
            {filteredPosts.map((post, index) => (
                <div key={index} className={styles.postContainer}>
                    <div className={styles.titleContainer}>
                        <button onClick={() => togglePost(index)} className={styles.postButton}>
                            {openPosts[index] ? "-" : "+"}
                        </button>
                        <h2>{post.title}</h2>
                    </div>
                    {openPosts[index] && (
                        <div className={styles.post}>
                            <p>{post.content}</p>
                            <p><strong>Tags:</strong> {post.tags}</p>
                        </div>
                    )}
                </div>
            ))}
            <form action="POST" className={styles.formContainer}>
                <div className={styles.formItem}>
                    <label>Title</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div className={styles.formItem}>
                    <label>Post</label>
                    <textarea id="post" name="post" rows={10} cols={100}></textarea>
                </div>
                <div className={styles.formItem}>
                    <label>Tags</label>
                    <input type="text" id="tags" name="tags" />
                </div>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default Blog;