import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../public/PWC_Icon.png';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const colors = [
    "#8BC24A",
    "#0474e4",
    "#FF9800",
]

export default function BasicJobCard({ role, name, }) {
    const theme = useTheme();

    //TODO: concatenate all skills
    let skillStr = "";
    let index = role.urgency-1;
    Object.keys(role.skills).forEach(skill => skillStr += ` ${skill}`)

    return (
        <Card sx={{ display: 'flex', m: 3, width: 310, backgroundColor: colors[index]}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: 151, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ backgroundColor: '#fff', borderRadius: "50%", m: 1, width: 50, height: 50 }}>
                            <CardMedia
                                component="img"
                                image={image}
                                alt="Live from space album cover"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <Typography component="div" variant="h5">
                                {name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {role.role}
                            </Typography>
                            <Typography variant='body1'>Core Skills</Typography>
                            <Typography variant='subtitle2'>
                                {skillStr}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
                <CardActions sx={{justifySelf:'flex-end'}}>
                    <Button size="small">{role.POC}</Button>
                </CardActions>
            </Box>
        </Card>
    );
}
