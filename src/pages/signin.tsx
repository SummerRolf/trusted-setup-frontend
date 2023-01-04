import ROUTES from '../routes'
import { useState } from 'react'
import styled from 'styled-components'
import ErrorMessage from '../components/Error'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection,
  TextSection,
  Over
} from '../components/Layout'
import EthImg from '../assets/eth.svg'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { ErrorRes, RequestLinkRes } from '../types'
import { Trans, useTranslation } from 'react-i18next'
import HeaderJustGoingBack from '../components/headers/HeaderJustGoingBack'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

const SigninPage = () => {
  useTranslation()
  const navigate = useNavigate()
  const { error } = useAuthStore()
  const [showError, setShowError] = useState(error)
  const [isLoading, setIsLoading] = useState(false)

  const onSigninSIWE = async () => {
    setIsLoading(true)
    navigate(ROUTES.DOUBLE_SIGN)
  }

  const onSigninGithub = async () => {
    setIsLoading(true)
    const requestLinks = await api.getRequestLink()
    const code = (requestLinks as ErrorRes).code
    switch (code) {
      case undefined:
        window.location.replace((requestLinks as RequestLinkRes).github_auth_url)
        break
      case 'AuthErrorPayload::LobbyIsFull':
        navigate(ROUTES.LOBBY_FULL)
        return
      default:
        setShowError(JSON.stringify(requestLinks))
        break
    }
    setIsLoading(false)
  }

  return (
    <>
      <HeaderJustGoingBack />
      <Over>
        <Container>
          <Wrap>
            <PageTitle>
              <Trans i18nKey="signin.title">
                OPEN <br /> THE WAY
              </Trans>
            </PageTitle>
            <TextSection>
              {showError && <ErrorMessage>{showError}</ErrorMessage>}
              <Trans i18nKey="signin.description">
                <Description>
                  The Ceremony requires souls of pure intent. Summoners show
                  their integrity by unlocking with an address that has at least
                  three sent transactions.
                </Description>
                <Description>
                  It does not send any funds or permit any contracts. This
                  method also allows us to deliver a POAP after the Ceremony.
                </Description>
              </Trans>
            </TextSection>

          <ButtonSection>
            {isLoading ?
              <LoadingSpinner></LoadingSpinner>
              :
              <>
              <PrimaryButton onClick={onSigninSIWE} style={{ width: '300px' }} disabled={isLoading}>
                <Trans i18nKey="signin.unlockWithEthereum">
                  Unlock with Ethereum{' '}
                  <ButtonIcon src={EthImg} alt="ETH icon" />
                </Trans>
              </PrimaryButton>
              <ButtonWithLinkOut onClick={onSigninGithub} style={{ width: '280px' }} disabled={isLoading}>
                <Trans i18nKey="signin.unlockWithGithub">
                  or unlock with Github
                </Trans>
              </ButtonWithLinkOut>
              </>
            }
          </ButtonSection>
        </Wrap>
      </Container>
      </Over>
    </>
  )
}

const ButtonWithLinkOut = styled(SecondaryButton)`
  ::after {
    content: "↗";
    padding-left: 5px;
    font-size: 1em;
  }
`

const ButtonIcon = styled.img`
  margin-inline-start: 16px;
`

export const ButtonSection = styled(SingleButtonSection)`
  height: 120px;
  margin-top: 12px;
`

export default SigninPage
