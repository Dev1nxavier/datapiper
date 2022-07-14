import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import SearchTableRow from './TableRow';
import WebCard from './WebCard';
import { Typography } from '@mui/material';

const colors = [
  'red',
  '#F4A01B',
  '#60BBE9'
]

export default function SearchTable({ showTable }) {

  const queryResults = useSelector(state => state.stateSlice.query);

  console.log("from search table: query:", queryResults);

  return (
    <>
      <Box sx={{my: 2, display:'flex', flexDirection:'row', justifyContent:'space-evenly' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'start', mx:3 }}>
          <Box sx={{ backgroundColor: colors[2], borderRadius: 24, width: 24, height: 24 }} />
          <Typography variant='caption'>Accepting Applications</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'start',mx:3 }}>
          <Box sx={{ backgroundColor: colors[1], borderRadius: 24, width: 24, height: 24 }} />
          <Typography variant='caption'>Actively Recruiting</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'start' }}>
          <Box sx={{ backgroundColor: colors[0], borderRadius: 24, width: 24, height: 24 }} />
          <Typography variant='caption'>Immediate Hire</Typography>
        </Box>

      </Box>
      {showTable ?
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell >Contact</TableCell>
                <TableCell align='center'>Available positions</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="right">Target Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queryResults.map((row) => (
                <SearchTableRow row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer> :
        <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', mx: 'auto' }}>
          {queryResults.map(role => (
            <WebCard role={role} />
          ))}
        </Box>
      }
    </>
  );
}
