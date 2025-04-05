import React from 'react'
import { indianStates, indianCities } from '../../data/indiaData.js'
import { FaAddressBook } from 'react-icons/fa6'
import { FaPhoneAlt, FaImage } from 'react-icons/fa'

const AddressInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    })
  }
  return (
    <div className="divContainer">
      <div className="ipContainer select">
        <label htmlFor="avatar">Profile Photo:</label>
        <input type="file" name="avatar" onChange={handleFileChange} required />
      </div>
      <div className="ipContainer slideUp">
        <FaAddressBook className="icon stick" />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={formData.address}
          required
        />
        <label htmlFor="address">Address:</label>
      </div>
      <div className="ipContainer select">
        <label htmlFor="state">State:</label>
        <select
          name="state"
          className="selectField"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select a state</option>
          {indianStates.map((state, i) => (
            <option key={`state-${i}`} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="ipContainer select">
        <label htmlFor="city">City:</label>
        <select
          name="city"
          className="selectField"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select a city</option>
          {indianCities.map((city, i) => (
            <option key={`city-${i}`} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="ipContainer slideUp">
        <FaPhoneAlt className="icon stick" />

        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone Number:</label>
      </div>
    </div>
  )
}

export default AddressInfo
