
import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import classes from './classes';

class Offline extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    render() {
        var { classes, show } = this.props;

        if (!show) {
            return false;
        }

        return (
            <div className={classes.container}>
                <h1> ┭┮﹏┭┮ &nbsp;&nbsp; 网络连接失败，点击下方按钮重新加载。。。</h1>

                <button onClick={e => window.location.reload()}>Reload</button>
            </div>
        );
    }
}

export default injectSheet(classes)(Offline);
