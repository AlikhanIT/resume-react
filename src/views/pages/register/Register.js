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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister } from '../../../redux/slices/userSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [iin, setIin] = useState('')
  const { isLogged, isError } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [isLogged])

  const onRegister = () => {
    dispatch(fetchRegister({ email, password, phoneNumber, iin }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <form style={{ display: 'none' }} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input type="text" value={iin} placeholder="IIN" {...register('iin', { min: 12 })} />
        <input
          type="text"
          value={phoneNumber}
          placeholder="Phone number"
          {...register('phoneNumber')}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          {...register('password', { min: 6 })}
        />
        <input
          type="text"
          value={rPassword}
          placeholder="Repeat password"
          {...register('rPassword', { min: 6 })}
        />

        <input type="submit" />
      </form>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      onChange={(event) => setEmail(event.target.value)}
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
                  <div className="d-grid" onClick={() => onRegister()}>
                    <CButton color="success">Create Account</CButton>
                  </div>
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
