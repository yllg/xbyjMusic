
import colors from 'utils/colors';

export default theme => ({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100vw)',
        height: 60,
        lineHeight: '32px',
        zIndex: 99,
        backgroundColor: '#B92A25',

        '& i': {
            display: 'inline-block',
            height: 32,
            width: 32,
            marginRight: 4,
            fontSize: 20,
            textAlign: 'center',
            cursor: 'pointer',

            '&:hover': {
                color: `${theme.header.iconHoverColor} !important`,
                textShadow: `0 0 24px ${colors.pallet.primary}`,
            },
        },

        '& i:last-child': {
            marginRight: 0,
        },

        '& a': {
            color: '#fff',
        }
    },

    profile: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',

        '& img': {
            height: 32,
            width: 32,
            borderRadius: 32,
            marginRight: 10,
            marginTop: 13,
        },

        '& $username a': {
            fontSize: 10,
            letterSpacing: 1,
            textIndent: 0,
            maxWidth: 200,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },

        '& $logout': {
            fontSize: 10,
            marginTop: '-10px',
            fontWeight: 'bold',
        }
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginRight: 10,
    },

    username: {
        padding: 0,
        margin: 0,
    },

    logout: {
        display: 'inline-table',
        textIndent: 4,
        paddingBottom: 2,
        borderBottom: 'thin solid transparent',
        transition: '.4s',

        '&:hover': {
            borderBottomColor: '#000',
        }
    },

    signin: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 24,
        fontSize: 13,

        '& a': {
            fontWeight: 'bold',
        }
    },

    subscribed: {
        color: colors.pallet.sunflower,
    },

    follow: {
        position: 'relative',
        width: 80,
        height: 24,
        padding: 0,
        marginRight: 24,
        lineHeight: '24px',
        border: 'none',
        borderRadius: 24,
        backgroundImage: 'linear-gradient(280deg, rgb(47, 42, 41) 0%, rgb(47, 42, 41) 100%)',
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
        outline: 0,
        transform: 'translateY(-4px)',
        overflow: 'hidden',
        cursor: 'pointer',

        '&:before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            display: 'block',
            height: '100%',
            width: '100%',
            backgroundImage: 'linear-gradient(225deg, rgb(255, 103, 0) 0%, rgb(255, 45, 240) 100%)',
            opacity: 0,
            zIndex: -1,
            transition: '.4s',
        },

        '&$followed:before, &:hover:before': {
            opacity: 1,
        }
    },

    followed: {},

    search: {
        position: 'absolute',
        left: 290,
        width: 225,
        height: 20,
        borderRadius: 20,
        paddingLeft: 5,
    },

    goBack: {
        position: 'absolute',
        left: 232,
        top: 20,
        border: '1px solid rgba(105, 49, 49, 0.5)',
        width: 22,
        height: 20,
        borderRadius: 4,

        '& i': {
            width: 22,
            height: 28,
            fontSize: 14,
            position: 'absolute',
            top: -6,
            left: 0,
        }
    },

    goForward: {
        position: 'absolute',
        left: 255,
        top: 20,
        border: '1px solid rgba(105, 49, 49, 0.5)',
        width: 22,
        height: 20,
        borderRadius: 4,

        '& i': {
            width: 22,
            height: 28,
            fontSize: 14,
            position: 'absolute',
            top: -6,
            left: 2,
        }
    },

    logo: {
        position: 'absolute',
        left: 90,
        top: 15,
        fontSize: 22,
        fontFamily: 'fantasy',
        color: '#fff',
        cursor: 'pointer',
    }
});
