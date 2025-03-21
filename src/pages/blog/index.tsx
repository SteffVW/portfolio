import { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import styles from "../../styles/blog/Blog.module.css";
import { IPost } from "../../../types";

const Blog = () => {
    const [openPosts, setOpenPosts] = useState<boolean[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPosts = async () => {
        setLoading(true)
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
        setInterval(() => {
            setLoading(false)
        }, 500);
    };
    
    const checkAdmin = async () => {
        const response = await fetch('/api/login', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        if(data.isAdmin){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        fetchPosts();
        checkAdmin();
    }, [])

    const togglePost = (index: number) => {
        setOpenPosts(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title, 
                content, 
                tags: tags.split(',').map(tag => tag.trim())
            }),
        });

        if (res.ok) {
            window.location.reload();
        } else {
            alert('Error');
        }
    };

    const filteredPosts = posts.filter(post => 
        filter.split(' ').every(f => 
            post.tags.some(tag => tag.toLocaleLowerCase().includes(f.trim().toLocaleLowerCase()))
        )
    );

    return (
        loading ? 
        <div className={styles.loadingContainer}>
            <Header />
            <input 
                type="text" 
                placeholder="Filter by tags (separated by space)" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className={styles.filterInput}
            />
            <h1>Posts laden...</h1>
        </div> :
        <div className={styles.container}>
            <Header />
            <input 
                type="text" 
                placeholder="Filter by tags (separated by space)" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className={styles.filterInput}
            />
            <div className={styles.postsContainer}>
            {filteredPosts.map((post, index) => (
                <div key={index} className={openPosts[index] ? styles.openPostContainer : styles.postContainer }>
                    <div className={styles.titleContainer}>
                        <button onClick={() => togglePost(index)} className={styles.postButton}>
                            {openPosts[index] ? "-" : "+"}
                        </button>
                        <h2>{post.title}</h2>
                        <h3 className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</h3>
                    </div>
                    {openPosts[index] && (
                        <div className={styles.post}>
                            <p>{post.content}</p>
                            <p><strong>Tags:</strong></p>
                            <div className={styles.tagsContainer}>
                                {post.tags.map(tag => <div className={styles.tags} key={tag}><p>{tag}</p></div>)}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            </div>
            {isAdmin && 
                <form action="POST" className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={styles.formItem}>
                        <label>Post</label>
                        <textarea id="post" name="post" rows={10} cols={100} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className={styles.formItem}>
                        <label>Tags</label>
                        <input type="text" id="tags" name="tags" value={tags} onChange={(e) => setTags(e.target.value)}/>
                    </div>
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            }
        </div>
    );
};

export default Blog;
