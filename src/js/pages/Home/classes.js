
// import colors from 'utils/colors';

export default theme => ({
    container: {
        width: '100vw',
        height: '100vh',
        // background: colors.randomGradient(),
        background: '#fff',

        '& main': {
            background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 1))',
            position: 'absolute',
            width: 'calc(100vw - 200px)',
            height: 'calc(100vh - 124px)',
            top: 60,
            right: 0,
            marginLeft: 200,
            display: 'flex',
            flexDirection: 'column',
        },

        '@global .scroll-horizontal': {
            width: 'calc(100% - 32px) !important',
            overflow: 'initial !important',
        }
    },

    maintop: {
    },

    type: {
        color: '#333',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 16,
        borderBottom: '1px solid #ddd',

        '& a': {
            color: '#333',
        },

        '& div': {
            margin: '13px 34px',
        }
    },

    carousel: {
        width: 680,
        height: 230,
        margin: '0 auto',
        color: '#000',
    },

    mainbody: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        overflowY: 'auto',
        flexDirection: 'column',
    },

    playlistTitle: {
        margin: '0px 26px',
        paddingBottom: '8px',
        color: '#333',
        fontSize: 20,
        borderBottom: '1px solid #ddd',
    },

    hotplaylistTitle: {
        margin: '0px 26px 22px',
        paddingBottom: '8px',
        color: '#333',
        fontSize: 20,
        borderBottom: '1px solid #ddd',
    },

    item: {
        position: 'relative',
        display: 'inline-block',
        minWidth: 130,
        textAlign: 'right',
        cursor: 'pointer',
        marginBottom: 30,

        '& img': {
            width: 150,
            height: 150,
            margin: 24,
            pointerEvents: 'none',
            transition: '.4s',
        },
    },

    personItem: {
        width: '50%',
        position: 'relative',
        display: 'inline-block',
        minWidth: 130,
        textAlign: 'right',
        cursor: 'pointer',

        '& img': {
            width: 122,
            height: 122,
            margin: 16,
            pointerEvents: 'none',
            transition: '.4s',
        },
    },

    itemWrap: {
        float: 'left',
        '& $playing, &:hover': {
            '& img': {
                boxShadow: '0 20px 30px 4px rgba(97, 45, 45, .5)',
                transform: 'translateY(-24px)'
            },

            '& $info': {
                opacity: 1,
                visibility: 'visible',
                transform: 'translateY(-12px)',
            },

            '& $mask': {
                transform: 'translateY(-24px)',
            },

            '& $mask:before, & $mask:after': {
                opacity: 1,
            }
        },
    },

    personItemWrap: {
        float: 'left',
        '& $playing, &:hover': {
            '& img': {
                boxShadow: '0 20px 30px 4px rgba(97, 45, 45, .5)',
                transform: 'translateX(24px)'
            },
            '& $subtitle': {
                transform: 'translateX(24px)',
            },

            '& $mask': {
                transform: 'translateX(24px)',
            },

            '& $mask:before, & $mask:after': {
                opacity: 1,
            }
        },
    },

    playing: {},

    liked: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        height: 100,
        color: '#fff',
        transform: 'translateX(30px)',

        '&$playing': {
            '& $cover': {
                boxShadow: '0 20px 30px 4px rgba(97, 45, 45, .5)',
            },

            '& $cover:before': {
                opacity: 1,
            }
        },
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

    cover: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundImage: 'linear-gradient(280deg, rgb(47, 42, 41) 0%, rgb(47, 42, 41) 100%)',
        overflow: 'hidden',
        transition: '.4s',

        '&:before': {
            position: 'absolute',
            top: 0,
            left: 0,
            content: '""',
            display: 'block',
            height: '100%',
            width: '100%',
            backgroundImage: 'linear-gradient(225deg, rgb(255, 103, 0) 0%, rgb(255, 45, 240) 100%)',
            opacity: 0,
            transition: '.4s',
        },

        '&:hover': {
            boxShadow: '0 20px 30px 4px rgba(97, 45, 45, .5)',
        },

        '&:hover:before': {
            opacity: 1,
        },

        '& > div': {
            padding: '0 8px',
            zIndex: 9,
        },
    },

    meta: {
        flex: .8,
        textAlign: 'left',
        transform: 'translateX(-10px)',

        '& $subtitle': {
            margin: 0,
            fontSize: 13,
            fontWeight: 'bold',
            background: 'none',
            color: '#000',
        },
    },

    info: {
        position: 'absolute',
        top: 100,
        right: 0,
        textAlign: 'right',
        color: '#fff',
        transition: '1s',
        transform: 'translateY(10px)',
    },

    personInfo: {
        width: 185,
        position: 'absolute',
        top: 15,
        left: 180,
        textAlign: 'left',
        color: '#fff',
        opacity: 1,
    },

    personInfoDaily: {
        top: 50,
    },

    personDate: {
        fontSize: 74,
        lineHeight: '120px',
        color: '#c95b59',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    subtitle: {
        position: 'absolute',
        top: 5,
        left: -160,
        transition: '1s',
        fontFamily: 'Roboto',
        fontWeight: 'bolder',
        fontSize: 12,
        zIndex: 2,
        background: 'linear-gradient(to right, #ccc, rgba(255, 255, 255, 0))',
        padding: '0 4px',
        borderRadius: 4,
    },

    hotsubtitle: {
        position: 'absolute',
        width: 60,
        top: -82,
        right: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bolder',
        fontSize: 12,
        zIndex: 2,
        background: 'linear-gradient(to left, #ccc, rgba(255, 255, 255, 0))',
        padding: '0 4px',
        borderRadius: 4,
    },

    title: {
        color: '#333',
        fontSize: 16,
        lineHeight: '24px',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },

    hottitle: {
        position: 'absolute',
        width: 140,
        left: -170,
        top: 80,
        color: '#333',
        fontSize: 14,
        textAlign: 'left',
        lineHeight: '16px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },

    description: {
        marginTop: 10,
        color: '#888',
        fontSize: 12,
        lineHeight: '18px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
    },

    rowLineLeft: {
        position: 'absolute',
        width: '95%',
        top: 140,
        left: 16,
        borderBottom: '1px solid #eee',
    },

    rowLineRight: {
        position: 'absolute',
        width: '95%',
        top: 140,
        left: 395,
        borderBottom: '1px solid #eee',
    },

    columnLineTop: {
        position: 'absolute',
        height: '93%',
        top: 13,
        right: 0,
        borderRight: '1px solid #eee',
    },

    columnLineBottom: {
        position: 'absolute',
        height: '93%',
        top: 155,
        right: 0,
        borderRight: '1px solid #eee',
    },

    aside: {
        display: 'inline-block',
        position: 'absolute',
        left: 0,
        top: 60,
        width: 200,
        height: 'calc(100vh - 124px)',
        color: '#333',
        borderRight: '1px solid #ddd',
        background: 'linear-gradient(to right,#e3e3e3,#f6f6f6)',
        overflow: 'hidden',
        overflowY: 'auto',

        '& a': {
            color: '#333',
        },
    },

    leftMenu: {
        margin: '4px 12px 18px'
    },

    leftMenuSpan: {
        fontSize: 12,
        color: '#666',
    },

    leftMenuItem: {
        fontSize: 14,
        margin: '10px 8px',

        '& i': {
            display: 'inline-block',
            width: 16,
            marginRight: 8,
            fontSize: 17,
            textAlign: 'center',
        },

        '& p': {
            display: 'inline-block',
            width: 135,
            height: 16,
            margin: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
    },

});
