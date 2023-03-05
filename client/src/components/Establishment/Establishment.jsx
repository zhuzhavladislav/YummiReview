import React from 'react'
import s from './Establishment.module.css'
import kitchen from '../../images/icons/kitchen.svg'
import city from '../../images/icons/city.svg'
import address from '../../images/icons/address.svg'
import time from '../../images/icons/time.svg'
import money from '../../images/icons/money.svg'
import phone from '../../images/icons/phone.svg'

const Establishment = ({data}) => {
    // let points = ((data.score.food + data.score.service + data.score.atmosphere + data.score.interier) / 4).toFixed(1)
    // points > 5 ? points = 5 : points < 0 ? points = 0 : points

    return (
        <main>
            <div className={s.title}>
                <h1>«Едатека / Edateca», Самара - обзор</h1>
                <div className={s.mark}>
                    <p className={s.points}>4</p>
                    <div className={s.stars} data-total-value="4">
                        <div className={s.star} data-item-value="5"></div>
                        <div className={s.star} data-item-value="4"></div>
                        <div className={s.star} data-item-value="3"></div>
                        <div className={s.star} data-item-value="2"></div>
                        <div className={s.star} data-item-value="1"></div>
                    </div>
                    <p className={s.pointsText}>ОЦЕНКА ГОСТЕЙ</p>
                </div>
            </div>
            <div className={s.item}>
                <div id="slideshow-container" className={s.slideshowContainer}>
                    <div className={s.slide + " " + s.fade}>
                        <img alt="Изображение ресторана Едатека" className={s.itemImage} src="../../images/items/jzeus2v9o4g.jpg" />
                        <div className={s.slideText}>Главный зал</div>
                    </div>
                    <div className={s.slide + " " + s.fade}>
                        <img alt="Изображение ресторана Едатека" className={s.itemImage} src="../../images/items/30258560055378673_4580.jpg" />
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
                    <p><img alt="Иконка кухни" className="item-icon" src={kitchen} /> Мировая кухня</p>
                    <p><img alt="Иконка города" className="item-icon" src={city} /> Самара</p>
                    <p><img alt="Иконка адреса" className="item-icon" src={address} /> ул. ​Молодогвардейская, 204</p>
                    <p><img alt="Иконка времени" className="item-icon" src={time} /> 12:00-24:00</p>
                    <p><img alt="Иконка кухни" className="item-icon" src={money} /> Средний чек 1000₽</p>
                    <p><img alt="Иконка телефона" className="item-icon" src={phone} /> +7 (846) 979-27-77</p>
                </div>
            </div>
            <div className={s.description}>
                <div className={s.descFirstColumn}>
                    <p>Еда</p>
                    <div className={s.stars}>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                    </div>
                    <p>Сервис</p>
                    <div className={s.stars}>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                    </div>
                    <p>Атмосфера</p>
                    <div className={s.stars}>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                    </div>
                    <p>Интерьер</p>
                    <div className={s.stars}>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                        <div className={s.star + " " + s.orange}></div>
                    </div>
                </div>

                <article className={s.descSecondColumn}>
                    <h2>Едатека - Уютное место в сердце Самары. Вкусная еда и бюджетные цены.</h2>
                    <p>Двольно известное в Самаре местечко – ресторан <strong>Едатека</strong>, который находится в двух шагах от Самарской площади, на улице
                        Молодогвардейская. Ресторан известен вкусной, и относительно недорогой европейской кухней.</p>
                    <p><strong>Интерьер ресторана:</strong></p>
                    <p>
                        Внешне ресторан кажется довольно презентабельным местом, с приятным стилем и оформлением. Присутствует летняя
                        веранда.<br />
                        Внутри заведения также приятно находится – стиль в оформлении интерьера явно присутствует. На входе встречает стойка
                        с администратором, где необходимо приобрести браслет, чтобы стоимость блюд была клубной, то есть, сниженной.
                        Расценки стоимости браслета могут варьироваться от времени суток и дня недели.<br />
                        В зале присутствуют как небольшие столики с отдельными стульями, так и места для больших компаний с комфортабельными
                        диванами.<br />
                        Хочется отметить современный интерьер со множеством деталей, которые хочется рассматривать. Под потолком порхают
                        странички из меню, висят интересные люстры, каждый уголок чем-то занят.
                    </p>
                    <p><strong>Еда:</strong></p>
                    <p>
                        Ковидные ограничения внесли свои правила – вместо привычных меню, которые можно потрогать и полистать, на столике
                        ожидает кьюар код, который необходимо отсканировать на своем телефоне.<br />
                        Обслуживание оказалось быстрое. От времени заказа до первого блюда прошло менее 10 минут. При полной посадке в
                        выходной день, такая скорость хороший показатель<br />
                        Блюда оформлены аппетитно, ярко. Салат с гребешком оказался нереально вкусным за счет соуса из манго! А вот сами
                        гребешки не впечатлили, оказались слегка суховаты, но не критично.
                    </p>
                    <p><strong>Итоги</strong></p>
                    <p>
                        В целом обед оставил очень приятные впечатления. Есть некоторые моменты, которые хотелось бы исправить –
                        неработающий гардероб, раздельный санузел (впрочем, вряд ли это можно исправить), а также небольшие недочеты во
                        вкусовых качествах еды, но положительных моментов оказалось больше. Счет вышел менее, чем на 2 тысячи рублей без
                        стоимости браслета, это очень бюджетно для Самары для среднего плотного обеда.
                    </p>
                </article>

            </div>
            <div id="to-top"></div>
        </main>
    )
}

export default Establishment