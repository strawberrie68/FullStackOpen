const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const {userExtractor} = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const {id} = request.params;
  const user = await User.findById(request.user);

  const blog = await Blog.findById(id).populate("user", {id: 1});

  if (blog.user.toString() === user._id.toString()) {
    return response.status(400).json({error: "Not authorized user"});
  }
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogRouter.post("/", userExtractor, async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  if (blog.title !== "" || blog.url !== "") {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(400).end();
  }
});
blogRouter.put("/:id", async (request, response, next) => {
  const {title, author, url, likes} = request.body;

  Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes},
    {new: true}
  )

    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
