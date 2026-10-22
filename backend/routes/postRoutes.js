
const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE A POST
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        if (title.trim().length > 150 ||
            content.trim().length > 10000) {
            return res.status(400).json({
                message: "Title or content is too long"
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim(),
            author: req.userId
        });

        await post.populate("author", "username");

        res.status(201).json({
            message: "Post published successfully",
            post
        });
    } catch (error) {
        console.error("Create post error:", error.message);

        res.status(500).json({
            message: "Failed to create post"
        });
    }
});

// GET ALL POSTS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username")
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json(posts);
    } catch (error) {
        console.error("Fetch posts error:", error.message);

        res.status(500).json({
            message: "Failed to fetch posts"
        });
    }
});

module.exports = router;
