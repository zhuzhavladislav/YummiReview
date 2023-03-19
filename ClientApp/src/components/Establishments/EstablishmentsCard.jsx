import React from 'react'
import { Link } from 'react-router-dom'
import s from './Establishments.module.css'
import city from "../../images/icons/city.svg"
import address from "../../images/icons/address.svg"
import money from "../../images/icons/money.svg"
import phone from "../../images/icons/phone.svg"
import kitchen from "../../images/icons/kitchen.svg"
import Stars from '../Stars/Stars'


const EstablishmentsCard = ({ data }) => {
    let points = ((data.scoreFood + data.scoreService + data.scoreAtmosphere + data.scoreInterier) / 4).toFixed(1)
    points > 5 ? points = 5 : points < 0 ? points = 0 : points

    return (
        <section className={s.item}>
            <img alt={"Фото ресторана " + data.name} className={s.itemImage} src={`/api/establishment/${data.image}`} />
            <div className={s.itemSecondColumn}>
                <div className={s.itemTitle}>
                    <h2 className={s.titleText}>
                        {data.name}
                    </h2>
                    <div className={s.mark}>
                        <p className={s.points}>{points}</p>
                        <Stars points={points} />
                        <p className={s.pointsText}>Оценка критика</p>
                    </div>
                </div>
                <p>
                    {data.description}
                </p>
                <div className={s.itemInfo}>
                    <p><img alt="Иконка кухни" className="item-icon" src={kitchen} /> {data.kitchen}</p>
                    <p><img alt="Иконка города" className={s.itemIcon} src={city} /> {data.city}</p>
                    <p><img alt="Иконка адреса" className={s.itemIcon} src={address} /> {data.street}</p>
                    <p><img alt="Иконка денег" className={s.itemIcon} src={money} /> Средний чек {data.averageBill}₽</p>
                    <p><img alt="Иконка телефона" className={s.itemIcon} src={phone} /> {data.phone}</p>
                </div>
                <Link className="button" style={{ marginTop: 10, marginBottom: 20 }} to={`/establishments/${data.id}`}>
                    Подробнее
                </Link>
            </div>
        </section>
    )
}

export default EstablishmentsCard