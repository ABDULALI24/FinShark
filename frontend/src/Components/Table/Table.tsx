import React from 'react'
import { testIncomeStatementData } from './testdata'

const data = testIncomeStatementData
type Props = {}

type Company = (typeof data)[0];

const configs = [
    {
        lable : "Year",
        render : (company : Company) => company.acceptedDate
    },
    {
        lable : "Cost of Revenue",
        render : (company : Company) => company.costOfRevenue
    }
]
const Table = (props: Props) => {
    const renderedRows = data.map((company) => {
        return(
            <tr key={company.cik}>
                {configs.map((val:any) => {
                    return (<td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>{val.render(company)}</td> );
                })} 
            </tr>
        )
    })

    const renderHeaders = configs.map((config : any )=>{
        return(
            <th className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                key={config.lable}>
                    {config.lable}
            </th>
        )
    })
  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <table className="min-w-full divide-y divide-gray-200 m-5">
            <thead className='bg-gray-50'>{renderHeaders}</thead>
            <tbody>{renderedRows}</tbody>
        </table>
    </div>
  )
}

export default Table