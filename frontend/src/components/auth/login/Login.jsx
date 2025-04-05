import React, { useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../../redux/api/usersApiSlice'
import Loader from '../../common/Loader/Loader'
import { setCredentials } from '../../../redux/features/auth/authSlice'
import '../register/Register.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [login, { isLoading }] = useLoginMutation()
  console.log(useLoginMutation())

  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(formData).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  return (
    <>
      <form className={`form `} onSubmit={handleSubmit}>
        <div className="formDiv">
          <div className="formHeading">
            <h1>Login</h1>
          </div>
          <div className="divContainer">
            <div className="ipContainer slideUp">
              <MdEmail className="icon stick" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email:</label>
            </div>
            <div className="ipContainer slideUp">
              <RiLockPasswordFill className="icon stick" />

              <input
                type="text"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <label htmlFor="password">Password:</label>
            </div>
          </div>
          <div className="link">
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              New User?
            </Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="btn subBtn" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign in'}
          </button>
        </div>
        {isLoading && <Loader />}
      </form>
    </>
  )
}

export default Login
