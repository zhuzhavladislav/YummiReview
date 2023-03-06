import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './Establishment.module.css'
import kitchen from '../../images/icons/kitchen.svg'
import city from '../../images/icons/city.svg'
import address from '../../images/icons/address.svg'
import time from '../../images/icons/time.svg'
import averageBill from '../../images/icons/money.svg'
import phone from '../../images/icons/phone.svg'

const Establishment = () => {
    const [item, setItem] = useState(null)
    const [points, setPoints] = useState(0)
    const params = useParams();

    useEffect(() => {
        fetch("/api/establishment")
            .then(res => res.json())
            .then(
                (result) => {
                    getItem(result)
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    const getItem = (data) => {
        setItem(data.find(item => item.id == params.id))
    }

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
                        <h1>{item.title}</h1>
                        <div className={s.mark}>
                            <p className={s.points}>{points}</p>
                            <div className={s.stars} data-total-value={Math.round(points)}>
                                <div className={s.star} data-item-value="5"></div>
                                <div className={s.star} data-item-value="4"></div>
                                <div className={s.star} data-item-value="3"></div>
                                <div className={s.star} data-item-value="2"></div>
                                <div className={s.star} data-item-value="1"></div>
                            </div>
                            <p className={s.pointsText}>Оценка критика</p>
                        </div>
                    </div>
                    <div className={s.item}>
                        <div id="slideshow-container" className={s.slideshowContainer}>
                            <div className={s.slide + " " + s.fade}>
                                <img alt="Изображение ресторана Едатека" className={s.itemImage} src={`/api/establishment/${item.image}`} />
                                <div className={s.slideText}>Главный зал</div>
                            </div>
                            <div className={s.slide + " " + s.fade}>
                                <img alt="Изображение ресторана Едатека" className={s.itemImage} src={`/api/establishment/${item.image}`} />
                                <div className={s.slideText}>Главный зал 2</div>
                            </div>
                            <a id="prev-button" className={s.slidePrev}>&#10094</a>
                            <a id="next-button" className={s.slideNext}>&#10095</a>
                            <div style={{ textAlign: "center" }}>
                                <span className={s.dot}></span>
                                <span className={s.dot}></span>
                            </div>
                        </div>
                        <div className={s.itemSecondColumn}>
                            <p><img alt="Иконка кухни" className="item-icon" src={kitchen} /> {item.kitchen}</p>
                            <p><img alt="Иконка города" className="item-icon" src={city} /> {item.city}</p>
                            <p><img alt="Иконка адреса" className="item-icon" src={address} /> {item.street}</p>
                            <p><img alt="Иконка времени" className="item-icon" src={time} /> {item.time}</p>
                            <p><img alt="Иконка кухни" className="item-icon" src={averageBill} /> Средний чек {item.averageBill}₽</p>
                            <p><img alt="Иконка телефона" className="item-icon" src={phone} /> {item.phone}</p>
                        </div>
                    </div>
                    <div className={s.description}>
                        <div className={s.descFirstColumn}>
                            <p>Еда</p>
                            <div className={s.stars} data-total-value={Math.round(item.scoreFood)}>
                                <div className={s.star} data-item-value="5"></div>
                                <div className={s.star} data-item-value="4"></div>
                                <div className={s.star} data-item-value="3"></div>
                                <div className={s.star} data-item-value="2"></div>
                                <div className={s.star} data-item-value="1"></div>
                            </div>
                            <p>Сервис</p>
                            <div className={s.stars} data-total-value={Math.round(item.scoreService)}>
                                <div className={s.star} data-item-value="5"></div>
                                <div className={s.star} data-item-value="4"></div>
                                <div className={s.star} data-item-value="3"></div>
                                <div className={s.star} data-item-value="2"></div>
                                <div className={s.star} data-item-value="1"></div>
                            </div>
                            <p>Атмосфера</p>
                            <div className={s.stars} data-total-value={Math.round(item.scoreAtmosphere)}>
                                <div className={s.star} data-item-value="5"></div>
                                <div className={s.star} data-item-value="4"></div>
                                <div className={s.star} data-item-value="3"></div>
                                <div className={s.star} data-item-value="2"></div>
                                <div className={s.star} data-item-value="1"></div>
                            </div>
                            <p>Интерьер</p>
                            <div className={s.stars} data-total-value={Math.round(item.scoreInterier)}>
                                <div className={s.star} data-item-value="5"></div>
                                <div className={s.star} data-item-value="4"></div>
                                <div className={s.star} data-item-value="3"></div>
                                <div className={s.star} data-item-value="2"></div>
                                <div className={s.star} data-item-value="1"></div>
                            </div>
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