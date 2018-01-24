import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'


function* fetchTodos() {
  yield delay(1000)
  const todos = [{id: 1, name: 'things'}]
  yield put({ type: 'TODOS_FETCH_SUCCESS', payload: { todos } })
}


function* fetchInvoices() {
  yield delay(1000)
  const invoices = [{id: 1, name: 'things'}]
  yield put({ type: 'INVOICES_FETCH_SUCCESS', payload: { invoices } })
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fetchTodos(),
    fetchInvoices()
  ])
}