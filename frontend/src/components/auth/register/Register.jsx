import React, { useEffect, useState } from 'react'
import './Register.css'
import PersonalInfo from './PersonalInfo.jsx'
import AddressInfo from './AddressInfo.jsx'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { setCredentials } from '../../../redux/features/auth/authSlice.js'
import Loader from '../../common/Loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../../redux/api/usersApiSlice.js'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])

  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null,
    address: '',
    state: '',
    city: '',
    password: '',
  })

  const FormTitle = ['Sign Up', 'Personal Info']

  const pageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />
    } else {
      return <AddressInfo formData={formData} setFormData={setFormData} />
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()

    form.append('firstName', formData.firstName)
    form.append('lastName', formData.lastName)
    form.append('email', formData.email)
    form.append('phone', formData.phone)
    form.append('address', formData.address)
    form.append('city', formData.city)
    form.append('state', formData.state)
    form.append('password', formData.password)

    if (formData.avatar) {
      form.append('avatar', formData.avatar)
    }

    try {
      const res = await register(form).unwrap() // Use FormData instead of formData object
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('Successfully registered.')
    } catch (error) {
      toast.error(error.data.message || 'Registration failed')
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    setPage(page + 1)
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setPage(page - 1)
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      enctype="multipart/form-data"
    >
      <div className="formDiv">
        <div className="formHeading">
          <h1>{FormTitle[page]}</h1>
        </div>
        <div className="formBody">{pageDisplay()}</div>
        <div className="navigatePage">
          {page == 0 ? (
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              <button className="btn subBtn" type="button">
                <GrPrevious />
                Log in
              </button>
            </Link>
          ) : (
            <button
              className="btn"
              disabled={page == 0}
              type="button"
              onClick={handlePrev}
            >
              <GrPrevious />
              Prev
            </button>
          )}
          {page == 1 ? (
            <button className="btn subBtn" type="submit">
              {isLoading ? <>Signing Up...</> : <>Sign Up</>}
            </button>
          ) : (
            <button
              className="btn"
              type="button"
              disabled={page == 1}
              onClick={handleNext}
            >
              Next
              <GrNext />
            </button>
          )}
        </div>
      </div>
      {isLoading && <Loader />}
    </form>
  )
}

export default Register
