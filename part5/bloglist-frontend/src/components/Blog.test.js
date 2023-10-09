import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import Blog from './Blog'
describe('<Check if content is there />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'this is an author',
      url: 'www.hello.com',
      likes: 0,
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library',
    )
    expect(div).toHaveTextContent('this is an author'),
      expect(div).not.toHaveTextContent('www.hello.com'),
      expect(div).not.toHaveTextContent('likes: 0')
  })
})

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>,
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('cancel')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('check the like button', () => {
  test('click like 2 times, increase like by 2', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'this is an author',
      url: 'www.hello.com',
      likes: 0,
      user: {
        name: 'michelle',
      },
    }
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLikeClick={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('test <BlogForm /> updates parent state and calls onSubmit', () => {
  test('create blog with the right info', async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('title of blog')
    const inputAuthor = screen.getByPlaceholderText('who is the author')
    const inputUrl = screen.getByPlaceholderText('www.url.com')
    const createButton = screen.getByText('create')

    await userEvent.type(inputTitle, 'this is a great title of a book')
    await userEvent.type(inputAuthor, 'some great wrote this book')
    await userEvent.type(inputUrl, 'www.bomb.com')
    await userEvent.click(createButton)

    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(
      'this is a great title of a book',
    )
    expect(createBlog.mock.calls[0][0].author).toBe(
      'some great wrote this book',
    )
    expect(createBlog.mock.calls[0][0].url).toBe('www.bomb.com')
  })
})
