
export default theme => {
    return {
        container: {
            position: 'fixed',
            top: 60,
            left: 0,
            display: 'flex',
            width: '100vw',
            height: 'calc(100vh - 124px)',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            fontFamily: 'HelveticaNeue-UltraLight',
            fontSize: 24,
            opacity: 0,
            visibility: 'hidden',
            transition: '.2s',

            '& span': {
                marginTop: '8%',
                maxWidth: '60vw',
                textAlign: 'center',
                lineHeight: '32px',
                color: '#ea4c89',
            },

            '&:before': {
                content: 'url(assets/loading.gif)',
                position: 'absolute',
                width: '140px',
                height: '140px',
                top: '36%',
                left: '50%',
                display: 'block',
                transform: 'translateX(-25%)',
            },
        },

        show: {
            opacity: 1,
            visibility: 'visible',
            zIndex: 1000,
        },
    };
};
