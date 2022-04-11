import React from 'react'
import { Card } from 'antd'

const MenuCard = ({title, imageName, onCardClick, type}) => {
  return (
    <Card className="gx-card gx-text-center" onClick={(e) => onCardClick(type)}>
      <div style={{padding: 24}}>
        <img className="gx-mb-5" src={require(`assets/images/${imageName}`)} width={100} height={100} alt="menu_card"/>
        <div className="gx-fs-xl">{title}</div>
      </div>
    </Card>
  )
}

export default MenuCard