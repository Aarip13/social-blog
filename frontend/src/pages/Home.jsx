
import { useCallback, useEffect, useState } from "react";
import api from "../api";

export default function Home({ user }) {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);

    const fetchPosts = useCallback(async () => {
        try {
            setError("");
            const response = await api.get("/posts");
            setPosts(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Could not load posts."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    async function handlePublish(e) {
        e.preventDefault();
        setError("");
        setNotice("");
        setPublishing(true);

        try {
            await api.post("/posts", { title, content });

            setTitle("");
            setContent("");
            setNotice("Your post has been published!");
            await fetchPosts();
        } catch (err) {
            setError(
                err.response?.data?.message || "Could not publish post."
            );
        } finally {
            setPublishing(false);
        }
    }

    return (
        <main className="home-page">
            <section className="welcome-section">
                <p className="eyebrow">THE COMMUNITY JOURNAL</p>
                <h1>Ideas worth sharing.</h1>
                <p className="muted">
                    Welcome, {user.username}. What's on your mind today?
                </p>
            </section>

            <section className="editor-card">
                <h2>Write something</h2>

                <form onSubmit={handlePublish}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your post a title..."
                        maxLength={150}
                        required
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your thoughts..."
                        rows={5}
                        maxLength={10000}
                        required
                    />

                    <div className="editor-footer">
                        <span className="muted">
                            {content.length}/10000 characters
                        </span>

                        <button
                            className="button button-primary"
                            disabled={publishing}
                        >
                            {publishing ? "Publishing..." : "Publish post"}
                        </button>
                    </div>
                </form>
            </section>

            {notice && <p className="success">{notice}</p>}
            {error && <p className="error">{error}</p>}

            <section className="feed-section">
                <div className="feed-heading">
                    <h2>Community feed</h2>
                    <button
                        className="button button-outline"
                        onClick={fetchPosts}
                    >
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <p className="muted">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <div className="empty-state">
                        <h3>Your feed starts here.</h3>
                        <p className="muted">
                            Be the first to share something with the community.
                        </p>
                    </div>
                ) : (
                    <div className="post-list">
                        {posts.map((post) => (
                            <article className="post-card" key={post._id}>
                                <div className="post-meta">
                                    <div className="avatar">
                                        {(post.author?.username || "?")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <strong>
                                            {post.author?.username || "Unknown"}
                                        </strong>
                                        <p className="muted post-date">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <h3>{post.title}</h3>
                                <p className="post-content">{post.content}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
