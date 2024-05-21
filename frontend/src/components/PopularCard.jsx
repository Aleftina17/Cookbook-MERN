import React from 'react'
import { Link } from 'react-router-dom'

const PopularCard = ({title, description, link, img}) => {
  return (
    <div className='popular-card'>
        <div className="popular-card_img">
          <img src={img} alt={title} />
        </div>
        <div className="popular-card_title">
          {title}
        </div>
        <div className="popular-card_desc">
          {description}
        </div>
        <Link to={link} className='popular-card_link'>Open In Cookbook</Link>
    </div>
  )
}

export default PopularCard