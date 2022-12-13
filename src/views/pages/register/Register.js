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
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, fetchUpdateUser, fetchUser } from '../../../redux/slices/userSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import $api, { BACK_URL } from '../../../redux/http'

const Register = () => {
  const { id } = useParams()
  const { user } = useSelector((state) => state.userReducer)
  const [isLoading, setIsLoading] = useState(id ? true : false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [avatar, setAvatar] = useState('/uploads/avatar.jpg')
  const [iin, setIin] = useState('')
  const { isLogged, isError } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      setAvatar(data.url)
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
    }
  }, [])

  useEffect(() => {
    if (id) {
      setPhoneNumber(user.phoneNumber)
      setEmail(user.email)
      setIin(user.iin)
      setAvatar(user.avatar)
      setIsLoading((prevsState) => !prevsState)
    } else {
      setPhoneNumber('')
      setEmail('')
      setIin('')
    }
  }, [user])

  useEffect(() => {
    if (!id) {
      if (isLogged) {
        navigate('/')
      }
    }
  }, [isLogged])

  const onRegister = () => {
    if (id) {
      dispatch(fetchUpdateUser({ id, email, phoneNumber, iin, avatar }))
    } else {
      dispatch(fetchRegister({ email, password, phoneNumber, iin }))
    }
    navigate('/')
  }

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
                <CForm
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {id ? (
                    <>
                      <img
                        src={
                          avatar
                            ? `${BACK_URL}${avatar}`
                            : 'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                        }
                        style={{
                          marginBottom: '15px',
                          objectFit: 'cover',
                          width: '100px',
                          height: '100px',
                          borderRadius: '50px',
                        }}
                      />
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
                        >
                          Button
                        </CButton>
                      </CInputGroup>
                    </>
                  ) : (
                    ''
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setIin(event.target.value)}
                      value={iin}
                      type="iin"
                      placeholder="IIN"
                      autoComplete="IIN"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <PhoneInput
                      inputStyle={{ width: '100%' }}
                      country={'kz'}
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event)}
                    />
                  </CInputGroup>
                  {id ? (
                    ''
                  ) : (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => setPassword(event.target.value)}
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => setRPassword(event.target.value)}
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                    </>
                  )}
                  {id ? (
                    <div className="d-grid" onClick={() => onRegister()}>
                      <CButton color="success">Update Account</CButton>
                    </div>
                  ) : (
                    <div className="d-grid" onClick={() => onRegister()}>
                      <CButton color="success">Create Account</CButton>
                    </div>
                  )}
                </CForm>
                {isError ? (
                  <CAlert style={{ marginTop: '10px' }} color="danger">
                    Неверный логин или пароль
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

export default Register
