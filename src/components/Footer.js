import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CoPresentIcon from '@mui/icons-material/CoPresent';

export default function Footer() {

    return (
        <Box sx={{ backgroundColor:'#253028', padding:5, display:"flex", flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <Box sx={{width:100, display:'flex', flexDirection:'row', justifyContent:'space-around' }}>
                <Link href='https://www.linkedin.com/in/seanmgreene/' sx={{textDecoration:'none'}}>
                <LinkedInIcon fontSize='large'/>
                </Link>
                <Link href='https://www.profile-seangreene.com/' sx={{textDecoration:'none'}}>
                <CoPresentIcon fontSize='large' />
                </Link>
            </Box>
            <Box>
                <Typography fontFamily={"Muli-regular"} fontWeight="bold" variant="h2" color="#fff">Sean M. Greene</Typography>
                <Typography variant='h4' color={'#fff'}>Web Developer</Typography>
                <Typography variant='subtitle1' color={'#fff'}>smgreenedev@gmail.com</Typography>
            </Box>
        </Box>
    )
}
