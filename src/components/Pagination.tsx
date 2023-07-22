import React, { FC, useState } from 'react'

interface PaginationProps {
  perPage: number,
  totalRepocitories: any,
  paginate: any,
  currentPage: number
}
const Pagination: FC<PaginationProps> = ({ perPage, totalRepocitories, paginate, currentPage }) => {
  const pageNumber = []
  for(let i = 1; i <= Math.ceil(totalRepocitories / perPage); i++){
    pageNumber.push(i)
  }

  return (
    <div className='pagination mb-20 flex aling-center justify-center'>
      <ul className="pagination__container flex">
        {pageNumber.length > 1 ? 
          pageNumber.map(number => (
            <li key={number} className={currentPage == number ? "active": ""}>
              <a href="#" className="pagination__link" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))
          : 
          <div></div>
        }
      </ul>
    </div>
  )
}

export default Pagination