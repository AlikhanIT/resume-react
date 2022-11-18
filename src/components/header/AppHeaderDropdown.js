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
              <CAvatar src={`${BACK_URL}${userInfo.avatar}`} size="md" />
            ) : (
              <div className="avatar bg-primary text-white">CUI</div>
            )}
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Email: {userInfo.email}
            </CDropdownHeader>
            <CDropdownItem href="#">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilCreditCard} className="me-2" />
              Payments
              <CBadge color="secondary" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilFile} className="me-2" />
              Projects
              <CBadge color="primary" className="ms-2">
                42
              </CBadge>
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
