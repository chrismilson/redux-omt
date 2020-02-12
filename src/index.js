import {
  wrap as comlinkWrap,
  expose as comlinkExpose,
  proxy
} from 'comlink'
// import produce from 'immer'

export async function wrap (worker) {
  const remote = comlinkWrap(worker)
  const subscribers = new Set()
  let state = await remote.getState()

  remote.subscribe(proxy(async () => {
    state = await remote.getState()
    subscribers.forEach(f => f())
  }))
  return {
    getState: () => state,
    dispatch: action => remote.dispatch(action),
    subscribe: listener => {
      subscribers.add(listener)
      return () => subscribers.delete(listener)
    }
  }
}

export function expose (store) {
  // We have the base store given to us and we want to expose a DIFFERENT object
  // that will deal in changes not updated versions.
  const proxyStore = store

  comlinkExpose(proxyStore)
}
