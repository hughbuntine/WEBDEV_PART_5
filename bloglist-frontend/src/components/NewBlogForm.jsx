import { useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const NewBlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: title,
          author: author,
          url: url
        }
    
        blogService
          .create(blogObject)
          .then(returnedBlog => {
            props.setBlogs(props.blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
          })
    
          props.setNewMessage(`a new blog ${title} by ${author} added`)
          props.setNewBlog(false)
      }

      return (
        <form onSubmit={addBlog}>
      <div>
        title:
          <input
          label="title:"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          label='author:'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          label='url:'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      </form>
      )
    }

    NewBlogForm.propTypes = {
      setBlogs: PropTypes.func.isRequired,
      blogs: PropTypes.array.isRequired,
      setNewMessage: PropTypes.func.isRequired,
      setNewBlog: PropTypes.func.isRequired
    }

    export default NewBlogForm
