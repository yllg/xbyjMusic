
// import colors from 'utils/colors';

export default theme => ({
    container: {
        background: '#fff',

        '& main': {
            position: 'relative',
            top: 60,
            height: 'calc(100vh - 124px)',
            marginLeft: 200,
            overflowY: 'auto',
        }
    },

    topContent: {
        position: 'relative',
        display: 'flex',
        height: 240,
        alignItems: 'center',
        transition: '.4s',
        paddingBottom: 30,
        paddingLeft: 30,
    },

    cover: {
        marginLeft: 20,
    },

    info: {
        marginTop: -50,
        marginLeft: 35,
    },

    text: {
        display: 'inline-block',

        '& $title span, & $author span, & $subtitle span': {
            color: '#000',
        },
    },

    title: {
        fontSize: 22,
        marginTop: 20,
    },

    titletag: {
        height: 16,
        marginTop: 3,
        padding: '2px 7px',
        color: '#fff !important',
        fontSize: 12,
        fontWeight: 'bold',
        background: '#ea453e',
        borderRadius: 5,
        position: 'absolute',
    },

    titleContent: {
        display: 'inline-block',
        width: 340,
        marginLeft: 45,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    author: {
        fontSize: 15,
        marginBottom: 40,
        height: 40,
        lineHeight: '40px',

        '& img': {
            width: 40,
            height: 40,
            position: 'absolute',
            borderRadius: 40,
        },

        '& a': {
            display: 'inline-block',
            color: '#000',
            paddingBottom: 2,
            borderBottom: 'thin solid rgba(255, 255, 255, 0)',
            transition: '.2s',

            '&:hover': {
                borderBottomColor: '#fff',
            },

            '&:after': {
                content: '"/"',
                display: 'inline-block',
                margin: '0 5px',
            },
        },

        '& a:last-child:after': {
            content: 'none',
        }
    },

    subtitle: {
        position: 'absolute',
        right: 25,
        top: 20,
        fontSize: 12,
        textTransform: 'uppercase',

        '& span': {
            display: 'inline-block',
            width: 55,
            textAlign: 'right',
            fontStyle: 'italic',
        }
    },

    subtitlecut: {
        position: 'absolute',
        fontSize: 30,
        top: -5,
        width: '8px !important',
        height: 40,
        right: 52,
        color: '#aaa !important',
    },

    play: {
        display: 'inline-block',
        bottom: 38,
        height: 18,
        width: 18,
        lineHeight: '18px',
        borderRadius: 8,
        boxShadow: '0 2px 4px 0 #9687a2',
        background: '#e0daeb',
        textAlign: 'center',
        color: '#654b58',
        fontSize: 16,
        zIndex: 9,
        cursor: 'pointer',
    },

    button: {
        color: '#000',
        margin: '0 15px 0 0',
        padding: '5px 12px',
        fontSize: 14,
        border: '1px solid #ccc',
        borderRadius: 5,
        cursor: 'pointer',

        '& i': {
            marginRight: 7,
        }
    },

    recommend: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 60,

        '& img:first-of-type': {
            filter: 'grayscale(100%)',
            transition: '.3s ease-in-out',
        },

        '& a:hover img:first-of-type': {
            filter: 'grayscale(0)',
        },
    },

    body: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
    },

    people: {
        display: 'flex',
        height: 'calc(100vh - 50px - 260px)',
        width: 240,
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingLeft: 20,

        '& img': {
            width: 32,
            height: 32,
            marginRight: 16,
            marginBottom: 4,
            borderRadius: 32,
        },

        '& h3': {
            marginTop: 0,
            marginBottom: 8,
            fontSize: 13,
            fontFamily: 'Roboto',
            fontWeight: 'lighter',
            color: '#4a4a4a',
            textTransform: 'uppercase',
            letterSpacing: 1,
            wordSpacing: 3,
        }
    },

    list: {
        flex: 1,
        fontFamily: 'Roboto',
        color: '#a2a2a2',

        '& header': {
            borderBottom: '2px solid #b92a25',
        },

        '& ul': {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            overflow: 'hidden',
            overflowY: 'auto',
        },

        '& li': {
            height: 32,
            lineHeight: '32px',
            transition: '.2s',

            '& i': {
                position: 'absolute',
                left: -32,
                display: 'inline-block',
                height: 32,
                width: 32,
                color: '#fff',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #1cd8d2, #93edc7)',
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

    listTag0: {
        display: 'inline-block',
        color: '#fff',
        fontSize: 15,
        border: '1px solid #b92a25',
        padding: '6px 10px',
        background: '#b92a25',
        marginLeft: 28,
        marginRight: 4,
    },

    listTag1: {
        display: 'inline-block',
        color: '#333',
        fontSize: 15,
        border: '1px solid #ddd',
        padding: '6px 10px',
        background: '#f4f4f4',
        marginLeft: 0,
        marginRight: 4,
    },

    listTag2: {
        display: 'inline-block',
        color: '#333',
        fontSize: 15,
        border: '1px solid #ddd',
        padding: '6px 10px',
        background: '#f4f4f4',
        marginLeft: 0,
        marginRight: 4,
    },

    listSearch: {
        display: 'inline-block',
        position: 'absolute',
        right: 35,
        width: 155,
        border: '1px solid #ddd',
        borderRadius: 14,
        fontSize: 12,
        top: 5,
        cursor: 'pointer',
    },

    titleName: {
        display: 'inline-block',
        marginLeft: 109,
        padding: '4px 8px',
        borderLeft: '1px solid #ddd',
        width: 282,
        fontSize: 12,
    },

    titleArtist: {
        display: 'inline-block',
        marginLeft: 0,
        padding: '4px 8px',
        borderLeft: '1px solid #ddd',
        width: 140,
        fontSize: 12,
    },

    titleAlbum: {
        display: 'inline-block',
        marginLeft: 0,
        padding: '4px 8px',
        borderLeft: '1px solid #ddd',
        width: 125,
        fontSize: 12,
    },

    titleTime: {
        display: 'inline-block',
        marginLeft: 0,
        padding: '4px 8px',
        borderLeft: '1px solid #ddd',
        width: 25,
        fontSize: 12,
    },

    active: {},

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
        width: 282,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 30,
        marginRight: 8,

        '& span': {
            cursor: 'pointer',
            color: '#654b58',
        },
    },

    artist: {
        display: 'inline-block',
        width: 145,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 4,
        marginRight: 8,
        fontSize: 12,

        '& a': {
            cursor: 'pointer',
            color: '#a2a2a2',
        },
    },

    album: {
        display: 'inline-block',
        width: 125,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 8,
        marginRight: 8,
        fontSize: 12,

        '& a': {
            cursor: 'pointer',
            color: '#a2a2a2',
        },
    },

    time: {
        display: 'inline-block',
        width: 40,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: 8,
        fontSize: 12,
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
    }
});
