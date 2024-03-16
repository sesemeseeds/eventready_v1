import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, IconButton, Paper, Divider } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { TruncateText } from '../util/TruncateText';


const DescriptionDialog = ({ isOpen, onClose, description, title}) => {
    const MAX_NAME_LENGTH = 40;
    return (
        <>
        <Dialog open={isOpen} onClose={onClose}>
            <Paper sx={{ width: 500, height: 500 }}>
            <DialogTitle>
                <TruncateText text={title} maxLength={MAX_NAME_LENGTH}/>
                <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{ height: 380 }}>
                <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: description }} />
            </DialogContent>
            <Divider/>
            <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
            </Paper>
        </Dialog>
        </>
    );
};
export default DescriptionDialog;
