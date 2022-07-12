import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import headerImage from '../public/design_image.jpeg';
import { Button } from '@mui/material';
import urgentImg from '../public/pomeranian.jpeg';
import soonImg from '../public/computer_typing.jpeg';
import laterImg from '../public/agency_01.jpeg';

const priority = [
    "!",
    "A",
    "G"
]

const colors = [
    'red',
    '#F4A01B',
    '#60BBE9'
]

const imageArray =[
    urgentImg,
    soonImg,
    laterImg,
]

export default function WebCard({ role, name }) {

    const company = !name?role.company:name;

    //TODO: concatenate all skills
    let skillStr = "";
    Object.keys(role.skills).forEach(skill => skillStr += ` ${skill}`)

    return (
        <Card sx={{ width: 345, m:2 }} elevation={2}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: colors[role.urgency-1] }} aria-label="role-title">
                        {priority[role.urgency-1]}
                    </Avatar>
                }
                title={role.role}
                subheader={`Company: ${company}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageArray[role.urgency-1]}
                alt="working"
            />
            <CardContent>
                <Typography variant='body1' color="text.primary">Required Skills</Typography>
                <Typography variant="body2" color="text.secondary">
                    {skillStr}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button>
                    {`Recruiter: ${role.POC}`}
                </Button>
            </CardActions>
        </Card>
    );
}
