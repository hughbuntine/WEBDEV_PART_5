import { useState } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const Blog = ({ blog, setBlogs, blogsArray}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const deleteBlog = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (confirmDelete) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogsArray.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      <>{ blog.title + ' ' + blog.author}</> <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>remove</button>
        </div>
    </div>  
  )
}

export default Blog