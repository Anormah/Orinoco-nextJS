import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ mt: 4 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="body2" color="inherit">
          @2024 // Orinoco.com
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
