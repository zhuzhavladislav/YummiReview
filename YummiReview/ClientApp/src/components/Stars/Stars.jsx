import React from 'react'
import s from './Stars.module.css'

const Stars = ({ points }) => {
  return (
      <div className={s.stars} data-total-value={Math.round(points)}>
          <div className={s.star} data-item-value="5"></div>
          <div className={s.star} data-item-value="4"></div>
          <div className={s.star} data-item-value="3"></div>
          <div className={s.star} data-item-value="2"></div>
          <div className={s.star} data-item-value="1"></div>
      </div>
  )
}

export default Stars