import { useMediaQuery } from '@mui/material';

const useIsSmallScreen = () => {

    return useMediaQuery('(max-width:370px)');
};

export default useIsSmallScreen;
