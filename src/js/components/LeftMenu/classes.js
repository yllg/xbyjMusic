
export default theme => ({

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
