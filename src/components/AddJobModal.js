import React, { useReducer, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField, Select, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import ButtonRounded from './CustomButtonMain';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../database/firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const companies = [
    "PWC",
    "GOOGLE",
    "HBO",
    "ATOS",
    "NEXT",
    "CDA",
    "HCL",
]

const initialState = {
    company: "",
    POC: "",
    Qty: 1,
    role: "",
    skills: [],
    urgency: 1,
}

function reducer(state, action) {
    switch (action.type) {
        case "addOrUpdate":
            return { ...state, [action.field]: action.payload };
        case "addSkills":
            return { ...state, skills: action.payload };
        case "clearForm":
            return {initialState};
        default:
            throw new Error();
    }
}

export default function AddJobModal({ open, setOpen }) {

    const jobSkills = useSelector(state => state.stateSlice.skills);
    const {api} = useContext(FirebaseContext);
    const [jobForm, dispatch] = useReducer(reducer, initialState);
    const [skills, setSkills] = useState([]);

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { target: { value, name } } = e;

        switch (name) {
            case "addOrUpdate":
                return dispatch({ type: "addOrUpdate", field: name, payload: value });
            case "skills":
                setSkills(
                    // On autofill we get a stringified value.
                    typeof value === 'string' ? value.split(',') : value,
                );
                return dispatch({ type: "addSkills", payload: value })
            default:
                return dispatch({ type: "addOrUpdate", field: name, payload: value });
        }
    }

    const handleClick = (e) => {

        e.preventDefault();

        api.postJob(jobForm)

        dispatch({type:"clearForm"});
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
                    <Typography id="add-job" variant="h6" component="h2">
                        Have a job? We have the talent!
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Select from one of our partners
                    </Typography>
                    <TextField
                        id="outlined-company"
                        select
                        name='company'
                        value={jobForm.company}
                        placeholder="IBM"
                        onChange={handleChange}
                    >
                        {companies.map((name, index) => <MenuItem key={`${name}-${index}`} value={name}>{name}</MenuItem>)}
                    </TextField>


                    <Typography id="modal-contact" sx={{ mt: 2 }}>
                        Enter primary contact's email address
                    </Typography>
                    <TextField
                        id="outlined-name"
                        name='POC'
                        value={jobForm.POC}
                        placeholder="Jane_123@datapiper.com"
                        onChange={handleChange}
                    />

                    <Typography id="modal-title" sx={{ mt: 2 }}>
                        Enter job title
                    </Typography>
                    <TextField
                        id="outlined-name"
                        name='role'
                        value={jobForm.role}
                        placeholder="U.S. Ambassador- Senior"
                        onChange={handleChange}
                    />

                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Select required skills
                    </Typography>
                    <Select
                        id="multiple-checkbox-skills"
                        multiple
                        value={skills}
                        name="skills"
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {jobSkills.map((name, index) => (
                            <MenuItem key={`${name}-${index}`} value={name}>
                                <Checkbox checked={skills.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography id="modal-description" sx={{ mt: 2 }}>
                       When are you ready to hire?
                    </Typography>
                    <TextField
                        id="outlined-urgency"
                        select
                        name='urgency'
                        value={jobForm.urgency}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Immediately!</MenuItem>
                        <MenuItem value={2}>1-2 months</MenuItem>
                        <MenuItem value={3}>2+ months</MenuItem>
                    </TextField>
                    <ButtonRounded title="Submit" onClick={handleClick} styles={{ mt: 2 }} />
                </Box>
            </Modal>
        </div>
    );
}
