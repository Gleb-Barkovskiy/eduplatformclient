import { Box, CircularProgress } from '@material-ui/core';
import React from 'react'

export const Loader: React.FC = () => {

    return (
        <Box>
            <CircularProgress color="primary" />
        </Box>
    );
};
