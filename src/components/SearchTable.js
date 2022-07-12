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


export default function SearchTable({ showTable }) {

  const queryResults = useSelector(state => state.stateSlice.query);

  console.log("from search table: query:", queryResults);

  return (
    <>
      {showTable ?
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell >Contact</TableCell>
                <TableCell align='center'>Positions for hire</TableCell>
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
