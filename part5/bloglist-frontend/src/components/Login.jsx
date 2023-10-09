import { useState } from 'react'
import axios from 'axios'
// import loginService from './services/login'

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const onSubmit = (event) => {
    event.preventDefault()
    alert('does this work')

    axios
      .post('http://localhost:3000/api/login', user)
      .then((res) => {
        setUser({
          username: '',
          password: '',
        })
      })
      .catch((err) => {
        console.log('Error Logining in')
      })
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      }
    })
  }

  console.log(user)

  return (
    <div>
      <h1>Login to Application</h1>
      <form noValidate onSubmit={onSubmit}>
        <label htmlFor="username">
          {' '}
          Username
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
          />
        </label>
        <label htmlFor="password">
          {' '}
          Password
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
