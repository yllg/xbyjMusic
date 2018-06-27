
import colors from 'utils/colors';

export default theme => ({
    list: {
        width: '52vw',
        height: '100%',
        padding: '60px 60px',
        color: '#777',
        overflow: 'hidden',
        overflowY: 'auto',

        '& h3': {
            marginTop: 40,
        }
    },

    listFM: {
        height: '100%',
        padding: '60px 60px',
        color: '#777',
        overflow: 'hidden',
        overflowY: 'auto',

        '& h3': {
            marginTop: 40,
        }
    },

    songTitleWrap: {
        display: 'inline-block',
        width: 520,
        height: 31,
        borderBottom: '1px solid #ccc'
    },

    songTitle: {
        color: '#222',
        fontSize: 20,
        marginRight: 10,
        paddingBottom: 5,
        borderBottom: '4px solid #ccc'
    },

    comment: {
        display: 'flex',
        padding: '18px 0 18px 0',
        justifyContent: 'flex-start',
        lineHeight: '20px',
        fontSize: 12,
        borderTop: '1px dotted #ccc',
        color: '#333',

        '& a': {
            color: 'cornflowerblue'
        },

        '& aside': {
            flex: 1,
        },

        '& figure': {
            marginRight: 12,
            borderRadius: 35,
        },

        '& p': {
            marginTop: 0,
        },
    },

    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
        color: 'rgba(0, 0, 0, .3)',

        '& span': {
            marginRight: 10,
        },

        '$thumbsup': {
            cursor: 'pointer',
            transition: '.3s',

            '&:hover, &:hover i': {
                color: colors.pallet.primary,
            }
        },
    },

    thumbsup: {
        cursor: 'pointer',
        transition: '.3s',

        '&:hover, &:hover i': {
            color: colors.pallet.primary,
        }
    },

    nestest: {
        padding: 0,
        margin: 0,
        marginTop: 14,
        listStyle: 'none',

        '& a': {
            display: 'inline-block',
            padding: '1px 2px',
            color: '#2d82ca',
            whiteSpace: 'nowrap',
            borderBottom: 'thin solid transparent',
            transition: '.2s',

            '&:hover': {
                borderBottomColor: '#2d82ca',
            }
        },

        '& li': {
            background: 'rgba(0, 0, 0, 0.03)',
            padding: '4px 12px',
            fontSize: 12,
            lineHeight: '20px',
        }
    },

    loadmore: {},

    liked: {
        color: colors.pallet.grape,
        textShadow: `0 0 24px ${colors.pallet.grape}`,
    },
});
