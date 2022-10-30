import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WalletConnectModal from './walletConnect/walletConnectModal';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import lightBlue from '@mui/material/colors/lightBlue';
import Grid from '@mui/material/Grid';

import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function NavBar() {

const theme = createTheme({
    palette: {
        primary:{
            main: '#5babff',
          },
        },
    });

  return (
    <ThemeProvider theme={theme}>

    <AppBar position="relative" color="primary">
        <Toolbar>
            <Grid direction='row' container spacing={2}>
                <Grid component={RouterLink} to="/gm" item xs={4}>
                    <Typography  align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        gm connect
                    </Typography>
                </Grid>
                <Grid component={RouterLink} to="/journey" item xs={4}>
                    <Typography  align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        gm tree
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <WalletConnectModal />
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
    </ThemeProvider>

  );
}

