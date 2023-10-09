import { useState } from 'react'

const Blog = ({ blog, handleLikeClick, removeBlog, user }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [toUpdatedLike, setToUpdatedLike] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLike = async () => {
    setToUpdatedLike((prevBlog) => ({
      ...prevBlog,
      likes: prevBlog.likes + 1,
    }))
    handleLikeClick(toUpdatedLike.id, toUpdatedLike)
  }

  const showDelete = blog.user.id === user.id ? true : false

  return (
    <div style={blogStyle}>
      <div>
        <div>
          <p className="blog">
            {blog.title} by {blog.author}
          </p>
          <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'hide' : 'view'}
          </button>
          <br />
          {isVisible && (
            <div>
              <p data-testid="blog-url"> {blog.url}</p>
              <br />
              <p data-testid="blog-likes">
                likes: {blog.likes} <button onClick={increaseLike}>like</button>
              </p>
              <br />
              {blog.user.name}
            </div>
          )}
        </div>
        {showDelete && (
          <button className="remove-button" onClick={() => removeBlog(blog.id)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
