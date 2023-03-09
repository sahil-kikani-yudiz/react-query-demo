/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import './registration.scss'
import { apidata } from '../../constants/api/api'

export default function Registration () {
  const [formData, setFormData] = useState({
    name: '',
    city: ''
  })
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [cityErrorMessage, setCityErrorMessage] = useState('')

  const queryClient = useQueryClient()

  const updatedata = async () => {
    const { data } = await axios.post(
      'https://63d8e86574f386d4efe04cc5.mockapi.io/users',
      formData
    )

    return data
  }
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: apidata
  })
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: updatedata,
    onSuccess: () => queryClient.invalidateQueries('users')
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.name && formData.city) {
      setNameErrorMessage('eneter name')
    } else if (!formData.city && formData.name) {
      setCityErrorMessage('enter city')
    } else if (!formData.name && !formData.city) {
      setCityErrorMessage('enter city')
      setNameErrorMessage('eneter name')
    } else {
      setCityErrorMessage('')
      setNameErrorMessage('')
      event.preventDefault()
      mutate(formData)
      setFormData({ name: '', city: '' })
    }
  }

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className="registration-form">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="name"
        />
        <p style={{ color: 'red' }}>{nameErrorMessage || null}</p>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="city"
        />
        <p style={{ color: 'red' }}>{cityErrorMessage || null}</p>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <p>{error.message}</p>}

      <div className="container mt-4">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr className="text-black">
                <th>#</th>
                <th>Name</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.city}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
