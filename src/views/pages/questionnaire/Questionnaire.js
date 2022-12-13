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
import { cilHome, cilHouse, cilSchool } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import 'react-phone-input-2/lib/style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Stack, TextField } from '@mui/material'
import { fetchQuests, fetchEditQuests } from '../../../redux/slices/questionnaireSlice'

const Questionnaire = () => {
  const { id } = useParams()
  const isError = false
  const { isLogged } = useSelector((state) => state.userReducer)
  const { quests } = useSelector((state) => state.questionnaireReducer)
  const [isLoading, setIsLoading] = useState(id ? true : false)
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
  )
  const [street, setStreet] = useState('')
  const [flat, setFlat] = useState('')
  const [universityName, setUniversityName] = useState('')
  const [cityName, setCityName] = useState('')
  const [microdisctrictName, setMicrodisctrictName] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [work, setWork] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQuests(id))
  }, [])

  useEffect(() => {
    if (id) {
      setDate(quests.birthDay)
      setStreet(quests.street)
      setFlat(quests.flat)
      setWork(quests.work)
      setCityName(quests.cityId ? quests.cityId[quests.cityId.length - 1].name : '')
      setMicrodisctrictName(
        quests.cityId
          ? quests.cityId[quests.cityId.length - 1].microdistricts[
              quests.cityId[quests.cityId.length - 1].microdistricts.length - 1
            ].name
          : '',
      )
      setCollegeName(quests.collegeId ? quests.collegeId.name : '')
      setSchoolName(quests.schoolId ? quests.schoolId.name : '')
      setUniversityName(quests.universityId ? quests.universityId.name : '')
      setIsLoading((prevsState) => !prevsState)
    }
  }, [quests])

  useEffect(() => {
    if (!id) {
      if (!isLogged) {
        navigate('/')
      }
    }
  }, [isLogged])

  const onQuestionnaire = () => {
    console.log(date)
    dispatch(
      fetchEditQuests({
        id,
        street,
        flat,
        work,
        collegeName,
        universityName,
        schoolName,
        birthDay: date,
        cityName,
        microdisctrictName,
      }),
    )
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <h1>Анкета</h1>
                  <Stack component="form" noValidate spacing={3} style={{ marginBottom: '15px' }}>
                    <TextField
                      id="date"
                      label="Дата рождения"
                      onChange={(event) => {
                        setDate(event.target.value)
                      }}
                      type="date"
                      defaultValue={date}
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setCityName(event.target.value)}
                      value={cityName}
                      type="text"
                      placeholder="City"
                      autoComplete="city"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setMicrodisctrictName(event.target.value)}
                      value={microdisctrictName}
                      type="text"
                      placeholder="City"
                      autoComplete="city"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHouse} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setStreet(event.target.value)}
                      value={street}
                      type="text"
                      placeholder="Street"
                      autoComplete="street"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHouse} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setFlat(event.target.value)}
                      value={flat}
                      type="iin"
                      placeholder="Flat"
                      autoComplete="flat"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilSchool} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setUniversityName(event.target.value)}
                      value={universityName}
                      type="text"
                      placeholder="University"
                      autoComplete="university"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilSchool} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setSchoolName(event.target.value)}
                      value={schoolName}
                      type="text"
                      placeholder="School"
                      autoComplete="school"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilSchool} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setCollegeName(event.target.value)}
                      value={collegeName}
                      type="text"
                      placeholder="College"
                      autoComplete="college"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHouse} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(event) => setWork(event.target.value)}
                      value={work}
                      type="text"
                      placeholder="Work"
                      autoComplete="work"
                    />
                  </CInputGroup>
                  <div className="d-grid" onClick={() => onQuestionnaire()}>
                    {id ? (
                      <CButton color="success">Обновить анкету</CButton>
                    ) : (
                      <CButton color="success">Заполнить анкету</CButton>
                    )}
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

export default Questionnaire
