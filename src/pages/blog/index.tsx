import Header from "@/components/home/Header";
import styles from "@/styles/blog/Blog.module.css"

const Blog = () => {
    return(
        <div className={styles.container}>
            <Header />
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