import s from './Main.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Stars from '../Stars/Stars'

const Card = ({ data }) => {
  let points = ((data.scoreFood + data.scoreService + data.scoreAtmosphere + data.scoreInterier) / 4).toFixed(1)
  points > 5 ? points = 5 : points < 0 ? points = 0 : points

  return (
    <section>
      <Link to={`/establishments/${data.id}`}>
        <img alt={"Помещение ресторана " + data.name} src={`/api/establishment/images/${data.image}`} />
        <h3 className={s.categoryItemsTitle}>{data.name}</h3>
        <Stars points={points} />
        <p style={{marginTop: 10}} className={s.kitchen}>{data.kitchen}</p>
        <p className={s.city}>{data.city}</p>
      </Link>
    </section>
  )
}

export default Card