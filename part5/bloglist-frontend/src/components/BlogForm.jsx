import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setNewBlog((prevBlog) => {
      return {
        ...prevBlog,
        [name]: value,
      }
    })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={onChange}
            placeholder="title of blog"
            id="title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={onChange}
            placeholder="who is the author"
            id="author"
          />
        </div>
        <div>
          url
          <input
            type="test"
            value={newBlog.url}
            name="url"
            onChange={onChange}
            placeholder="www.url.com"
            id="url"
          />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
