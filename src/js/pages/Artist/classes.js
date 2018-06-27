
import perdido from 'perdido';

export default theme => ({
    container: {
        '& main': {
            position: 'relative',
            top: 60,
            height: 'calc(100vh - 124px)',
            marginLeft: 200,
        }
    },

    hero: {
        position: 'relative',
        height: 325,
        overflow: 'hidden',

        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
        },

        '& canvas': {
            transform: 'translateY(226px)',
            zIndex: -1,
            position: 'absolute',
            marginTop: '-52px'
        }
    },

    background: {
        position: 'absolute',
        top: '56%',
        left: '50%',
        display: 'block',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.8
    },

    play: {
        position: 'absolute',
        left: 32,
        bottom: 130,
        height: 64,
        width: 64,
        lineHeight: '64px',
        textAlign: 'center',
        borderRadius: 64,
        background: '#ee5d56',
        fontSize: 24,
        boxShadow: '0 0 24px rgba(0, 0, 0, .5)',
        cursor: 'pointer',
        zIndex: 9,
    },

    inner: {
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
        paddingLeft: 32,
        zIndex: 1,
    },

    name: {
        fontFamily: 'HelveticaNeue-UltraLight',
        fontSize: 26,
        display: 'inline-block',
        width: 200,
        margin: '0 0 16px 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',

        '& a, & span': {
            paddingBottom: '4px',
            color: '#fff',
            transition: '.2s',
            borderBottom: 'thin solid transparent',
        }
    },

    follow: {
        position: 'relative',
        width: 80,
        height: 24,
        padding: 0,
        marginBottom: 15,
        lineHeight: '24px',
        border: 'none',
        borderRadius: 24,
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
        outline: 0,
        transform: 'translateY(-4px)',
        overflow: 'hidden',
        cursor: 'pointer',

        '&$followed:before, &:hover:before': {
            opacity: 1,
        }
    },

    followed: {
        position: 'relative',
        width: 80,
        height: 24,
        padding: 0,
        marginRight: 24,
        lineHeight: '24px',
        border: 'none',
        borderRadius: 24,
        backgroundImage: 'linear-gradient(225deg, rgb(255, 103, 0) 0%, rgb(255, 45, 240) 100%)',
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

    meta: {
        marginBottom: 20,
        '& span': {
            display: 'inline-block',
            marginRight: 32,
            padding: '5px 16px',
            fontFamily: 'Roboto',
            fontSize: 12,
            color: '#000',
            borderRadius: 32,
            background: '#fff',
            textTransform: 'uppercase',
        }
    },

    body: {
        color: '#333',
        '& header': {
            margin: '0 32px 0 0',
            paddingTop: 8,
            fontFamily: 'Roboto',
            fontSize: 12,
            borderBottom: '2px solid #ddd'
        },

        '& nav': {
            position: 'relative',
            display: 'inline-block',
            padding: '10px 35px',
            textTransform: 'uppercase',
            letterSpacing: .5,
            wordSpacing: 2,
            cursor: 'pointer',

            '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                height: 2,
                transition: '.2s',
            },
        },

        '& nav:hover:after': {
            background: '#6496f0',
        }
    },

    selected: {
        '&:after': {
            background: '#16c182 !important',
        }
    },

    content: {
        height: 'calc(100vh - 496px)',
        overflow: 'hidden',
        overflowY: 'auto',
        margin: '0 32px 0 0',
    },

    titleName: {
        display: 'inline-block',
        marginLeft: 80,
        padding: '4px 8px',
        width: 270,
        fontSize: 12,
    },

    titleAlbum: {
        display: 'inline-block',
        marginLeft: 0,
        padding: '4px 8px',
        width: 268,
        fontSize: 12,
    },

    titleTime: {
        display: 'inline-block',
        marginLeft: 0,
        padding: '4px 8px',
        width: 25,
        fontSize: 12,
    },

    songs: {
        padding: 0,
        margin: '0 32px 0 0',
        marginBottom: 10,
        listStyle: 'none',
        overflow: 'hidden',

        '& li': {
            position: 'relative',
            display: 'flex',
            height: 32,
            lineHeight: '32px',
            transition: '.2s',

            '& i': {
                position: 'absolute',
                left: -32,
                top: 0,
                display: 'inline-block',
                height: 32,
                width: 32,
                color: '#fff',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #1cd8d2, #93edc7)',
                cursor: 'pointer',
            },

            '&:not($playing):hover': {
                transform: 'translateX(32px)',
            },

            '&$playing i': {
                left: 0,
                width: 30,
                background: 'linear-gradient(to left, #ff512f, #dd2476)',
                boxShadow: '0 0 24px 0 #ea4c89',
            }
        },

        '& li span': {
            display: 'block',
        },

        '& [data-index], & [data-time]': {
            width: 60,
            color: '#9b9b9b',
            textAlign: 'center',
            fontSize: 12,
        },

        '& [data-index]': {
            width: 100,
        },

        '& [data-name], & [data-album]': {
            display: '-webkit-box',
            maxWidth: 270,
            flex: .5,
            fontFamily: 'HelveticaNeue',
            fontSize: 12,
            color: '#654b58',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': 1,
            '-webkit-box-orient': 'vertical',
        },

        '& a': {
            paddingBottom: 2,
            color: 'inherit',
            transition: '.2s',
            borderBottom: 'thin solid transparent',

            '&:hover': {
                borderBottomColor: '#333',
            }
        }
    },

    songName: {
        '& span': {
            cursor: 'pointer',
        }
    },

    albumName: {
        '& a': {
            cursor: 'pointer',
        }
    },

    playing: {},

    albums: {
        ...perdido.utils.clearFix,
        margin: '0 32px',
        marginTop: 20,

        '& > div': {
            ...perdido.column('1/3'),
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 20,

            '& figure': {
                height: 48,
                width: 48,
                marginRight: 10,
                transition: '.4s',
            },

            '& figure:hover': {
                boxShadow: '0 0 24px 0 rgba(0, 0, 0, .5)',
            },

            '&$playing figure': {
                boxShadow: '0 0 24px 0 #16c182',
            },
        }
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        whiteSpace: 'nowrap',

        '& p': {
            padding: 0,
            margin: 0,
            maxWidth: 150,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },

        '& [data-name]': {
            fontSize: 14,
            color: '#333',
        },

        '& [data-time]': {
            marginTop: 4,
            fontSize: 12,
            color: '#9b9b9b',
        }
    },

    artists: {
        ...perdido.utils.clearFix,
        margin: '0 32px',
        marginTop: 20,
        textAlign: 'center',

        '& > div': {
            ...perdido.column('1/5'),
            marginBottom: 30,

            '& figure': {
                transition: '.4s',
            },
        },

        '& figure:hover': {
            boxShadow: '0 0 24px 0 rgba(0, 0, 0, .5)',
        }
    },

    artistName: {
        color: '#000',
        marginTop: 8,
        display: 'inline-block',
        fontSize: 12,
    },

    nothing: {
        display: 'flex',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontFamily: 'HelveticaNeue-UltraLight',
        fontSize: 24,
        letterSpacing: 1,
        wordSpacing: 3,
        color: '#000',

        '& a': {
            color: '#555'
        }
    }
});
