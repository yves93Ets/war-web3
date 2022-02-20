import { Box } from '@mui/material';
import { FC } from 'react';

interface ownProps {
  index: number;
  value: number;
}

const TabItemPanel: FC<ownProps> = ({ index, value, children }) => {
  return (
    <div
      role="TabItemPanel"
      hidden={value !== index}
      id={`simple-TabItemPanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box style={{ padding: '10px 20px' }}>{children}</Box>
      )}
    </div>
  );
};

export default TabItemPanel;
