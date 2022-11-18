import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, fetchUsers } from '../../../redux/slices/userSlice'
import 'react-phone-input-2/lib/style.css'
import { useNavigate, useParams } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { fetchCreateTask, fetchTaskById, fetchUpdateTask } from '../../../redux/slices/taskSlice'
import $api from '../../../redux/http'
import { BACK_URL } from '../../../redux/http'

const Task = () => {
  const { task, isError } = useSelector((state) => state.taskReducer)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fileId, setFileId] = useState('')
  const [imageId, setImageId] = useState([{ link: '' }])
  const [dateEnd, setDateEnd] = useState(new Date())
  const [userIds, setUserIds] = useState('')
  const [user, setUser] = useState('')
  const { users } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onCreateTask = (userSend) => {
    dispatch(
      fetchCreateTask({
        title,
        description,
        fileId,
        imageId,
        dateEnd,
        userIds: userSend.map((items) => {
          return items.id
        }),
      }),
    )
    navigate('/')
  }

  const onUpdateTask = (userSend) => {
    dispatch(
      fetchUpdateTask({
        id,
        title,
        description,
        fileId: fileId,
        imageId: imageId,
        dateEnd,
        userIds: userSend.map((items) => {
          return items.id
        }),
      }),
    )
    navigate('/')
  }

  const handleChangeFile = async (event) => {
    try {
      const form = new FormData()
      const file = event.target.files[0]
      form.append('image', file)
      const { data } = await $api.post('/upload', form, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      })
      setImageId(imageId.push([{ link: data.url }]))
    } catch (err) {
      console.warn(err)
    }
  }

  const { id } = useParams()
  let userId = typeof userIds == 'string' ? userIds.split(',') : userIds

  const unique = (arr) => {
    let result = []

    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str)
      }
    }

    return result
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id))
      dispatch(fetchUsers())
    }
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    let ter = [{ link: 'test' }]
    console.log('test', task.imageId[0] ? task.imageId[task.imageId.length - 1].link : [])
    console.log('test2', ter)
    if (id) {
      setTitle(task.title)
      setDescription(task.description)
      setFileId('')
      setDateEnd(new Date(task.date_end))
      setImageId(task.imageId[0] ? task.imageId : '')
      const userTask = typeof task.userIds != 'string' ? task.userIds.join(',') : task.userIds
      setUserIds(userTask)
      setUser(task.user)
      console.log(task.user)
      userId = userIds.split(',')
    } else {
      setTitle('')
      setDescription('')
      setFileId('')
      setImageId([{ link: 'test' }])
      setUserIds('')
      setDateEnd(new Date())
      userId = userIds.split(',')
    }
  }, [task])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="d-flex flex-column align-items-center justify-content-center">
                  {id ? <h1>Обновление задание</h1> : <h1>Создание задание</h1>}
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Название задания"
                      autoComplete="task"
                      value={title}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Описание задания"
                      autoComplete="description"
                      value={description}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3" style={{}}>
                    <div>
                      <Calendar onChange={setDateEnd} value={dateEnd} />
                    </div>
                  </CInputGroup>
                  {/*<CInputGroup className="mb-3">*/}
                  {/*  <CInputGroupText>*/}
                  {/*    <CIcon icon={cilLockLocked} />*/}
                  {/*  </CInputGroupText>*/}
                  {/*  <CFormInput*/}
                  {/*    onChange={(event) => {*/}
                  {/*      setUserIds(event.target.value)*/}
                  {/*    }}*/}
                  {/*    placeholder="Пользователи"*/}
                  {/*    autoComplete="users"*/}
                  {/*    value={userIds}*/}
                  {/*  />*/}
                  {/*</CInputGroup>*/}
                  {imageId
                    ? imageId.map((item, index) => (
                        <div
                          key={index}
                          className="clearfix image"
                          style={{ position: 'relative', backgroundColor: '1px solid red' }}
                        >
                          <CImage
                            align="start"
                            rounded
                            src={`${BACK_URL}${item.link}`}
                            style={{ marginBottom: '15px' }}
                            width={200}
                          />
                          <CButton
                            className="childs"
                            onClick={() => {}}
                            type="button"
                            color="secondary"
                            variant="outline"
                          >
                            <CIcon icon={cilDelete} />
                          </CButton>
                        </div>
                      ))
                    : ''}
                  <CInputGroup style={{ marginBottom: '20px' }}>
                    <CFormInput
                      type="file"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      onChange={handleChangeFile}
                    />
                    <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      id="inputGroupFileAddon04"
                      onClick={() => {
                        console.log(imageId)
                      }}
                    >
                      Button
                    </CButton>
                  </CInputGroup>
                  {(user ? user : [...new Array(1)]).map((item, index) => {
                    return (
                      <CInputGroup key={index} style={{ marginBottom: '30px' }}>
                        <CFormSelect
                          id="inputGroupSelect04"
                          aria-label="Example select with button addon"
                          onChange={(event) => {
                            console.log(event.target.value)
                            console.log(user)
                            let userRemove = user
                              ? user.map((items, i) => {
                                  if (items.id === item.id) {
                                    return {
                                      ...users.find((itemss) => itemss.id === event.target.value),
                                    }
                                  } else {
                                    return items
                                  }
                                })
                              : [...new Array(1)]
                                  .map((items) => {
                                    return {
                                      ...users.find((itemss) => itemss.id === event.target.value),
                                    }
                                  })
                                  .filter((n) => n)
                            console.log(userRemove)
                            setUser(userRemove)
                            console.log('userRemove', userRemove)
                            console.log('user', user)
                          }}
                        >
                          {user ? <option value={item.id}>{item.email}</option> : <option></option>}
                          {users.map((items) => (
                            <option value={items.id} key={items.id}>
                              {items.email}
                            </option>
                          ))}
                        </CFormSelect>
                        <CButton
                          onClick={() => {
                            let userRemove = user
                            console.log(userRemove)
                            userRemove = userRemove.filter((items, i) => items.id !== item.id)
                            console.log(userRemove)
                            setUser(userRemove)
                          }}
                          type="button"
                          color="secondary"
                          variant="outline"
                        >
                          <CIcon icon={cilDelete} />
                        </CButton>
                      </CInputGroup>
                    )
                  })}
                  <div className="d-grid gap-2 col-12 mx-auto" style={{ marginBottom: '15px' }}>
                    <CButton
                      onClick={() => {
                        let userRemove = user ? user : [...new Array(1)]
                        userRemove = userRemove
                          .map((items, index) => {
                            if (items) {
                              return items
                            }
                            return { ...items, id: index }
                          })
                          .filter((n) => n)

                        userRemove[userRemove.length] = { id: userRemove.length }
                        setUser(userRemove)
                      }}
                      color="primary"
                    >
                      Добавить пользователя
                    </CButton>
                  </div>
                  <div
                    className="d-grid"
                    onClick={() => {
                      let userSend = user.filter((items) => items.id.length === 24)
                      id ? onUpdateTask(userSend) : onCreateTask(userSend)
                    }}
                  >
                    {id ? (
                      <CButton color="success">Обновить задания</CButton>
                    ) : (
                      <CButton color="success">Создать задания</CButton>
                    )}
                  </div>
                </CForm>
                {isError ? (
                  <CAlert style={{ marginTop: '10px' }} color="danger">
                    Введены неверные данные
                  </CAlert>
                ) : (
                  ''
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Task
