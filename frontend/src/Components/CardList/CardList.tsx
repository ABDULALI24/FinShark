import React, { JSX } from 'react'
import Card from '../Card/Card'

interface Props {} 

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
        <Card ShowName='Peaky Blinders' LeadActor='Cillian Murphy' Description=' A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.'/>
        
        <Card ShowName='Suits' LeadActor='Gabriel Macht' Description=' On the run from a drug deal gone bad, brilliant college dropout Mike Ross finds himself working with Harvey Specter, one of New York City best lawyers'/>

        <Card ShowName='Game of Thrones' LeadActor='Kit Harington' Description='Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'/>
    </div>
  )
}

export default CardList