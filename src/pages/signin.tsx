import styled from 'styled-components'
import { PrimaryButtonLarge } from '../components/Button'
import { Description, PageTitle } from '../components/Text'
import {
  SingleContainer as Container,
  SingleWrap as Wrap,
  SingleButtonSection as ButtonSection
} from '../components/Layout'
import Logo from '../components/Logo'
import EthImg from '../assets/eth.svg'
import GithubImg from '../assets/github.svg'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes'
import useAuthenticate from '../hooks/useAuthenticate'
import { useAuthStore } from '../store/auth'

const SigninPage = () => {
  const { signinGithub, signinSIE } = useAuthenticate()
  const { error } = useAuthStore()

  const navigate = useNavigate()
  const onSigninSIE = async () => {
    const result = await signinSIE()
    if (result) {
      navigate(ROUTES.ENTROPY_INPUT)
    } else {
      // if lobby is full, do navigate to lobby_full
    }
  }

  const onSigninGithub = async () => {
    const result = await signinGithub()
    if (result) {
      navigate(ROUTES.ENTROPY_INPUT)
    } else {
      // if lobby is full, do navigate to lobby_full
    }
  }

  return (
    <Container>
      <Wrap>
        <Logo inverse />
        <Title>step forward.</Title>
        <Desc>
          You are few of citizens we are trust to form this power, please choose
          your preference to step forward
        </Desc>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonSection>
          <PrimaryButtonLarge inverse onClick={onSigninSIE}>
            Sign in with Ethereum <ButtonIcon src={EthImg} alt="ETH icon" />
          </PrimaryButtonLarge>
          <PrimaryButtonLarge inverse onClick={onSigninGithub}>
            Sign in with Github <ButtonIcon src={GithubImg} alt="Github icon" />
          </PrimaryButtonLarge>
        </ButtonSection>
      </Wrap>
    </Container>
  )
}

const Title = styled(PageTitle)`
  color: ${({ theme }) => theme.onPrimary};
  margin-top: 0;
`

const Desc = styled(Description)`
  color: ${({ theme }) => theme.onPrimary};
`

const ButtonIcon = styled.img`
  margin-left: 16px;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
`

export default SigninPage
