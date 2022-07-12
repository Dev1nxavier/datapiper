import React, { } from 'react';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';

const priority = [
    "urgent",
    "actively recruiting",
    "seeking candidates",
]

const colors =[
    'red',
    '#F4A01B',
    '#60BBE9'
]

export default function SearchTableRow({ row }) {

    const {POC, Qty, urgency, role, skills, company} = row;

    function buildString(skills){
        let skillsStr = "";
        Object.keys(skills).forEach(skill=>skillsStr+=`${skill}, `)

        return skillsStr;
    }

    return (
        <TableRow
            key={role}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" align='left'>
                {company}
            </TableCell>
            <TableCell component="th" scope="row">
                {role}
            </TableCell>
            <TableCell>{POC}</TableCell>
            <TableCell align='center'>{Qty}</TableCell>
            <TableCell align="center" sx={{backgroundColor:`${colors[urgency-1]}`}} >{priority[urgency-1]}</TableCell>
            <TableCell align='right'>{buildString(skills)}</TableCell>
        </TableRow>
    )
}