const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./tests/test_helper");
const app = require("./app");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const api = supertest(app);

const Blog = require("./models/blog");

const newUser = {
  username: "automatedTestUser",
  name: "Automated Test User",
  password: "testuser",
};

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("retreive api", () => {
  test("blog are returned as json", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    await api
      .get("/api/blogs")
      .expect(200)
      .set("Authorization", `bearer ${token}`)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("all blogs are returned", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the first blog is about React patterns", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);

    expect(response.body[0].title).toBe("React patterns");
  });

  test("is id is defined", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);

    expect(response.body[0].id).toBeDefined();
  });
});

describe("check if post works", () => {
  test("a blog can be added", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;
    const newBlog = {
      title: "This is a great title",
      author: "yes",
      url: "hello",
      likes: 103,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((n) => n.title);
    expect(title).toContain("This is a great title");
  });
});
// });

describe("check if there is missing info", () => {
  test("if like property is missing default to 0", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const newBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      __v: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.likes);
    expect(contents).toContain(0);
  });

  test("if title or url is empty send 400 error", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const newBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "",
      author: "Michael Chan",
      url: "",
      __v: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    console.log(blogToDelete.id);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("updating blog likes", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedInfo = {...blogToUpdate, likes: blogToUpdate.likes + 1};

    await api
      .put(`/api/blogs/${updatedInfo.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});

    const likes = blogsAtEnd.map((b) => b.likes);

    expect(blogToUpdate.likes + 1).toEqual(likes[0]);
  });

  test("update blog info using id", async () => {
    // const token = (await api.post("/api/login").send(newUser)).body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "this is new tiel",
      author: "Michael Chan",
      url: "this is updated url",
      likes: 1,
      __v: 0,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogUpdated = await helper.blogsInDb();
    expect(blogUpdated).toHaveLength(blogsAtStart.length);
    const title = blogUpdated.map((n) => n.title);
    expect(title).toContain("this is new tiel");
  });
});

// afterAll(async () => {
//   await mongoose.connection.close();
// });
