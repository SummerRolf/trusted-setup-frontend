import { isMobile } from '../../utils'
import styled from 'styled-components'
import FlowerAnimation from '../FlowerAnimation'
import { TextSection } from '../Layout'
import { Trans, useTranslation } from 'react-i18next'
import { Description, PageTitle } from '../Text'

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
            This ceremony, also known as a "Trusted Setup", will generate a
            structured reference string (SRS) which will secure Ethereum's
            scaling roadmap, known as (proto)-danksharding.
            OK, let's slow down and talk about those terms in more detail.
          </Description>
          <Description>
            Proto-danksharding (aka EIP-4844) is a planned change to the
            Ethereum protocol which introduces ephemeral data storage.
            Because the data does not need to be stored by the network forever,
            it is cheaper to use than on-chain storage (i.e. CALLDATA).
            Rollups (a.k.a. Layer 2s) can therefore use this storage to post
            transaction data or proofs back to Layer 1 (mainnet),
            and massively reduce the cost for their users. The benefits are
            lower transaction fees on the L2, greater scalability and
            more accessibility to more people!
          </Description>
          <Description>
            Proto-danksharding requires the introduction of a new cryptographic
            scheme: KZG Commitments. For these to be used securely, a secure SRS
            is needed. An SRS is secure as long as one participant in the
            ceremony successfully conceals their secret.
          </Description>
          <Description>
            It's a multi-party ceremony: Contributors each create a secret and
            run a computation to mix it with previous contributions and generate
            a result that can be made public and passed to the next contributor.
            We need to guard against attempts to control the ceremony, so you'll
            need an Ethereum or GitHub account with an established history to participate.
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
