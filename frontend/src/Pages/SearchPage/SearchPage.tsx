import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import Listportfolio from '../../Components/Portfolio/ListPortfolio/Listportfolio';
import CardList from '../../Components/CardList/CardList';

interface Props {}

const SearchPage = (props: Props) => {
     const [search , setSearch] = useState<string>("");
        const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
        const [serverError , setServerError] = useState<string>("");
        const [portfolioValues , setPortfolioValues] = useState<string[]>([]);
    
        const onPortfolioCreate = (e : any) =>{
          e.preventDefault(); 
          const exits = portfolioValues.find((value) => value === e.target[0].value);
          if(exits) return;
          const updatedPortfolio = [...portfolioValues,e.target[0].value]; 
          setPortfolioValues(updatedPortfolio);
        }
     
        const onPortfolioDelete = (e : any) => {
          e.preventDefault();
          const removed = portfolioValues.filter((value) => {
            return value !== e.target[0].value;
          });
          setPortfolioValues(removed);
        }
        const handleSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        }
        const onSearchSubmit = async (e : SyntheticEvent) => {
          e.preventDefault();
          const result = await searchCompanies(search);
          if(typeof result == "string"){
            setServerError(result);
          }else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
          }
         
        }

  return (
     <>
      <Search 
        onSearchSubmit = {onSearchSubmit}  
        search={search} 
        handleSearchChange={handleSearchChange} />
      {serverError && <h2>{serverError}</h2>}
      <Listportfolio 
      portfolioValues={portfolioValues} 
      onPortfolioDelete = {onPortfolioDelete}/>
     <CardList 
      searchResults = {searchResult}
      onPortfolioCreate={onPortfolioCreate} />
     </>
  )
}

export default SearchPage