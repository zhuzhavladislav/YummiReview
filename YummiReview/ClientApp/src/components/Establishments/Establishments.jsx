import React, { useState, useEffect } from 'react'
import EstablishmentsCard from './EstablishmentsCard'
import Pagination from '../Pagination/Pagination'
import filterLeft from '../../images/icons/filter-left.svg'
import arrowDown from '../../images/icons/arrow-down.svg'
import s from './Establishments.module.css'

const Establishments = () => {
    //Переменная для заведений
    const [data, setData] = useState()
    //Переменные для поиска в фильтрации и выбора
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [averageBill, setAverageBill] = useState([])
    const [kitchen, setKitchen] = useState("")
    //Модальное окно
    const [modal, setModal] = useState(false)
    //Переменные для загрузки фильтрации
    const [cityList, setCityList] = useState()
    const [cityName, setCityName] = useState("")
    const [kitchenList, setKitchenList] = useState()
    const [kitchenName, setKitchenName] = useState("")
    //Пагинация
    const [pageSize, setPageSize] = useState(4);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const fetchEstablishments = () => {
        fetch(`/api/establishment/?name=${name}&pageSize=${pageSize}&pageNumber=${pageNumber}&city=${city}&averageBill=${averageBill}&kitchen=${kitchen}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setMaxPages(Math.ceil(result.count / pageSize))
                    setData(result.establishments);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const fetchCities = () => {
        fetch(`/api/city?name=${cityName}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setCityList(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const fetchKitchens = () => {
        fetch(`/api/kitchen?name=${kitchenName}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setKitchenList(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    useEffect(() => {
        fetchEstablishments()
    }, [name, city, averageBill, kitchen, pageNumber, pageSize])

    useEffect(() => {
        fetchCities()
    }, [cityName])

    useEffect(() => {
        fetchKitchens()
    }, [kitchenName])

    const handleCheckboxChecked = (e) => {
        if (e.target.checked) {
            setAverageBill([...averageBill, e.target.value]);
        } else {
            setAverageBill(
                averageBill.filter((value) => value !== e.target.value)
            );
        }
    }
    

    const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    }

    return (
        <main>
            <div className={s.modal + " " + (modal ? null : s.hidden)}>
                <div className={s.filtersList} >
                    <div className={s.filtersTitle}>
                        <p style={{ position: "relative" }}>Фильтры</p>
                        <p style={{ position: "absolute", right: "1vw", cursor: "pointer" }} onClick={() => setModal(false)}>✕</p>
                    </div>
                    <fieldset>
                        <legend>Город</legend>
                        <input className={s.miniSearch} type="text" placeholder="Поиск города" value={cityName} onChange={(e) => setCityName(e.target.value)} />
                        <div className={s.radio}>
                            {cityList ? cityList.map((item) =>
                                <div key={"city_" + item.id}>
                                    <input type="radio" id={"city_" + item.id}
                                        name="city" value={item.name} checked={city === item.name} onChange={(e) => { setCity(e.target.value); setPageNumber(1) }} />
                                    <label htmlFor={"city_" + item.id}>{item.name}</label>
                                </div>
                            ) : null}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Кухня</legend>
                        <input className={s.miniSearch} type="text" placeholder="Поиск кухни" value={kitchenName} onChange={(e) => setKitchenName(e.target.value)} />
                        <div className={s.radio}>
                            {kitchenList ? kitchenList.map((item) =>
                                <div key={"kitchen_" + item.id}>
                                    <input type="radio" id={"kitchen_" + item.id}
                                        name="kitchen" value={item.name} checked={kitchen === item.name} onChange={(e) => { setKitchen(e.target.value); setPageNumber(1) }} />
                                    <label htmlFor={"kitchen_" + item.id}>{item.name}</label>
                                </div>
                            ) : null}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Средний чек</legend>
                        <div className={s.checkbox}>
                            <div>
                                <input type="checkbox" id="averageBillChoice1"
                                    name="averageBill" value="0-1000" checked={averageBill.includes("0-1000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice1">До 1000р.</label>
                            </div>
                            <div>
                                <input type="checkbox" id="averageBillChoice2"
                                    name="averageBill" value="1000-2000" checked={averageBill.includes("1000-2000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice2">1000-2000р.</label>
                            </div>
                            <div>
                                <input type="checkbox" id="averageBillChoice3"
                                    name="averageBill" value="2000-3000" checked={averageBill.includes("2000-3000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice3">2000-3000р.</label>
                            </div>
                            <div>
                                <input type="checkbox" id="averageBillChoice4"
                                    name="averageBill" value="3000-4000" checked={averageBill.includes("3000-4000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice4">3000-4000р.</label>
                            </div>
                            <div>
                                <input type="checkbox" id="averageBillChoice5"
                                    name="averageBill" value="4000-5000" checked={averageBill.includes("4000-5000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice5">4000-5000р.</label>
                            </div>
                            <div>
                                <input type="checkbox" id="averageBillChoice6"
                                    name="averageBill" value="5000-999000" checked={averageBill.includes("5000-999000")} onChange={(e) => {handleCheckboxChecked(e); setPageNumber(1)}} />
                                <label htmlFor="averageBillChoice6">Больше 5000р.</label>
                            </div>
                        </div>
                    </fieldset>
                    <button style={{ marginLeft: 15, marginRight: 15, marginBottom: 20 }} onClick={() => {
                        setName("")
                        setKitchen("")
                        setAverageBill("")
                        setCity("")
                    }}>Очистить поиск</button>
                </div>
            </div>
            <h1>Рейтинг лучших ресторанов России</h1>
            <div className={s.search}>
                <input type="text" placeholder="Поиск" value={name} onChange={(e) => { setName(e.target.value); setPageNumber(1) }} />
                <div className={s.filters} onClick={() => setModal(true)}>
                    <img alt="filter" src={filterLeft} />Фильтры<img alt="Развернуть фильтры" style={{ width: "20px" }} src={arrowDown} />
                </div>
            </div>
            {data ? Object.keys(data).length == 0 ? <p className={s.loading}>Результаты поиска отсутсвуют</p> : data.map((data) => <EstablishmentsCard key={data.name} data={data} />) : <p className={s.loading}>Загрузка...</p>}
            {data ? <Pagination pageNumber={pageNumber} maxPages={maxPages} onPageChange={handlePageChange} /> : null}
            <div id="to-top"></div>
        </main>
    )
}

export default Establishments