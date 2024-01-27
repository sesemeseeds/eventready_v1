import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';
import QRCode from 'qrcode.react';

export const LandingPage = () => {
    return (
      <AppBar position="static" style={{ backgroundColor: 'red' , height : '80px'}}>
      <Toolbar>
        <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', width: '100%', marginTop: '20px' }}>
          Landing Page
        </Typography>
      </Toolbar>
    </AppBar>
    )
}