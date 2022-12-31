import { isMobile } from '../utils'
import styled from 'styled-components'
import FlowerAnimation from './FlowerAnimation'
import { TextSection } from '../components/Layout'
import { Trans, useTranslation } from 'react-i18next'
import { Description, PageTitle } from '../components/Text'

const Explanation = ({ refFromLanding }: any) => {
  useTranslation()

  return (
    <SecondSection id="explanation" ref={refFromLanding}>
      <PageTitle>
        <Trans i18nKey="explanation.title">
          PROTO-DANKSHARDING <br /> AND THE CEREMONY
        </Trans>
      </PageTitle>
      <Container>
      <FlowerAnimation></FlowerAnimation>
      <SecondTextSection>
        <Trans i18nKey="explanation.description">
          <Description>
            This Trusted Setup is a multi-party ceremony designed to generate a
            secure SRS (structured reference string) to be used in the
            proto-danksharding protocol. OK, let's slow down and talk about
            those terms in more detail.
          </Description>
          <Description>
            Proto-danksharding (aka EIP-4844) is a planned change to the
            Ethereum protocol which allows transaction data from rollups (Layer
            2s) to be succinctly represented on the Layer 1 (mainnet). The
            benefits are lower transaction fees on the L2, greater scalability
            and more accessibility to more people!
          </Description>
          <Description>
            The Trusted Setup is a preparatory step required for certain
            cryptographic schemes such as the KZG polynomial commitment scheme
            to be used in proto-danksharding. In our case, the trust assumption
            is that one contributor needs to successfully conceal their secret
            for the result to be secure.
          </Description>
          <Description>
            It's a multi-party ceremony: Contributors each create a secret and
            run a computation to mix it with previous contributions and generate
            a result that can be made public and passed to the next contributor.
            We need to guard against attempts to control the ceremony, so you'll
            need an Ethereum or GitHub account with an established history.
          </Description>
        </Trans>
      </SecondTextSection>
      <FlowerAnimation inverse={true}></FlowerAnimation>
      </Container>
    </SecondSection>
  )
}

const Container = styled.div`
  display : ${ isMobile() ? '' : 'flex'};
  justify-content: center;
  height: 100%;
  width: 100%;
`

const SecondSection = styled.section`
  padding: 0 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`

const SecondTextSection = styled(TextSection)`
  width: 55ch;
`

export default Explanation
