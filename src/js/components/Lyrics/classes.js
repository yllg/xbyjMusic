
import colors from 'utils/colors';
import helper from 'utils/helper';

export default theme => {
    var animationName = helper.randomName();

    return {
        topContent: {
            position: 'relative',
            height: '100%',
            background: 'linear-gradient(to bottom, #ccc, #fafafa)',
        },

        background: {
            filter: 'blur(25px)',
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: '0',
            opacity: '0.5',
        },

        cover: {
            position: 'absolute',
            width: '45%',
            height: '100%',
            left: 0,
            overflow: 'hidden',

            '& figure': {
                borderRadius: 220,
            },
        },

        coverBorder: {
            border: '60px solid #181818',
            position: 'absolute',
            left: 50,
            top: 50,
            zIndex: 0,
            borderRadius: 220,
        },

        coverBorderFM: {
            border: '50px solid #181818',
            position: 'absolute',
            left: 40,
            top: 70,
            zIndex: 0,
            borderRadius: 210,
        },

        animated: {
            animationName,
            animationDuration: '36s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        },

        [`@keyframes ${animationName}`]: {
            '0%': {
                transform: 'rotate(0deg)',
            },

            '100%': {
                transform: 'rotate(360deg)',
            },
        },

        buttonWrap: {
            position: 'absolute',
            bottom: '15%',
            left: 60,
        },

        buttonWrapFM: {
            position: 'absolute',
            bottom: '12%',
            left: 85,
        },

        button: {
            color: '#333',
            margin: '0 15px 0 0',
            padding: '5px 12px',
            fontSize: 14,
            border: '1px solid #888',
            borderRadius: 5,
            cursor: 'pointer',
            background: '#eee',

            '& span': {
                marginLeft: 7,
            }
        },

        buttonFM: {
            color: '#333',
            margin: '0 15px 0 0',
            padding: '5px 12px',
            fontSize: 30,
            cursor: 'pointer',

            '& span': {
                marginLeft: 7,
            }
        },

        liked: {
            color: colors.pallet.grape,
            textShadow: `0 0 24px ${colors.pallet.grape}`,
        },

        lyrics: {
            position: 'relative',
            display: 'inline-block',
            marginLeft: '45%',
            width: '45%',
            height: '100%',
            textAlign: 'center',
            fontWeight: 'lighter',
            fontSize: 14,
            lineHeight: '30px',
            wordSpacing: '1px',

            '& [playing] span': {
                display: 'inline-block',
                paddingBottom: 0,
                fontSize: 22,
                color: colors.pallet.grape,
                fontWeight: 'bolder',
            },

            '& figure > img': {
                height: '100vh',
            },

            '& h3': {
                paddingBottom: 4,
                fontFamily: 'cursive',
                fontSize: 24,
                fontWeight: 'lighter',
                letterSpacing: 1,
                wordSpacing: 2,
                margin: '35px 0 0 0',
            },

            '& h5': {
                borderBottom: 'thin solid #aaa',
                margin: '0 0 40px 0',
                fontWeight: 'lighter',
            },
        },

        noScrollSection: {
            position: 'absolute',
            width: '100%',
            height: '135px',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden',
        },

        isScrollSection: {
            width: 380,
            height: 50,
            bottom: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'fixed',
            overflow: 'hidden',
        },

        subtitle: {
            display: 'inline-block',
            maxWidth: 125,
            fontSize: 11,
            margin: '0px 4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',

            '& a': {
                color: colors.pallet.grape,
            },
        },

        placeholder: {
            paddingTop: '35px',
            fontFamily: 'HelveticaNeue-UltraLight',
            letterSpacing: 1,
            wordSpacing: 3,
            textAlign: 'center',
            fontSize: 22,
            color: colors.pallet.grape,
        },
    };
};
