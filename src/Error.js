import React from 'react'
import s from './Error.scss'

const Error = ({ text }) => (
  <section className={s.container}>
    <span className={s.text}>{text || 'Sorry, there was an error—please try again.'}</span>
  </section>
)

export default Error