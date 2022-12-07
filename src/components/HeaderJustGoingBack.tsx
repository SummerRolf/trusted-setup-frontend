import ROUTES from '../routes'
import styled from 'styled-components'
import { textSerif } from '../style/utils'
import { useNavigate } from 'react-router-dom'
import LeftArrow from '../assets/left-arrow.svg'
import LanguageSelector from './LanguageSelector'
import { FONT_SIZE, ENVIRONMENT } from '../constants'
import { Trans, useTranslation } from 'react-i18next'

const HeaderJustGoingBack = () => {
  useTranslation()
  const navigate = useNavigate()

  return (
    <Container>
      <LeftSection onClick={() => navigate(ROUTES.ROOT)}>
        <img src={LeftArrow} alt="go back" />
      </LeftSection>
      { ENVIRONMENT === 'testnet' ?
        <CenterSection>
          <Trans i18nKey="header.ceremony">TEST CEREMONY</Trans>
        </CenterSection>
        :
        <></>
      }
      <LanguageSelector></LanguageSelector>
    </Container>
  )
}

const Container = styled.header`
  z-index: 3;
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: ${({ theme }) => theme.surface2};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`

const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const CenterSection = styled.div`
  display: flex;
  color: #3e70bc;
  align-items: start;
  font-size: ${FONT_SIZE.XXL};
  ${textSerif}
  font-weight: 800;
  letter-spacing: 2px;
`

export default HeaderJustGoingBack
