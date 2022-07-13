import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import { Icon } from '@mui/material';
import { useScrollTrigger } from '@mui/material';
import theme from '../system/AppTheme';
import ButtonRounded from './CustomButtonMain';
import datapiper from '../public/datapiper_icon.png'
import AddJobModal from './AddJobModal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FirebaseContext } from '../database/firebase';

const links = [{to:"Home", route: "/"},{to:"About", route:"#"}, {to: "Services", route: "#"}, {to:"Testimonials", route:"#"}]

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
            backgroundColor: trigger ? "rgba(255,255,255,1)" : "transparent",
            
        }
    });
}


export default function MyAppBar(props) {

    const { api } = useContext(FirebaseContext);

    const [company, setCompany] = useState("");

    // const { categories, ...others } = props;

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
                <AppBar position="sticky" sx={{ color: theme.palette.primary.main }}>
                    <Toolbar component="nav"
                        variant="dense" sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon fontSize='50' sx={{ width: 56, height: 56, mr: 5 }}>
                                <img src={datapiper} width="100%" alt="datapiper logo" />
                            </Icon>
                        </Box>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-evenly', marginRight: 5, justifySelf:'center', mx:'auto', flexGrow:1 }}
                        >{links.map(link=><Link to={link.route} style={{textDecoration:'none', fontFamily:'Muli-regular', color:"#0474e4", fontWeight:'bold'}}>{link.to}</Link>)}
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
