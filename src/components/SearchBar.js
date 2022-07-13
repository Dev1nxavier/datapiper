import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem, OutlinedInput, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { saveQuery } from '../features/stateSlice';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList'
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CustomSearchBar({handleToggle, showTable}) {

    const state = useSelector(state => state.stateSlice);
    const clients = state.clients;
    const allSkills = state.skills;

    const dispatch = useDispatch();

    //set query to be entire flatArray
    const [skills, setSkills] = useState([]);
    // const [company, setCompany] = useState("");
    const [flatArray, setFlatArray] = useState([]);

    let query = flatArray;

    function queryArray(srchArray) {

        //query on each search term passed
        query = searchSkills(srchArray, flatArray);
        //save to store for access in another component
        dispatch(saveQuery(query))
    }

    const searchSkills = (skillsArray, query) => {
        skillsArray.forEach(term => {
            query = query.filter(roleObj => Object.keys(roleObj.skills).includes(term))
        });
        return query;
    }


    useEffect(() => {
        let tempArray = []; //start with empty on remount
        clients.forEach(posts => {
            tempArray.push(...posts.roles.map(job => {
                return ({ ...job, company: posts.name })
            }))
        });
        setFlatArray(tempArray);
        dispatch(saveQuery(tempArray))

    }, [allSkills, clients, dispatch])

    const handleChange = (e) => {
        const { target: { value } } = e;
        setSkills(value);

        //filter array for each search term
        queryArray(value);
    }

    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <Box sx={{justifySelf:'flex-start'}}>
                {!showTable ? <Button size='medium' sx={{}} variant='outlined' onClick={handleToggle} startIcon={<ViewListIcon />}>View list</Button> :
                    <Button variant='outlined' onClick={handleToggle} startIcon={<ViewModuleIcon />}>View cards</Button>}
            </Box>
            
            <FormControl size='small' sx={{justifySelf:'center'}}>
                <InputLabel>Select all Skills</InputLabel>
                <Select
                    sx={{ width: 200, mx: 1 }}
                    id="multiple-checkbox-skills"
                    multiple
                    value={skills}
                    name="skills"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="Select all Skills" />}
                    renderValue={(selected) => (!selected.length === 0 ? <em>Select Skills</em> : selected.join(', '))}
                >
                    <MenuItem disabled value=""><em>Select Skills</em></MenuItem>
                    {allSkills.map((name, index) => (
                        <MenuItem key={`${name}-${index}`} value={name}>
                            <Checkbox checked={skills.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
        </>
    )
}