import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router-dom';
import Table from '../Table/Table';
import { getCashFlow } from '../../api';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/Numberformatting';

type Props = {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [cashFlowData, setCashFlowData] = useState<CompanyCashFlow[]>();
    useEffect(() => {
    const getRatios = async () => {
      const result = await getCashFlow(ticker);
      setCashFlowData(result!.data);
    };
    getRatios();
  }, []);
  return cashFlowData ? (
    <Table config={config} data={cashFlowData}></Table>
  ) : (
    <Spinner/>
  );
  return <>

  </>
}

export default CashFlowStatement