import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { JSX } from 'react/jsx-runtime'

type Props = {
    onClick : (e : SyntheticEvent) => void;
    search : string | undefined;
    handleSearch : (e:ChangeEvent<HTMLInputElement>) => void;
}

const Search : React.FC<Props>= ({onClick,search,handleSearch }: Props) : JSX.Element => {

  return (
    <div>
        <input value={search} onChange={(e) => handleSearch(e)}></input>
        <button onClick={(e) => onClick(e)}/>
    </div>
  )
}

export default Search