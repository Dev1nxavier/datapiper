import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles'

export default function ButtonRounded({title, styles, onClick}){

    const StyledButton = styled(Button)(({ theme }) => ({
        backgroundColor:"#0474e4",
        color:"#fff",
       
        ':hover':{
            backgroundColor: "#F5F9fc",
            color:"#000",
        },
        ':disabled': {
          color:'#fff',
          backgroundColor:"#A8A4FF"
        },
      }));
    return (
        <StyledButton variant="contained" onClick={onClick} sx={{...styles, borderRadius:24}}>
            {title}
        </StyledButton>
    )
}