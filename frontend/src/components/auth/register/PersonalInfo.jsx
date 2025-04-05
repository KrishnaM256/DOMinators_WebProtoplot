import React from 'react'
import { RiUser3Fill, RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'

const PersonalInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <div className="divContainer">
      <div className="ipContainer slideUp">
        <RiUser3Fill className="icon stick" />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName">First Name:</label>
      </div>
      <div className="ipContainer slideUp">
        <RiUser3Fill className="icon stick" />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
      </div>
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
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <label htmlFor="password">Password:</label>
      </div>
    </div>
  )
}

export default PersonalInfo
