var _ = require("lodash");

const countLikes = (blogs) => {
  const result = blogs.reduce((totalLikes, c) => totalLikes + c.likes, 0);
  return result;
};

const favoriteBlog = (blog) => {
  const result = blog.reduce(
    (max, blog) => (max.likes > blog.likes ? max : blog),
    0
  );
  return result;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const result = blogs.reduce((acc, blog) => {
    return {...acc, [blog.author]: (acc[blog.author] || 0) + 1};
  }, {});

  const maxKey = Object.keys(result).reduce(
    (a, b) => (result[a] > result[b] ? a : b),
    0
  );
  const maxValue = Object.values(result).reduce(
    (a, b) => (result[a] > result[b] ? a : b),
    0
  );

  const ojb = {
    author: maxKey,
    blogs: maxValue,
  };
  return ojb;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const result = blogs.reduce((acc, blog) => {
    return {...acc, [blog.author]: (acc[blog.author] || 0) + blog.likes};
  }, {});

  const maxKey = Object.keys(result).reduce(
    (a, b) => (result[a] > result[b] ? a : b),
    0
  );

  const maxValue = Object.values(result).reduce(
    (a, b) => (result[a] > result[b] ? a : b),
    0
  );

  const likeObj = {
    author: maxKey,
    likes: maxValue,
  };

  return likeObj;
};

module.exports = {
  countLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
