
// import colors from 'utils/colors';

export default theme => ({
    container: {
        background: '#fff',

        '& main': {
            position: 'relative',
            top: 60,
            height: 'calc(100vh - 124px)',
            background: '#fafafa',
        }
    },

    background: {
        position: 'absolute',
        top: '58%',
        left: '50%',
        display: 'block',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.8
    },

    topContent: {
        position: 'relative',
        display: 'flex',
        height: 190,
        alignItems: 'center',
        transition: '.4s',
        paddingLeft: 32,
        opacity: 0.9
    },

    mask: {
        position: 'relative',
        float: 'right',
        height: 122,
        width: 122,
        margin: 16,
        color: '#fff',
        lineHeight: '100px',
        textAlign: 'center',
        fontSize: 32,
        backgroundImage: 'linear-gradient(0deg,#eee 0%,#fff 50%, #eee 100%)',
        border: '1px solid #aaa',
        borderRadius: 6,
        overflow: 'hidden',
        zIndex: 1,
        transition: '.4s',

        '& img': {
            opacity: 0,
        },
    },

    personDate: {
        fontSize: 74,
        lineHeight: '120px',
        color: '#c95b59',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    titleWrap: {
        color: '#fff',
    },

    title: {
        fontSize: 23,
        margin: '-25px 0 20px 0',
    },

    description: {
        fontSize: '12px',
    },

    body: {
        // display: 'flex',
        position: 'absolute',
        width: '90%',
        left: 50,
        border: '1px solid #ddd',
        overflow: 'hidden',
        marginBottom: 30,
        borderRadius: 4,
        opacity: 0.8
    },

    button: {
        color: '#000',
        margin: '0 15px 0 0',
        padding: '5px 12px',
        fontSize: 14,
        cursor: 'pointer',
    },

    playButton: {
        position: 'absolute',
        left: 28,
        top: 8,

        '& i': {
            fontSize: 25,
            color: '#d04064',
        },

        '& span': {
            position: 'absolute',
            width: 60,
            left: 65,
            marginTop: 5,
        }
    },

    collectButton: {
        position: 'absolute',
        right: 5,
        top: 10,
        border: '1px solid #ccc',
        borderRadius: 5,

        '& i': {
            fontSize: 15,
            marginRight: 7,
        }
    },

    list: {
        fontFamily: 'Roboto',
        color: '#a2a2a2',
        paddingTop: 55,
        background: '#fff',

        '& header': {
            borderBottom: '2px solid #b92a25',
        },

        '& ul': {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            height: 230,
            overflow: 'hidden',
            overflowY: 'auto',
        },

        '& li': {
            height: 32,
            lineHeight: '32px',
            transition: '.2s',
            position: 'relative',

            '& i': {
                position: 'absolute',
                left: -32,
                display: 'inline-block',
                height: 32,
                width: 32,
                color: '#fff',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #1cd8d2, #93edc7)',
                // boxShadow: '0 0 24px 0 #48cfad',
                cursor: 'pointer',
            },

            '&:not($active):hover': {
                transform: 'translateX(32px)',
            },

            '&$active i': {
                left: 0,
                top: -12,
                width: 32,

                position: 'relative',
                display: 'inline-block',
                height: 32,
                color: '#fff',
                textAlign: 'center',
                background: 'linear-gradient(to left, #ff512f, #dd2476)',
                boxShadow: '0 0 24px 0 #ea4c89',
                cursor: 'pointer',
            }
        },
    },

    odd: {
        background: '#f4f4f4',
    },

    index: {
        display: 'inline-block',
        width: 80,
        textAlign: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 8,
        fontSize: 12,
    },

    name: {
        display: 'inline-block',
        width: 350,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 8,
        marginRight: 8,

        '& span': {
            cursor: 'pointer',
            color: '#654b58',
        },
    },

    artist: {
        display: 'inline-block',
        width: 200,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 4,
        marginRight: 8,
        fontSize: 12,

        '& a': {
            cursor: 'pointer',
            color: '#654b58',
        },
    },

    album: {
        display: 'inline-block',
        width: 180,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 8,
        marginRight: 8,
        fontSize: 12,

        '& a': {
            cursor: 'pointer',
            color: '#654b58',
        },
    },

    nothing: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontFamily: 'HelveticaNeue-UltraLight',
        fontSize: 24,
        letterSpacing: 1,
        wordSpacing: 3,
        color: '#000',
    },

    subtitle: {
    },

    active: {
    }
});
