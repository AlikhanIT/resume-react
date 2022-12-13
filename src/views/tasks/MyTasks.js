import React, { useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBrush, cilDelete, cilNoteAdd, cilTask } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDeleteTask,
  fetchTasks,
  deleteTaskById,
  setUsers,
  fetchGetMyTasks,
} from '../../redux/slices/taskSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BACK_URL } from '../../redux/http'
import { Avatar } from '@mui/material'
import { deepPurple } from '@mui/material/colors'

const Tasks = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tasks, isLoading } = useSelector((state) => state.taskReducer)
  const { isLogged } = useSelector((state) => state.userReducer)
  useEffect(() => {
    if (isLogged) {
      dispatch(fetchTasks())
    } else {
      navigate('/login')
    }
  }, [])
  useEffect(() => {
    dispatch(fetchGetMyTasks())
  }, [])

  return (
    <div className="position-relative">
      {isLoading ? (
        <CSpinner
          color="primary"
          style={{
            scale: '3',
            display: 'block',
            margin: '0px auto',
            marginTop: '230px',
            marginBottom: '50px',
          }}
        />
      ) : (
        <>
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>Задания</CCardHeader>
                <CCardBody>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilTask} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Задание</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Описание</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Начало</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Конец</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tasks
                        ? tasks.map((item, index) => (
                            <CTableRow v-for="item in tableItems" key={index}>
                              <CTableDataCell className="text-center">
                                <Link to={`/getTask/${item.id}`} style={{ textDecoration: 'none' }}>
                                  <div>
                                    <Avatar
                                      key={index}
                                      sx={{ bgcolor: deepPurple[500], margin: '0 auto' }}
                                    >
                                      {item.title ? item.title[0].toUpperCase() : 'A'}
                                    </Avatar>
                                  </div>
                                </Link>
                              </CTableDataCell>
                              <CTableDataCell className="text-start">
                                <>{item.title}</>
                              </CTableDataCell>
                              <CTableDataCell className="text-start">
                                <>{item.description}</>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <>{new Date(item.date_start).toDateString()}</>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <>{new Date(item.date_end).toDateString()}</>
                              </CTableDataCell>
                            </CTableRow>
                          ))
                        : ''}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </div>
  )
}

export default Tasks
