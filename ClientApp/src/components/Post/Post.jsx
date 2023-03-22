import React, { useState, useEffect } from 'react'
import Stars from '../Stars/Stars'
import s from './Post.module.css'

const Post = () => {

    const [postData, setPostData] = useState({
        name: "",
        type: "",
        kitchen: "",
        averageBill: 0,
        time: "",
        phone: "",
        image: "",
        city: "",
        street: "",
        article: "",
        scoreFood: 3,
        scoreAtmosphere: 3,
        scoreInterier: 3,
        scoreService: 3
    })

    const [typeList, setTypeList] = useState()
    const [typeName, setTypeName] = useState("")

    const [cityList, setCityList] = useState()
    const [cityName, setCityName] = useState("")

    const [kitchenList, setKitchenList] = useState()
    const [kitchenName, setKitchenName] = useState("")

    const [time1, setTime1] = useState()
    const [time2, setTime2] = useState()

    const [image, setImage] = useState()

    useEffect(() => {
        fetchTypes()
    }, [typeName])

    useEffect(() => {
        fetchCities()
    }, [cityName])

    useEffect(() => {
        fetchKitchens()
    }, [kitchenName])

    const fetchTypes = () => {
        fetch(`/api/type?name=${typeName}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setTypeList(result);
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

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", image);

        fetch(`/api/establishment/addImage`, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    response.text().then((text) => {
                        alert(text)
                    })
                } else {
                    response.text()
                        .then((text) => {
                            return { ...postData, image: text }
                        })
                        .then((data) => {
                            fetch("/api/establishment", {
                                method: "POST",
                                headers: {
                                    'accept': '*/*',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data)
                            })
                                .then((response) => {
                                    if (!response.ok){
                                        alert(response)
                                    } else {
                                        alert("Успешно добавлено")
                                    }
                                    
                                });
                        })
                }
            })

    }

    return (
        <main className={s.main}>
            <p className={s.title}>Предложить заведение</p>
            <form id="validateForm" className={s.form} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Название заведения</legend>
                    <input required type="text" id="name" placeholder="Название заведения" className={s.input} value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                    <label htmlFor="name" className={s.formLabel}>Минимум 1 символ.</label>
                </fieldset>
                <fieldset>
                    <legend>Тип заведения</legend>
                    <input type="text" id="type" placeholder="Поиск типа заведения" className={s.miniSearch} value={typeName} onChange={(e) => setTypeName(e.target.value)} />
                    <div className={s.radio}>
                        {typeList ? typeList.map((item) =>
                            <div key={"type_" + item.id}>
                                <input required type="radio" id={"type_" + item.id}
                                    name="type" value={item.name} checked={postData.type === item.id} onChange={(e) => setPostData({ ...postData, type: item.id })} />
                                <label htmlFor={"type_" + item.id}>{item.name}</label>
                            </div>
                        ) : null}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Кухня</legend>
                    <input type="text" id="kitchen" placeholder="Поиск кухни" className={s.miniSearch} value={kitchenName} onChange={(e) => setKitchenName(e.target.value)} />
                    <div className={s.radio}>
                        {kitchenList ? kitchenList.map((item) =>
                            <div key={"kitchen_" + item.id}>
                                <input required type="radio" id={"kitchen_" + item.id}
                                    name="kitchen" value={item.name} checked={postData.kitchen === item.id} onChange={(e) => setPostData({ ...postData, kitchen: item.id })} />
                                <label htmlFor={"kitchen_" + item.id}>{item.name}</label>
                            </div>
                        ) : null}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Средний чек</legend>
                    <input required type="number" id="averageBill" min={200} placeholder="Средний чек" className={s.input} value={postData.averageBill} onChange={(e) => setPostData({ ...postData, averageBill: Number(e.target.value) })} />
                </fieldset>
                <fieldset style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <legend>Время работы</legend>
                    <p>С</p>
                    <input required type="time" id="time1" style={{ backgroundPositionX: "70%" }} className={s.input} onChange={(e) => { setTime1(e.target.value); setPostData({ ...postData, time: e.target.value + "-" + time2 }) }} />
                    <p>ДО</p>
                    <input required type="time" id="time2" style={{ backgroundPositionX: "70%" }} className={s.input} onChange={(e) => { setTime2(e.target.value); setPostData({ ...postData, time: time1 + "-" + e.target.value }) }} />
                </fieldset>
                <fieldset>
                    <legend>Номер телефона</legend>
                    <input required pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$" type="text" id="phone" placeholder="Номер телефона" className={s.input} value={postData.phone} onChange={(e) => setPostData({ ...postData, phone: e.target.value })} />
                    <label htmlFor="phone" className={s.formLabel}>В формате: +7 (777) 777-77-77</label>
                </fieldset>
                <fieldset>
                    <legend>Изображение заведения</legend>
                    <input required type="file" accept="image/x-png,image/jpeg" id="image" className={s.input} onChange={(e) => onImageChange(e)} />
                    <label htmlFor="image" className={s.formLabel}>Прикрепите изображение</label>
                </fieldset>
                <fieldset>
                    <legend>Город</legend>
                    <input className={s.miniSearch} type="text" placeholder="Поиск города" value={cityName} onChange={(e) => setCityName(e.target.value)} />
                    <div className={s.radio}>
                        {cityList ? cityList.map((item) =>
                            <div key={"city_" + item.id}>
                                <input required type="radio" id={"city_" + item.id}
                                    name="city" value={item.name} checked={postData.city === item.id} onChange={(e) => setPostData({ ...postData, city: item.id })} />
                                <label htmlFor={"city_" + item.id}>{item.name}</label>
                            </div>
                        ) : null}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Адрес</legend>
                    <input required type="text" id="address" placeholder="Адрес" className={s.input} value={postData.street} onChange={(e) => setPostData({ ...postData, street: e.target.value })} />
                    <label htmlFor="address" className={s.formLabel}>Название улицы, проспекта и т.п., номер дома, номер квартиры записываются в одну строку и отделяются запятыми. Минимум 5 символов.</label>
                </fieldset>
                <fieldset>
                    <legend>Рецензия</legend>
                    <textarea required minLength="20" maxLength="2000" type="text" id="article" placeholder="Рецензия" className={s.input} style={{ height: 100 }} value={postData.article} onChange={(e) => setPostData({ ...postData, article: e.target.value })}></textarea>
                    <label htmlFor="article" className={s.formLabel}>Минимум 20 символов, максимум 2000.</label>
                </fieldset>
                <fieldset style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 20 }}>
                    <legend>Оценки</legend>
                    <div>
                        <p>Еда:</p>
                        <input type="number" min="1" max="5" step="1" id="score1" className={s.input} style={{ minWidth: 0, width: 50 }} value={postData.scoreFood} onChange={(e) => setPostData({ ...postData, scoreFood: Number(e.target.value) })}></input>
                    </div>
                    <div>
                        <p>Сервис:</p>
                        <input type="number" min="1" max="5" step="1" id="score2" className={s.input} style={{ minWidth: 0, width: 50 }} value={postData.scoreService} onChange={(e) => setPostData({ ...postData, scoreService: Number(e.target.value) })}></input>
                    </div>
                    <div>
                        <p>Атмосфера:</p>
                        <input type="number" min="1" max="5" step="1" id="score3" className={s.input} style={{ minWidth: 0, width: 50 }} value={postData.scoreAtmosphere} onChange={(e) => setPostData({ ...postData, scoreAtmosphere: Number(e.target.value) })}></input>
                    </div>
                    <div>
                        <p>Интерьер:</p>
                        <input type="number" min="1" max="5" step="1" id="score4" className={s.input} style={{ minWidth: 0, width: 50 }} value={postData.scoreInterier} onChange={(e) => setPostData({ ...postData, scoreInterier: Number(e.target.value) })}></input>
                    </div>
                </fieldset>
                <button type="submit">Опубликовать</button>
            </form>
        </main>
    )
}

export default Post