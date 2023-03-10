import React from 'react'
import s from './Pagination.module.css'

const Pagination = ({ pageNumber, onPageChange, maxPages }) => {
    const handlePrevClick = () => {
        if (pageNumber==1){
            onPageChange(1)
        } else {
            onPageChange(pageNumber - 1);
        }
        
    }

    const handleNextClick = () => {
        if (pageNumber == maxPages) {
            onPageChange(maxPages)
        } else {
            onPageChange(pageNumber + 1);
        }
    }

    return (
        <div style={{display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 30}}>
            <button onClick={handlePrevClick} className={s.paginationButton}>❮</button>
            {[...Array(maxPages).keys()].map(i => (
                <button key={i} className={pageNumber === i+1 ? s.paginationButton + " " + s.active : s.paginationButton}
                    onClick={() => onPageChange(i+1)}>
                    {i + 1}
                </button>
            ))}
            <button onClick={handleNextClick} className={s.paginationButton}>❯</button>
        </div>
    )
}

export default Pagination