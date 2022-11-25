import wasm from './wasm'
import { toParams } from './utils'
import { API_ROOT } from './constants'
import { useEntropyStore } from './store/contribute'
import { OAuthProvider, OAuthRes } from './store/auth'
import type { ErrorRes, ContributeRes, TryContributeRes } from './types'

class APIClient {
  async getRequestLink() {
    const path = window.location.href.replace(/#?\/signin/, '');
    const res = await fetch(
      `${API_ROOT}/auth/request_link?redirect_to=${encodeURIComponent(path)}`,
      {
        mode: 'cors'
      }
    )
    return await res.json()
  }

  async getAuthorized(
    provider: OAuthProvider,
    code: string,
    state: string
  ): Promise<ErrorRes | OAuthRes> {
    const res = await fetch(
      `${API_ROOT}/auth/callback/${provider}?code=${code}&state=${state}`
    )
    let result: ErrorRes | OAuthRes = { error: '', code: '' }
    try {
      result = await res.json()
    } catch (error) {
      result = toParams(res.url.split('?')[1]) as ErrorRes | OAuthRes
    }
    return result
  }

  async getStatus() {}

  async getCurrentState() {}

  async tryContribute(
    session_id: string
  ): Promise<ErrorRes | TryContributeRes> {
    const res = await fetch(`${API_ROOT}/lobby/try_contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_id}`
      },
      body: JSON.stringify({
        session_id
      })
    })
    return await res.json()
  }

  async contribute(
    session_id: string,
    preContribution: string,
    entropy: string,
    identity: string,
    signature: string | null
  ): Promise<ErrorRes | ContributeRes> {
    const contribution  = await wasm.contribute(preContribution, entropy, identity)
    useEntropyStore.persist.clearStorage()
    let contributionObj = null
    if (signature) {
      contributionObj = JSON.parse(contribution!)
      contributionObj.ecdsa_signature = signature // TODO: change this when PR is merged https://github.com/ethereum/kzg-ceremony-sequencer/pull/127
      contributionObj = JSON.stringify(contributionObj)
    }

    const res = await fetch(`${API_ROOT}/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_id}`
      },
      body: contributionObj || contribution
    })
    return {
      ...(await res.json()),
      contribution
    } as ContributeRes
  }
}

export default new APIClient()
