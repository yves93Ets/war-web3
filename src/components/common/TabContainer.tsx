import { ReactNode } from 'react';
import { Paper } from '@mui/material';

interface ownProps {
  children: ReactNode;
}

export default function TabContainer({ children }: ownProps) {
  return (
    <Paper
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}
