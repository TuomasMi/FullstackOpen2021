var _ = require("lodash");

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  var total = 0;
  blogs.forEach((blog) => {
    total = total + blog.likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  var favBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog;
    }
  });

  const result = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };

  return result;
};

const mostBlogs = (blogs) => {
  var mBlogs = _.filter(blogs, { author: blogs[0].author });
  blogs.forEach((blog) => {
    var x = _.filter(blogs, { author: blog.author });
    if (x.length > mBlogs.length) {
      mBlogs = x;
    }
  });

  const result = {
    author: mBlogs[0].author,
    blogs: mBlogs.length,
  };

  return result;
};

const mostLikes = (blogs) => {
  var author;
  var likes = 0;

  blogs.forEach((blog) => {
    var blogsOfAuthor = _.filter(blogs, { author: blog.author });
    var Alikes = 0;
    blogsOfAuthor.forEach((Ablog) => {
      Alikes = Alikes + Ablog.likes;
    });
    if (Alikes > likes) {
      likes = Alikes;
      author = blog.author;
    }
  });

  const result = {
    author: author,
    likes: likes,
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
