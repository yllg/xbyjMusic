
export default theme => ({

    sliderOne: {

        '& img': {
            width: 200,
            cursor: 'pointer',
            margin: '0 auto',
        },

        '& img:hover': {
            boxShadow: '0 1px 24px rgba(0, 0, 0, .24)',
        },
    },

    sliderTwo: {
        '& h3': {
            fontSize: 14,
            textAlign: 'center',
            color: '#555',
            fontFamily: 'monospace',
        }
    }
});
