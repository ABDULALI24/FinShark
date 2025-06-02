import React, { JSX } from 'react'
import "./Card.css"

interface Props {
    ShowName : string;
    LeadActor : string;
    Description : string;
}


const Card : React.FC<Props> = ({ShowName,LeadActor,Description}: Props) : JSX.Element => {
  return (
    <div className='card'>
        <img
        src='https://tse2.mm.bing.net/th?id=OIP.BkqAKGW_ryHGtuGoYZYP_AHaEo&pid=Api&P=0&h=180'
        alt='Image'/>
        <div className='details'>
            <h2>{ShowName}</h2>
            <p>{LeadActor}</p>

            <p className='info'>
                {Description}
            </p>

        </div>



    </div>


  )
}

export default Card