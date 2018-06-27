
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';

import classes from './classes';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import Controller from 'components/Controller';
import Lyrics from 'components/Lyrics';
import LeftMenu from 'components/LeftMenu';
import Comments from 'components/Comments';

@inject(stores => ({
    loading: stores.fm.loading,
    getFM: stores.fm.preload,
    songs: stores.fm.playlist.songs,
    song: stores.fm.song,
    next: stores.fm.next,
    play: stores.fm.play,
    like: stores.me.like,
    // 把FM当前歌曲移入垃圾桶
    ban: stores.fm.ban,
    unlike: stores.me.unlike,
    isLiked: stores.me.isLiked,

    isFMPlaying() {
        var { controller, fm } = stores;
        return controller.playlist.id === fm.playlist.id;
    },

    isPlaying() {
        var { controller, fm } = stores;

        return controller.playing
            && controller.playlist.id === fm.playlist.id;
    },
    comments: stores.comments.total,
}))
@observer
class FM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false
        };
    }

    componentWillMount() {
        this.props.getFM();
    }
    scrollHandle(e) {
        // 根据滚动距离顶部的距离来设置变量哦；
        // console.log('e', e);
        // console.log('先拿到dom', this.refs.container);
        // console.log('scrollHeight', this.refs.container.scrollHeight);
        // console.log('scrollTop', this.refs.container.scrollTop);
        // console.log('offsetTop', this.refs.container.offsetTop);
        // console.log('document.body.scrollTop', document.body.scrollTop);
        // var ele = document.querySelector('#container');
        // console.log('scrollHeight', ele.scrollHeight);
        // console.log('scrollTop', ele.scrollTop);
        // console.log('offsetTop', ele.offsetTop);
        // this.setState({isScroll: !this.state.isScroll});
    }

    render() {
        var { classes, loading, songs, song } = this.props;
        // console.log('songs', songs);
        // console.log('song', song);
        if (loading) {
            return (
                <Loader show={true} />
            );
        }

        if (songs.length === 0) {
            return (
                <div>
                    <div className={classes.unavailable}>
                        <p>
                            哦呦~ 私人FM只适用于中国大陆哦
                        </p>

                        <Link to="/">
                            Discover Music
                        </Link>
                    </div>

                    <Controller />
                </div>
            );
        }

        return (
            <div className={classes.container}
                onScroll={e => {
                    this.scrollHandle(e);
                }}
            >
                <Header {...{
                    color: 'white',
                    showBack: true,
                }} />

                <LeftMenu />

                <main>
                    <Lyrics {...{
                        isFM: true,
                        fmSong: song,
                        isScroll: this.state.isScroll,
                    }} key={this.state.isScroll ? 1 : 0} />

                    <div className={classes.comments} ref="container" id="container">
                        <Comments isFM={true} />
                    </div>

                </main>
                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(FM);
