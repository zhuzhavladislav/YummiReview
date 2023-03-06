import s from './Main.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  let points = ((data.scoreFood + data.scoreService + data.scoreAtmosphere + data.scoreInterier) / 4).toFixed(1)
  points > 5 ? points = 5 : points < 0 ? points = 0 : points
  console.log(data);
  return (
    <section>
      <Link to={`/establishments/${data.id}`}>
        <img alt={"Помещение ресторана " + data.name} src={`/api/establishment/${data.image}`} />
        <h3 className={s.categoryItemsTitle}>{data.name}</h3>
        <div className={s.stars} data-total-value={Math.round(points)}>
          <div className={s.star} data-item-value="5"></div>
          <div className={s.star} data-item-value="4"></div>
          <div className={s.star} data-item-value="3"></div>
          <div className={s.star} data-item-value="2"></div>
          <div className={s.star} data-item-value="1"></div>
        </div>
        <p className={s.kitchen}>{data.kitchen}</p>
        <p className={s.city}>{data.city}</p>
      </Link>
    </section>
  )
}

export default Card