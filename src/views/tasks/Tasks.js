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
import { fetchDeleteTask, fetchTasks, deleteTaskById, setUsers } from '../../redux/slices/taskSlice'
import { Link } from 'react-router-dom'
import { BACK_URL } from '../../redux/http'

const Tasks = () => {
  const dispatch = useDispatch()
  const { tasks, isLoading } = useSelector((state) => state.taskReducer)
  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  const onDeleteTask = (id) => {
    dispatch(deleteTaskById(id))
    dispatch(fetchDeleteTask(id))
  }

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
                        <CTableHeaderCell className="text-center">Пользователи</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Редактировать</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Удалить</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tasks.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={`${
                                item.imageId
                                  ? `${BACK_URL + item.imageId[item.imageId.length - 1].link}`
                                  : ''
                              } `}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            <>{item.title}</>
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            <>{item.description}</>
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            <>{new Date(item.date_start).toDateString()}</>
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            <>{new Date(item.date_end).toDateString()}</>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <>
                              {item.userIds
                                ? item.userIds.map((items, index) => (
                                    <CAvatar
                                      key={index}
                                      size="md"
                                      src={`${
                                        item.imageId
                                          ? `${
                                              BACK_URL + item.imageId[item.imageId.length - 1].link
                                            }`
                                          : ''
                                      } `}
                                    />
                                  ))
                                : ''}
                            </>
                          </CTableDataCell>
                          <CTableDataCell className="text-center hover">
                            <Link to={`/task/${item.id}`}>
                              <CIcon className="inHover" icon={cilBrush} />
                            </Link>
                          </CTableDataCell>

                          <CTableDataCell
                            className="text-center hover"
                            onClick={() => onDeleteTask(item.id)}
                          >
                            <CIcon className="inHover" icon={cilDelete} />
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
      <Link to="/task" style={{ color: 'green' }}>
        <div style={{ position: 'fixed', right: '30px', bottom: '100px' }}>
          <CButton color="primary" size="lg" className="me-md-2">
            <CIcon icon={cilNoteAdd} className="me-2" />
            Добавить задание{' '}
          </CButton>
        </div>
      </Link>
    </div>
  )
}

export default Tasks
