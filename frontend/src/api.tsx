import axios from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyHistoricalDividend, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company"

interface SearchResponse {
    data : CompanySearch[];
}
export const searchCompanies = async (query : string) => {
    try{
        const data = await axios.get<SearchResponse>(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`);

        return data;  
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message : " , error.message)
            return error.message;
        }else{
            console.log ("unexpected error", error)
            return "An Unexpected Error has occured"
        }
    }
};

export const getCompanyProfile = async (query : string) => {
    try{
        const data = axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data; 
    }catch(error : any){
        console.log("Error message from API :", error.message);
    }

}

export const getKeyMetrics = async (query : string) => {
    try{
        const data = axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data; 
    }catch(error : any){
        console.log("Error message from API :", error.message);
    }

}

export const getIncomeStatement = async (query : string) => {
    try{
        const data = axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data; 
    }catch(error : any){
        console.log("Error message from API :", error.message);
    }

}

export const getBalanceSheet = async (query : string) => {
    try{
        const data = axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data; 
    }catch(error : any){
        console.log("Error message from API :", error.message);
    }

}

export const getCashFlow = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getHistoricalDividend = async (query: string) => {
  try {
    const data = await axios.get<CompanyHistoricalDividend>(
      `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${query}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};