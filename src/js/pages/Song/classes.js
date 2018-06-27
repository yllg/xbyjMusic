
export default theme => ({
    container: {
        backgroundColor: 'white',
        zIndex: 99,

        '& main': {
            position: 'fixed',
            top: 60,
            width: 'calc(100vw)',
            height: 'calc(100vh - 124px)',
            overflowY: 'auto',
        },
    },

    comments: {
        position: 'absolute',
        width: '100%',
        background: '#fafafa',
        zIndex: '-1',
    },

    recommend: {
        position: 'absolute',
        top: 60,
        right: 10,
        width: '35vw',
        height: '100%',
        color: '#000',
    },

    recommendTitleWrap: {
        display: 'inline-block',
        width: 310,
        height: 31,
        borderBottom: '1px solid #ccc'
    },

    recommendTitle: {
        color: '#222',
        fontSize: 20,
        marginRight: 10,
        paddingBottom: 5,
        borderBottom: '4px solid #ccc'
    },

    recomPlayList: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 200,

        '& a': {
            color: '#666',
            width: 310,
            margin: '18px 0 0 0',

            '&:hover': {
                background: '#f0f0f0',
            }
        },

        '& figure': {
            display: 'inline-block',
        },
    },

    recomPlayListContent: {
        position: 'absolute',
        fontSize: 12,
        lineHeight: '6px',
        margin: '-5px 0 0 10px',
    },

    simiSong: {
        position: 'absolute',
        left: 0,
        top: 270,
        height: 350,

        '& a': {
            color: '#666',
            width: 310,
            margin: '18px 0 0 0',

            '&:hover': {
                background: '#f0f0f0',
            }
        },

        '& figure': {
            display: 'inline-block',
        },
    },

    users: {
        position: 'absolute',
        left: 0,
        top: 670,
        height: 350,

        '& a': {
            color: '#666',
            width: 310,
            margin: '18px 0 0 0',

            '&:hover': {
                background: '#f0f0f0',
            }
        },

        '& figure': {
            display: 'inline-block',
            borderRadius: 40,
        },
    },

    recomUserContent: {
        position: 'absolute',
        fontSize: 12,
        lineHeight: '6px',
        margin: '10px 0 0 10px',
        width: 260,
    },
});
