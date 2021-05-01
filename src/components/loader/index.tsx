import MuiLinearProgress from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';

export interface LoaderProps {
  message?: string;
}

const LinearProgress = styled(MuiLinearProgress)({
  '&.MuiLinearProgress-root': {
    width: '100%',
  },
  '&.MuiLinearProgress-colorPrimary': {
    backgroundColor: '#FF9900',
  },
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#D0021B',
  },
  '& .MuiLinearProgress-bar2Indeterminate': {
    backgroundColor: '#D0021B',
  },
});

export const Loader = () => <LinearProgress />;

export default Loader;
