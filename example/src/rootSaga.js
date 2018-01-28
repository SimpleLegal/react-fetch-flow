import { delay } from 'redux-saga'
import { put, takeEvery, all, takeLatest } from 'redux-saga/effects'


function* fetchTodos(){
  yield delay(1000)
  const todos = [{id: 1, name: 'todo1'}, {id: 2, name: 'todo2'}, {id: 3, name: 'todo3'}]
  yield put({ type: 'TODOS_SUCCESS', payload: { todos } })
}

const todoSagas =  [
  takeLatest('TODOS_REQUESTED', fetchTodos)
]

function * fetchInvoices(){
  yield delay(1000)
  const invoices = [{id: 1, name: 'invoice1'}, {id: 2, name: 'invoice2'}, {id: 3, name: 'invoice3'}]
  yield put({ type: 'INVOICES_SUCCESS', payload: { invoices } })
}


const invoiceSagas = [
  takeLatest('INVOICES_REQUESTED', fetchInvoices)
]

export default function* rootSaga() {
  yield all([
    ...invoiceSagas,
    ...todoSagas
  ])
}