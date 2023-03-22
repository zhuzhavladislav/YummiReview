import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './Establishment.module.css'
import kitchen from '../../images/icons/kitchen.svg'
import city from '../../images/icons/city.svg'
import address from '../../images/icons/address.svg'
import time from '../../images/icons/time.svg'
import averageBill from '../../images/icons/money.svg'
import phone from '../../images/icons/phone.svg'
import Stars from '../Stars/Stars'

const Establishment = () => {
    const [item, setItem] = useState(null)
    const [points, setPoints] = useState(0)
    const params = useParams();

    useEffect(() => {
        fetch(`/api/establishment/${params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItem(result[0])
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    useEffect(() => {
        if (item) {
            setPoints(((item.scoreFood + item.scoreService + item.scoreAtmosphere + item.scoreInterier) / 4).toFixed(1))
            points > 5 ? setPoints(5) : points < 0 ? setPoints(0) : points
        }
    }, [item])

    const createMarkup = (string) => {
        return { __html: string };
    };

    return (
        <main>
            {item ?
                <>
                    <div className={s.title}>
                        <h1>«{item.name}» – {item.city}, Обзор</h1>
                        <div className={s.mark}>
                            <p className={s.points}>{points}</p>
                            <Stars points={points}/>
                            <p className={s.pointsText}>Оценка критика</p>
                        </div>
                    </div>
                    <div className={s.item}>
                        <div id="slideshow-container" className={s.slideshowContainer}>
                            <div className={s.slide + " " + s.fade}>
                                <img alt="Изображение ресторана Едатека" className={s.itemImage} src={`/api/establishment/images/${item.image}`} />
                            </div>
                        </div>
                        <div className={s.itemSecondColumn}>
                            <p><img alt="Иконка кухни" className="item-icon" src={kitchen} /> {item.kitchen}</p>
                            <p><img alt="Иконка города" className="item-icon" src={city} /> {item.city}</p>
                            <p><img alt="Иконка адреса" className="item-icon" src={address} /> {item.street}</p>
                            <p><img alt="Иконка времени" className="item-icon" src={time} /> {item.time}</p>
                            <p><img alt="Иконка денег" className="item-icon" src={averageBill} /> Средний чек {item.averageBill}₽</p>
                            <p><img alt="Иконка телефона" className="item-icon" src={phone} /> {item.phone}</p>
                        </div>
                    </div>
                    <div className={s.description}>
                        <div className={s.descFirstColumn}>
                            <p>Еда</p>
                            <Stars points={item.scoreFood} />
                            <p>Сервис</p>
                            <Stars points={item.scoreService} />
                            <p>Атмосфера</p>
                            <Stars points={item.scoreAtmosphere} />
                            <p>Интерьер</p>
                            <Stars points={item.scoreInterier} />
                        </div>
                        <article className={s.descSecondColumn} dangerouslySetInnerHTML={createMarkup(item.article)}>
                        </article>
                    </div>
                    <div id="to-top"></div>
                </> : item === undefined ? <p className={s.notFound}>Заведение не найдено :(</p> : <p className={s.loading}>Загрузка...</p>}

        </main>
    )
}

export default Establishment