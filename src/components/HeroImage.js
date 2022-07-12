import React, { } from 'react';
import { Box, Container } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonRoundedSecondary from './CustomButtonSecondary';
import { Link } from 'react-router-dom';



const HeroImage = ({ handleSearch, searchMode }) => {

    return (
        <Box className='hero-image'>
            <Container className='hero-text'>
                <Typography variant='h2'>We Rise Above</Typography>
                <Link to={'/search'} style={{textDecoration:'none'}}> 
                    <ButtonRoundedSecondary title={!searchMode ? "Explore Jobs" : "Featured Jobs"} styles={{ mt: 3 }} onClick={handleSearch} />
                </Link>
            </Container>
        </Box>
    )
}

export default HeroImage;

