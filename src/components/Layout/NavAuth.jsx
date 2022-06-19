import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";

const NavAuth = () => {
  return (
    <Box className="flex items-center" sx={{ display: { md: 'flex', xs: "none" } }}>
      <Link to="/user/signin">
        <Button variant="outlined" size="small">Connexion</Button>
      </Link>
      <Link to="/user/signup" className="ml-4">
        <Button variant="contained" size="small">Inscription</Button>
      </Link>
     </Box>
  )
}

export default NavAuth;