import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import { isMobile } from '../utils'

const HomePage = () => {
  const navigate = useNavigate()

  // check device UA on initial render
  // redirect to mobile screen if
  useEffect(() => {
    const mobile = isMobile()
    if (mobile) {
      navigate(ROUTES.MOBILE)
    }
    // eslint-disable-next-line
  }, [])

  return <Outlet />
}

export default HomePage
