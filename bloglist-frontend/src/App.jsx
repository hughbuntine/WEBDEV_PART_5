import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const [newBlog, setNewBlog] = useState(false)

  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setNewMessage('logged in')
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewMessage('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    setNewMessage('logged out')
  }

  const setNewMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {message
        ? <div>{message}</div>
        : null
      }
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>Welcome, {user.username}!<button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <button onClick={() => setNewBlog(!newBlog)}>
            {newBlog ? 'cancel' : 'create new blog'}
          </button>
                    {newBlog ? 
                    <NewBlogForm 
                    setBlogs={setBlogs} 
                    blogs={blogs}
                    setNewMessage={setNewMessage}
                    setNewBlog={setNewBlog}/> 
                    : null}
                    <p></p>
                    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                      <Blog key={blog.id} blog={blog} blogsArray={blogs} setBlogs={setBlogs}/>
                    )}
                  </div>
                }
              </div>
            )
          }

          export default App
