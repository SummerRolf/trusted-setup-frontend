import type { SubgroupCheckResWasm } from './types'

class Wasm {
  async contribute(
    contribution: string,
    entropy: string,
    identity: string
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'contribute',
        contributionString: contribution,
        entropy: entropy,
        identity: identity
      }
      worker.onmessage = async (event) => {
        resolve(event.data as any)
        worker.terminate()
      }
      worker.postMessage(data)
    })
  }
  async checkContributions(
    contribution: string,
    newContribution: string
  ): Promise<SubgroupCheckResWasm> {
    return new Promise<SubgroupCheckResWasm>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'subgroupCheck',
        contribution: contribution,
        newContribution: newContribution
      }
      worker.onmessage = async (event) => {
        const { checkContribution, checkNewContribution } = event.data
        resolve({
          checkContribution,
          checkNewContribution
        })
        worker.terminate()
      }
      worker.postMessage(data)
    })
  }
  async getPotPubkeys(entropy: string) {
    return new Promise<string[]>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'getPotPubkeys',
        entropy: entropy
      }
      worker.onmessage = async (event) => {
        resolve(event.data)
        worker.terminate()
      }
      worker.postMessage(data)
    })
  }
  async verify(contribution: string) {
    return new Promise<boolean>((resolve) => {
      const worker = new Worker('./wasm/wasm-worker.js', {
        type: 'module'
      })
      const data = {
        action: 'verify',
        contribution: contribution
      }
      worker.onmessage = async (event) => {
        resolve(event.data)
        worker.terminate()
      }
      worker.postMessage(data)
    })
  }
}

const wasm = new Wasm()
export default wasm
