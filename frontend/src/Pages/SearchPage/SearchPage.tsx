import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import Listportfolio from '../../Components/Portfolio/ListPortfolio/Listportfolio';
import CardList from '../../Components/CardList/CardList';
import { PortfolioGet } from '../../Models/Potfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
        const [search , setSearch] = useState<string>("");
        const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
        const [serverError , setServerError] = useState<string>("");
        const [portfolioValues , setPortfolioValues] = useState<PortfolioGet[] | null >([]);
    
        useEffect(() => {
            getPortfolio();
        }, []);

        const getPortfolio = () => {
            portfolioGetAPI().then((res) => {
              if(res){
                setPortfolioValues(res?.data!);
              }
            } ).catch((err) => {
                toast.warning("Error getting portfolio");
            });
        };
        const onPortfolioCreate = (e : any) =>{
          e.preventDefault(); 
          portfolioAddAPI(e.target[0].value).then((res) => {
            if(res?.status === 204){
              toast.success(" Stock added to portfolio successfully");
              getPortfolio(); 
            }
          }).catch((err) => {
            toast.warning("Error adding portfolio");
          });
        };
     
        const onPortfolioDelete = (e : any) => {
          e.preventDefault();
          portfolioDeleteAPI(e.target[0].value).then((res) => {
            if(res?.status === 200){
              toast.success(" Stock removed from portfolio successfully");
              getPortfolio(); 
            }
          }).catch((err) => {
            toast.warning("Error removing portfolio");
          });
        };

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
      portfolioValues={portfolioValues!} 
      onPortfolioDelete = {onPortfolioDelete}/>
     <CardList 
      searchResults = {searchResult}
      onPortfolioCreate={onPortfolioCreate} />
     </>
  )
}

export default SearchPage