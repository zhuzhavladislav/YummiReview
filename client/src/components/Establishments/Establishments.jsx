import React from 'react'
import { restaraunts } from '../../Restaraunts'
import EstablishmentsCard from './EstablishmentsCard'

const Establishments = () => {
    return (
        <main>
            <h1>Рейтинг лучших ресторанов России</h1>
            {restaraunts.map((data) => <EstablishmentsCard key={data.name} data={data} />)}
            <div id="to-top"></div>
        </main>
    )
}

export default Establishments