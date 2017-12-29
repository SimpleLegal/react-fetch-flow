import React from 'react'
import s from './SpinnerGoogle.scss'

const SpinnerGoogle = () => (
  <section className={s.container}>
    <span className={s.spinner}>
      <svg className={s.svg} viewBox={'25 25 50 50'}>
        <circle className={s.path} cx={50} cy={50} r={20} fill={'none'} strokeWidth={1} strokeMiterlimit={10} />
      </svg>
    </span>
  </section>
)

export default SpinnerGoogle