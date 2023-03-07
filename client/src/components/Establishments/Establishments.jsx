import React, { useState, useEffect } from 'react'
import EstablishmentsCard from './EstablishmentsCard'
import filterLeft from '../../images/icons/filter-left.svg'
import arrowDown from '../../images/icons/arrow-down.svg'
import s from './Establishments.module.css'

const Establishments = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState()

    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [averageBill, setAverageBill] = useState("")
    const [kitchen, setKitchen] = useState("")

    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetch(`/api/establishment/?name=${name}&city=${city}&averageBill=${averageBill}&kitchen=${kitchen}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(data);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                }
            )
    }, [name, city, averageBill, kitchen])

    useEffect(()=>{
        console.log(city);
    },[city])

    return (
        <main>
            <div className={s.modal + " " + (modal ? null : s.hidden)}>
                <div className={s.filtersList} >
                    <div className={s.filtersTitle}>
                        <p style={{ position: "relative" }}>Фильтры</p>
                        <p style={{ position: "absolute", right: "1vw", cursor: "pointer"}} onClick={() => setModal(false)}>✕</p>
                    </div>
                    <fieldset onChange={(e)=>setCity(e.target.value)}>
                        <legend>Город</legend>
                        <div className={s.radio}>
                            <div>
                                <input type="radio" id="cityChoice1"
                                    name="city" value="Самара" checked={city === 'Самара'}/>
                                <label for="cityChoice1">Самара</label>
                            </div>
                            <div>
                                <input type="radio" id="cityChoice2"
                                    name="city" value="Москва" checked={city === 'Москва'}/>
                                <label for="cityChoice2">Москва</label>
                            </div>
                            <div>
                                <input type="radio" id="cityChoice3"
                                    name="city" value="Казань" checked={city === 'Казань'}/>
                                <label for="cityChoice3">Казань</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset onChange={(e)=>setKitchen(e.target.value)} >
                        <legend>Кухня</legend>
                        <div className={s.radio}>
                            <div>
                                <input type="radio" id="kitchenChoice1"
                                    name="kitchen" value="Мировая кухня" checked={kitchen === 'Мировая кухня'}/>
                                <label for="kitchenChoice1">Мировая кухня</label>
                            </div>
                            <div>
                                <input type="radio" id="kitchenChoice2"
                                    name="kitchen" value="Европейская кухня" checked={kitchen === 'Европейская кухня'}/>
                                <label for="kitchenChoice2">Европейская кухня</label>
                            </div>
                            <div>
                                <input type="radio" id="kitchenChoice3"
                                    name="kitchen" value="Татарская кухня" checked={kitchen === 'Татарская кухня'}/>
                                <label for="kitchenChoice3">Татарская кухня</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset onChange={(e) => setAverageBill(e.target.value)}>
                        <legend>Средний чек</legend>
                        <div className={s.radio}>
                            <div>
                                <input type="radio" id="averageBillChoice1"
                                    name="averageBill" value="0-1000" checked={averageBill === '0-1000'}/>
                                <label for="averageBillChoice1">До 1000р.</label>
                            </div>
                            <div>
                                <input type="radio" id="averageBillChoice2"
                                    name="averageBill" value="1000-2000" checked={averageBill === '1000-2000'}/>
                                <label for="averageBillChoice2">1000-2000р.</label>
                            </div>
                            <div>
                                <input type="radio" id="averageBillChoice3"
                                    name="averageBill" value="2000-3000" checked={averageBill === '2000-3000'}/>
                                <label for="averageBillChoice3">2000-3000р.</label>
                            </div>
                            <div>
                                <input type="radio" id="averageBillChoice4"
                                    name="averageBill" value="3000-4000" checked={averageBill === '3000-4000'}/>
                                <label for="averageBillChoice4">3000-4000р.</label>
                            </div>
                            <div>
                                <input type="radio" id="averageBillChoice5"
                                    name="averageBill" value="4000-5000" checked={averageBill === '4000-5000'}/>
                                <label for="averageBillChoice5">4000-5000р.</label>
                            </div>
                            <div>
                                <input type="radio" id="averageBillChoice6"
                                    name="averageBill" value="5000-999000" checked={averageBill === '5000-999000'}/>
                                <label for="averageBillChoice6">Больше 5000р.</label>
                            </div>
                        </div>
                    </fieldset>
                    <button style={{marginLeft: 15, marginRight: 15}} onClick={()=>{
                        setName("")
                        setKitchen("")
                        setAverageBill("")
                        setCity("")
                    }}>Очистить поиск</button>
                </div>
            </div>
            <h1>Рейтинг лучших ресторанов России</h1>
            <div className={s.search}>
                <input type="text" placeholder="Поиск" value={name} onChange={(e) => setName(e.target.value)} />
                <div className={s.filters} onClick={()=>setModal(true)}>
                    <img alt="filter" src={filterLeft} />Фильтры<img alt="Развернуть фильтры" style={{ width: "20px" }} src={arrowDown} />
                </div>
            </div>
            {isLoaded ? Object.keys(data).length === 0 ? <p className={s.loading}>Результаты поиска отсутсвуют</p> : data.map((data) => <EstablishmentsCard key={data.name} data={data} />) : <p className={s.loading}>Загрузка...</p>}
            <div id="to-top"></div>
        </main>
    )
}

export default Establishments