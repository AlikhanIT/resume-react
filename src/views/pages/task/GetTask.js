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
  CFormTextarea,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, fetchUsers } from '../../../redux/slices/userSlice'
import 'react-phone-input-2/lib/style.css'
import { useNavigate, useParams } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
  fetchCreateTask,
  fetchDeleteImage,
  fetchTaskById,
  fetchUpdateTask,
} from '../../../redux/slices/taskSlice'
import $api from '../../../redux/http'
import { BACK_URL } from '../../../redux/http'
import {
  Paper,
  Divider,
  Avatar,
  Grid,
  FormControl,
  OutlinedInput,
  Button,
  TextField,
} from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { fetchComment } from '../../../redux/slices/commentSlice'
import { v4 } from 'uuid'
const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

function MyFormHelperText() {
  return null
}

const Task = () => {
  const { task, isError } = useSelector((state) => state.taskReducer)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState('')
  const [fileId, setFileId] = useState('')
  const [imageId, setImageId] = useState('')
  const [imageIds, setImageIds] = useState('')
  const [dateEnd, setDateEnd] = useState(new Date())
  const [comment, setComment] = useState('')
  const [userIds, setUserIds] = useState('')
  const [user, setUser] = useState('')
  const [commentValue, setCommentValue] = useState('')
  const { users, userInfo } = useSelector((state) => state.userReducer)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { id } = useParams()
  let userId = typeof userIds == 'string' ? userIds.split(',') : userIds

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id))
      dispatch(fetchUsers())
    }
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    if (id) {
      setTitle(task.title)
      setDescription(task.description)
      setFileId('')
      setDateEnd(new Date(task.date_end))
      setImageId(task.imageId[0] ? task.imageId.map((item) => item.link).join(',') : '')
      setImageIds(task.imageId[0] ? task.imageId.map((item) => item.id).join(',') : '')
      setComment(task.commentId ? task.commentId.map((item) => JSON.stringify(item)).join('~') : '')
      const userTask = typeof task.userIds != 'string' ? task.userIds.join(',') : task.userIds
      setUserIds(userTask)
      setUser(task.user)
      console.log(task.user)
      userId = userIds.split(',')
      setIsLoading(task.id ? false : true)
    } else {
      setTitle('')
      setDescription('')
      setFileId('')
      setImageId('')
      setUserIds('')
      setDateEnd(new Date())
      setComment('')
      userId = userIds.split(',')
      setIsLoading(false)
    }
  }, [task])

  return isLoading ? (
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <h1>Ваше задание</h1>
                  <p style={{ fontSize: '25px' }}>{title}</p>
                  <h4>Описание задания</h4>
                  <p style={{ fontSize: '20px' }}>{description}</p>
                  <h5>Срок окнончания задания</h5>
                  <p style={{ fontSize: '20px' }}>{new Date(dateEnd).toDateString()}</p>
                  {imageId ? <h5>Файлы задания</h5> : ''}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}
                  >
                    {imageId
                      ? imageId.split(',').map((item, index) => (
                          <div
                            key={index}
                            className="image"
                            style={{
                              flex: '0 1 24%',
                              position: 'relative',
                            }}
                          >
                            <img
                              src={`${BACK_URL}${item}`}
                              style={{
                                marginBottom: '15px',
                                objectFit: 'cover',
                                width: '200px',
                                height: '150px',
                              }}
                            />
                          </div>
                        ))
                      : ''}
                  </div>
                  <h5>Участники</h5>
                  {(user ? user : [...new Array(1)]).map((item, index) => {
                    return <h6 key={index}>{item.email}</h6>
                  })}
                </div>
              </CCardBody>
              <div style={{ padding: 14 }} className="App">
                <h1>Comments</h1>
                <div style={{ position: 'relative', marginBottom: '50px' }}>
                  <FormControl sx={{ width: '100%' }}>
                    <label className="input">
                      <TextField
                        value={commentValue}
                        fullWidth
                        label="Ваш комментарий"
                        id="fullWidth"
                        onChange={(event) => {
                          setCommentValue(event.target.value)
                        }}
                      />
                    </label>
                    <MyFormHelperText />
                  </FormControl>
                  <Button
                    style={{ position: 'absolute', right: '0', top: '60px' }}
                    variant="outlined"
                    onClick={() => {
                      let test = comment.split('~').map((i) => JSON.parse(i))
                      test.push({
                        id: v4(),
                        comment: commentValue,
                        user: { avatar: userInfo.avatar, email: userInfo.email },
                      })
                      setComment(test.map((item) => JSON.stringify(item)).join('~'))
                      setCommentValue('')
                      dispatch(
                        fetchComment({
                          id,
                          comment: commentValue,
                        }),
                      )
                    }}
                  >
                    Отправить
                  </Button>
                </div>
                {comment
                  ? comment
                      .split('~')
                      .map((i) => JSON.parse(i))
                      .map((item, index) => (
                        <Paper key={index}>
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                              {item.avatar ? (
                                <Avatar alt="Remy Sharp" src={`${BACK_URL}${item.user.avatar}`} />
                              ) : (
                                <Avatar sx={{ bgcolor: deepPurple[500], margin: '0 auto' }}>
                                  {item.user.email[0]}
                                </Avatar>
                              )}
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                              <h4 style={{ margin: 0, textAlign: 'left' }}>{item.user.email}</h4>
                              <p style={{ textAlign: 'left' }}>{item.comment}</p>
                            </Grid>
                          </Grid>
                          <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                        </Paper>
                      ))
                  : ''}
              </div>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Task
