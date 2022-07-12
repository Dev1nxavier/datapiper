import { Container, Typography, Box } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../database/firebase';
import ClientCards from '../components/Cards';
import HeroImage from '../components/HeroImage';

export default function Home({ children }) {

    const { api } = useContext(FirebaseContext);

    useEffect(() => {

        api.getAllData();

    }, [api])

    const clients = useSelector(state => state.stateSlice.clients);


    return (
        <>
            <HeroImage />
            <Container>
                <Typography variant='h2' color="#60bbe9" fontFamily="Muli-regular" fontWeight="bold" sx={{ my: 3 }}>Browse Recent Postings</Typography>

            </Container>
            <Box flexWrap={'wrap'} sx={{ mx: 0, mt: 2, p: 0, display: 'flex', width: '100vw', justifyContent: 'center' }}>
                {clients.map(client => <ClientCards client={client} name={client.name}/>)}
            </Box>
        </>
    )
}