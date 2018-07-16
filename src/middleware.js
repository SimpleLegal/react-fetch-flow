const SET_LOADING_FLAGS = 'SET_LOADING_FLAGS'

let instance = null
const sucStr = '_SUCCESS'
const reqStr = '_REQUESTED'

const isRequest = action => {
  return action.type.includes(reqStr)
}

const isSuccess = action => {
  return action.type.includes(sucStr)
}

const isError = action => {
  return action.type.includes(sucStr)
}

const checkAllLoaded = () => {
  let allLoaded = true

  for (let i in window.loadingRefs) {
    if (!window.loadingRefs[i]) {
      allLoaded = false
      break
    }
  }

  if (allLoaded && Object.keys(window.loadingRefs).length) {
    window.loadingRefs.allLoaded = true
  }
}

window.loadingRefs = {}

class RefCache {
  constructor() {
    if (!instance) {
      instance = this
    }

    this._hist = {}

    return instance
  }

  getRefs(action, str) {
    const actionType = action.type || ''
    const fetchActionBase = actionType.substr(0, actionType.indexOf(str))
    return this._hist[fetchActionBase]
  }

  getAllRefs() {
    return this._hist
  }

  setRefs(action, refs, str) {
    const actionType = action.type || ''
    const fetchActionBase = actionType.substr(0, actionType.indexOf(str))
    this._hist[fetchActionBase] = refs
  }
}

const fetchFlowMiddleware = ({ dispatch }) => next => action => {
  next(action)
  let cachedRefs
  let payload = {}
  let result
  let refCache

  // -- base cases for not running fetchFlow middleware: --
  // 1. loadingStateDisabled flag is set on fetch action
  // 2. action is not a _REQUESTED or a _SUCCESS action
  // 3. action is a _SUCCESS action but no refs were found in history singleton

  if (action.loadingStateDisabled || !action.type) {
    return
  }

  refCache = new RefCache(action)
  cachedRefs = refCache.getRefs(action, sucStr)

  if (!isRequest(action) && !isSuccess(action) && !isError(action)) {
    return
  }

  if (!cachedRefs && isSuccess(action)) {
    return
  }

  if (isRequest(action) && !!action.refs) {
    refCache.setRefs(action, action.refs, reqStr)
    payload[action.refs.isLoading] = true
    payload[action.refs.dataLoaded] = action.dataLoaded

    window.loadingRefs[action.refs.dataLoaded] = false
    result = dispatch({ type: SET_LOADING_FLAGS, payload })
  }

  if (isSuccess(action)) {
    payload[cachedRefs.isLoading] = false
    payload[cachedRefs.dataLoaded] = true
    result = dispatch({ type: SET_LOADING_FLAGS, payload })
    window.loadingRefs[cachedRefs.dataLoaded] = true

    // make window object aware that all loadingRefs have finished
    checkAllLoaded()

    // clear cache after success
    refCache.setRefs(action, {}, sucStr)
  }

  if (isError(action)) {
    const allRefs = refCache.getAllRefs()
    for (let ref in allRefs) {
      payload[allRefs[ref].isLoading] = false
      payload[allRefs[ref].dataLoaded] = false
    }

    // make window object aware that all loadingRefs have finished
    checkAllLoaded()
    result = dispatch({ type: SET_LOADING_FLAGS, payload })
  }

  return result
}

export default fetchFlowMiddleware
