import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { JSX } from 'react/jsx-runtime'

type Props = {
    onSearchSubmit : (e : SyntheticEvent) => void;
    search : string | undefined;
    handleSearchChange : (e:ChangeEvent<HTMLInputElement>) => void;
}

const Search : React.FC<Props>= ({onSearchSubmit,search,handleSearchChange }: Props) : JSX.Element => {

  return (
    // <div>
    //     <input value={search} onChange={(e) => handleSearch(e)}></input>
    //     <button onClick={(e) => onClick(e)}/>
    // </div>
    
    <>
      <form onSubmit={onSearchSubmit}>
        <input value={search} onChange={handleSearchChange}/>
      </form>
    </>
  )
}

export default Search