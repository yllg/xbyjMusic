
import colors from 'utils/colors';

export default theme => {
    return {
        container: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            fontFamily: 'HelveticaNeue-UltraLight',

            '& h1': {
                fontSize: 24,
                fontWeight: '100',
                color: colors.pallet.dribbble
            },

            '& button': {
                marginTop: 20,
                padding: '8px 12px',
                border: 0,
                fontSize: 14,
                fontWeight: 'lighter',
                color: '#278cf7',
                background: 'white',
                letterSpacing: .5,
                textTransform: 'uppercase',
                borderBottom: 'thin solid #278cf7',
                outline: 0,
            },

            '&:before': {
                content: 'url(assets/loading.gif)',
                position: 'absolute',
                width: '140px',
                height: '140px',
                top: '30%',
                left: '50%',
                display: 'block',
                transform: 'translateX(-25%)',
            },
        },
    };
};
