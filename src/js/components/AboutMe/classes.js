
export default theme => ({
    container: {
        outline: 0,
    },

    body: {
        position: 'fixed',
        top: 60,
        left: 32,
        width: 275,
        height: 320,
        fontFamily: 'HelveticaNeue-UltraLight',
        background: '#fff',
        boxShadow: '0 30px 80px 0 rgba(45, 45, 45, 1)',
        zIndex: 999,
        borderRadius: 10,

        '& a': {
            color: '#000',
        }
    },

    overlay: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, .3)',
        zIndex: 999,
    },

    close: {
        position: 'absolute',
        height: 32,
        top: 16,
        left: 32,
        cursor: 'pointer',
    },

    navs: {
        '& a': {
            position: 'relative',
            fontSize: 20,
            textIndent: 4,
            letterSpacing: 4,
            cursor: 'pointer',
        },

        '& a:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 1,
            width: 100,
            background: '#000',
            transform: 'translateX(-160px) translateY(-11px)',
            opacity: 0,
            transition: '.2s ease-out',
        },

        '& a:hover:after': {
            width: 160,
            opacity: 1,
            transform: 'translateX(-100px) translateY(-11px)',
        }
    },

    profile: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 32,

        '& img': {
            height: 64,
            width: 64,
            borderRadius: 64,
            marginRight: 20,
        },

        '& $username a': {
            display: 'inline-block',
            marginBottom: 4,
            fontSize: 24,
            letterSpacing: 1,
            textIndent: 0,
            maxWidth: 200,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },

        '& $logout': {
            fontSize: 14,
            letterSpacing: 2,
        }
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
});
