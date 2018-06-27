
export default theme => ({
    container: {
        '& main': {
            position: 'relative',
            top: 60,
            height: 'calc(100vh - 124px)',
            marginLeft: 200,
            color: '#000',
            overflow: 'hidden',
            overflowY: 'auto',
        }
    },

    hero: {
        display: 'flex',
        height: 260,
        justifyContent: 'flex-start',
        alignItems: 'center',

        '& figure': {
            boxShadow: '0 0 24px 0 #000',
            marginLeft: 35,
        }
    },

    personInfo: {
        position: 'absolute',
        width: 450,
        top: 12,
        left: 250,
        textAlign: 'center',
    },

    infoItemWrap: {
        textAlign: 'center',
        borderTop: '1px solid #eee',
        marginBottom: 25,
    },

    infoItem: {
        display: 'inline-block',
        width: 50,
        textAlign: 'center',
        padding: '0 10px',
        marginTop: 8,
    },

    itemNumber: {
        display: 'inline-block',
        width: 50,
        fontSize: 26,
        margin: 0,
    },

    username: {
        fontSize: 14,
        textAlign: 'center',

        '& span': {
            display: 'inline-block',
            padding: '8px 32px',
            color: '#000',
            fontSize: 22,
            textAlign: 'center',
            minWidth: 80,
        }
    },

    followers: {
        transform: 'translateX(-20px)',

        '& span': {
            display: 'inline-block',
            padding: '8px 0',
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#000',
            borderBottom: '2px solid #000',
            textIndent: 30,
        }
    },

    followed: {
        position: 'absolute',
        top: 8,
        right: 0,
    },

    introduce: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },

    signature: {
    },

    playing: {},

    meta: {
        position: 'absolute',
        top: 170,
        left: 30,
    },

    name: {
        '& span': {
            display: '-webkit-box !important',
            lineHeight: '18px',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
        }
    },

    played: {
        fontFamily: 'Roboto',
        fontSize: 12,
        textTransform: 'uppercase',
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

    info: {
        position: 'absolute',
        top: 100,
        right: 0,
        textAlign: 'right',
        color: '#fff',
        transition: '1s',
        transform: 'translateY(10px)',
    },

    hotsubtitle: {
        position: 'absolute',
        width: 80,
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

});
