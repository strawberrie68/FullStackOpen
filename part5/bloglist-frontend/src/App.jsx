import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      setBlogs([...blogs, blog])
      notifyWith(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (exception) {
      notifyWith('error: blog was not added')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addLike = async (id, updatedBlog) => {
    const blogsUpdated = blogs.map((blog) =>
      blog.id === id ? updatedBlog : blog,
    )
    try {
      const blog = await blogService.update(id, updatedBlog)
      setBlogs(blogsUpdated)
      notifyWith(`blog ${updatedBlog.title} by ${updatedBlog.author} updated`)
    } catch {
      notifyWith('error: blog was not updated')
    }
  }

  const removeBlog = async (id) => {
    try {
      const blog = await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      notifyWith('blog is removed')
    } catch {
      notifyWith('error: blog was not removed')
    }
  }

  const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification info={info} />

      {!user ? (
        <div>
          <h1>Login in to application</h1>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                id="username"
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                id="password"
              />
            </div>
            <button type="submit" id="login-button">
              login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <br />
          <Togglable buttonLabel="new blog" id="new-blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.length !== 0 &&
            blogsSorted?.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeClick={(id, updatedBlog) =>
                  addLike(blog.id, updatedBlog)
                }
                user={user}
                removeBlog={() => removeBlog(blog.id)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
