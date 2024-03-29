import { Container } from '@mui/system';
import React, { useState } from 'react';
import CustomSearchBar from '../components/SearchBar';
import SearchTable from '../components/SearchTable';



export default function SearchScreen({ children }) {

    const [showTable, setShowTable] = useState(true);

    const handleToggle=()=>{
        setShowTable(state=>!state);
    }

    return (
        <Container>
            <CustomSearchBar handleToggle={handleToggle} showTable={showTable}/>
            <SearchTable showTable={showTable}/>
        </Container>
    )
}