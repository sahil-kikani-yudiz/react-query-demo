/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Header from '../shared/component/header'
import Thead from '../shared/component/thead/thead'
import { apidata } from '../shared/constants/api/api'

function List () {
  const [selectedUserId, setSelectedUserId] = useState(null)

  const viewdata = async () => {
    const response = await axios.get(
      `https://63d8e86574f386d4efe04cc5.mockapi.io/post/${selectedUserId}`
    )
    return response.data
  }

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: apidata
  })

  const { data: userPosts } = useQuery({
    queryKey: ['userPosts', selectedUserId],
    queryFn: () => viewdata(selectedUserId),
    enabled: !!selectedUserId
  })

  console.log(userPosts)
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId)
  }

  return (
    <>
    <Header/>
      <div className="container mt-4">
        <div className="card-body">
          <table className="table table-hover">
           <Thead/>
            <tbody>
              {users &&
                users?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td scope="row">{data.id}</td>
                      <td>
                        <img
                          style={{ borderRadius: '50%', height: '35px' }}
                          src={data?.avatar}
                        />
                      </td>
                      <td>{data?.name}</td>
                      <td>{data.city}</td>
                      <td>
                        <Button onClick={() => handleUserSelect(data.id)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        {selectedUserId && (() => {})}

        {userPosts
          ? <div className="card m-4">
            {console.log(userPosts)}
          <img style={{ width: '100px', height: '100px' }} className="card-img-top m-3" src={userPosts?.avtar}/>
          <div className="card-body">
            <h5 className="card-title">User No {selectedUserId}</h5>
            <p className="card-text">{userPosts?.post}</p>
          </div>
        </div>

          : ''}

      </div>
    </>
  )
}

export default List
