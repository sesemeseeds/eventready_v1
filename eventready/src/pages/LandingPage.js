import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';
import QRCode from 'qrcode.react';

export const LandingPage = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <Toolbar>
          <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
            Landing Page
          </Typography>
        </Toolbar>
      </AppBar>
    )
}