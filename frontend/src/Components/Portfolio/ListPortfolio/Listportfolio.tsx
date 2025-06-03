import React, { SyntheticEvent } from 'react'
import Cardportfolio from '../CardPortfolio/Cardportfolio';
 
interface Props  {
    portfolioValues : string[];
    onPortfolioDelete : (e : SyntheticEvent) => void;

}

const Listportfolio = ({portfolioValues,onPortfolioDelete}: Props) => {
  return <>
  <h2>My Portfolio</h2>
  <ul>
    {portfolioValues &&
    portfolioValues.map((portfolioValue) => {
        return <Cardportfolio 
        portfolioValue={portfolioValue} 
        onPortfolioDelete = {onPortfolioDelete}/>
    })}
  </ul>
  </>
}

export default Listportfolio