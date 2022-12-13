import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilCreditCard,
  cilDataTransferUp,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchLogout } from '../../redux/slices/userSlice'
import { BACK_URL } from '../../redux/http'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const { isLogged, userInfo } = useSelector((state) => state.userReducer)

  return (
    <CDropdown variant="nav-item">
      {!isLogged ? (
        <>
          {' '}
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <div className="avatar bg-primary text-white">A</div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
            <CDropdownItem href="#/login">
              <CIcon icon={cilUser} className="me-2" />
              Login
            </CDropdownItem>
            <CDropdownItem href="#/register">
              <CIcon icon={cilUserPlus} className="me-2" />
              Register
            </CDropdownItem>
          </CDropdownMenu>
        </>
      ) : (
        <>
          {' '}
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            {userInfo.avatar ? (
              <img
                src={`${BACK_URL}${userInfo.avatar}`}
                style={{
                  objectFit: 'cover',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50px',
                }}
              />
            ) : (
              <div className="avatar bg-primary text-white">CUI</div>
            )}
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Email: {userInfo.email}
            </CDropdownHeader>
            <CDropdownItem href={`#/profile/${userInfo.id}`}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href={`#/questionnaire/${userInfo.id}`}>
              <CIcon icon={cilDataTransferUp} className="me-2" />
              Анкета
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#" onClick={() => dispatch(fetchLogout())}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </>
      )}
    </CDropdown>
  )
}

export default AppHeaderDropdown
