import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Icon, Typography } from '@mui/material';
import { useScrollTrigger } from '@mui/material';
import theme from '../system/AppTheme';
import ButtonRounded from './CustomButtonMain';
import datapiper from '../public/datapiper_icon.png'
import AddJobModal from './AddJobModal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FirebaseContext } from '../database/firebase';

const links = ["About", "Services", "Testimonials"]

const Clients = [
    "PWC",
    "GOOGLE",
    "HBO",
    "ATOS",
    "NEXT",
    "CDA",
    "HCL",
]

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

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        style: {
            backgroundColor: trigger ? "#0474e4" : "transparent",
            color: trigger ? "#fff" : "",
        }
    });
}


export default function MyAppBar(props) {

    const { api } = useContext(FirebaseContext);

    const [company, setCompany] = useState("");

    const { categories, ...others } = props;

    const [open, setOpen] = React.useState(false);

    const handleCompanySelect = (e) => {
        const { target: { value } } = e;
        setCompany(value);
        queryCompanies(value);
    }

    const queryCompanies = (name) => {
        name === "all" ? api.getAllData() : api.queryByCompany(name);

    }
    return (
        <>
            <ElevationScroll {...props}>
                <AppBar position="sticky" sx={{ backgroundColor: 'transparent', opacity: '0.9', color: theme.palette.primary.main }}>
                    <Toolbar component="nav"
                        variant="dense" sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon fontSize='36' sx={{ width: 56, height: 56, mr: 5 }}>
                                <img src={datapiper} width="100%" alt="datapiper logo" />
                            </Icon>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}>
                            {links.map((link) => <Link key={link}>{link}</Link>)}
                        </Box>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', marginRight: 5, justifySelf:'center', mx:'auto', alignSelf:'center' }}
                        >
                            <Typography sx={{ fontSize: '1.5em', fontWeight: 'bolder', color: 'inherit' }}>
                                data piper
                            </Typography>
                        </Box>
                        <ButtonRounded title="Post a job" onClick={() => { setOpen(true) }} />
                    </Toolbar>
                    <Box sx={{ backgroundColor: "#fff", borderRadius: 2, width: "100%", maxWidth: "lg", marginX: 'auto', my: 3 }}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="company-select">Search by company name</InputLabel>
                            <Select
                                name='company-select'
                                placeholder="Search by company"
                                value={company}
                                label="Search by company name"
                                onChange={handleCompanySelect}
                                MenuProps={MenuProps}
                                input={<OutlinedInput label="Search by company" />}
                                startAdornment={<InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>}>
                                <MenuItem value={"all"} key={"all-companies"}>All</MenuItem>
                                {Clients.map((name, index) => <MenuItem key={`${name}-${index}`} value={name}>{name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </AppBar>
            </ElevationScroll>
            <AddJobModal open={open} setOpen={setOpen} />
        </>
    );
}
