import { isMobile } from '../utils'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { useRef, useEffect } from 'react'
import { textSerif } from '../style/utils'
import { CIRCLE_SIZE } from '../constants'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import FaqPage from '../components/landing/Faq'
import Header from '../components/headers/Header'
import { TextSection } from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'
import LandingBg from '../assets/landing-boarder.png'
import { Description, PageTitle } from '../components/Text'
import Explanation from '../components/landing/Explanation'
import { BgColoredContainer } from '../components/Background'
import LatestRecords from '../components/landing/LatestRecords'
import OtherResources from '../components/landing/OtherResources'

const LandingPage = () => {
  useTranslation()
  const ref = useRef<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { signout } = useAuthStore()

  useEffect(() => {
    (async () => {
      signout()
      await navigator.serviceWorker.ready
      // eslint-disable-next-line no-restricted-globals
      if (!self.crossOriginIsolated) {
        console.log('refreshing...')
        navigate(0)
      } else {
        console.log(`${window.crossOriginIsolated ? "" : "not"} x-origin isolated`)
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLearnMoreClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <BgColoredContainer>
      <Header />
      <TopSection>
        <BgColor />
        <PageTitle style={{ marginTop: '30px' }}>
          <Trans i18nKey="landing.title">
            SUMMONING GUIDES
          </Trans>
        </PageTitle>
        <TextSection style={{ width: '55ch' }}>
          <Trans i18nKey="landing.description">
            <Description>
              Whispers from the shadows tell of a powerful spirit Dankshard, who
              will open the next chapter of Ethereum scalability. To summon its
              powers, a Ceremony needs your contribution.
            </Description>
            <Description>
              Magic math awaits - are you ready to add your color to the story?
              Choose one of the four paths below to begin the ritual:
            </Description>
          </Trans>
        </TextSection>
        <OtherResources/>
        <Link onClick={onLearnMoreClick}>
          <Footnote>
            {isMobile() ? <Trans i18nKey="landing.learn-more-mobile">↓ learn more below ↓</Trans> : <Trans i18nKey="landing.learn-more">↓ or learn more below ↓</Trans>}
          </Footnote>
        </Link>
      </TopSection>
      <Explanation refFromLanding={ref} />
      <LatestRecords />
      <FaqPage />
      <Footer />
    </BgColoredContainer>
  )
}

const Section = styled.section`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopSection = styled(Section)`
  border: min(10vw, 6rem) solid;
  border-image-source: url(${LandingBg});
  border-image-slice: 230;
  border-image-repeat: round;
  margin: 6rem auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 100ch;
`

const BgColor = styled.div`
  background-color: ${({ theme }) => theme.surface};
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  max-width: 100%;
  border-radius: 50%;
  box-shadow: 0 0 200px 120px ${({ theme }) => theme.surface};
  position: absolute;
  z-index: -1;
  margin-top: -30px;
`

const Footnote = styled.p`
  font-style: italic;
  ${textSerif}
`

const Link = styled.a`
  cursor: pointer;
`

export default LandingPage
