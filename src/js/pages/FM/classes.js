
import colors from 'utils/colors';

export default theme => {
    return {
        container: {
            backgroundColor: 'white',
            zIndex: 99,

            '& main': {
                position: 'fixed',
                top: 60,
                left: 200,
                width: 'calc(100vw - 200px)',
                height: 'calc(100vh - 124px)',
                overflowY: 'auto',
            },
        },

        unavailable: {
            display: 'flex',
            width: '100vw',
            height: 'calc(100vh - 50px)',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'black',

            '& p': {
                fontWeight: 100,
                fontSize: 24,
                color: colors.pallet.dribbble
            },

            '& a': {
                marginTop: 20,
                padding: '8px 12px',
                border: 0,
                fontSize: 14,
                fontWeight: 'lighter',
                color: 'white',
                background: 'transparent',
                letterSpacing: .5,
                textTransform: 'uppercase',
                borderBottom: 'thin solid white',
                outline: 0,
            }
        },

        comments: {
            position: 'absolute',
            width: '100%',
            background: '#fafafa',
            zIndex: '-1',
        },
    };
};
