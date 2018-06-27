
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ipcRenderer } from 'electron';

import helper from 'utils/helper';

@inject(stores => ({
    song: stores.controller.song,
    scrobble: stores.controller.scrobble,
    next: stores.controller.next,
    play: () => stores.controller.play(stores.controller.song.id),
    playing: stores.controller.playing,
    volume: stores.preferences.volume,
    setVolume: stores.preferences.setVolume,
    autoPlay: stores.preferences.autoPlay,
    lyrics: stores.lyrics.list,
}))
@observer
export default class AudioPlayer extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.playing !== this.props.playing) {
            try {
                if (!this.refs.player.src
                    // 避免重复init播放器
                    && !this.props.autoPlay) {
                    this.props.play();
                } else {
                    this.refs.player[nextProps.playing ? 'play' : 'pause']();
                }
            } catch (ex) {
                // Anti warnning
            }
        }
    }

    componentDidMount() {
        var player = this.refs.player;
        var { volume, setVolume } = this.props;

        ipcRenderer.on('player-volume-up', () => {
            var volume = player.volume + .1;

            player.volume = volume > 1 ? 1 : volume;
            setVolume(player.volume);
        });

        ipcRenderer.on('player-volume-down', () => {
            var volume = player.volume - .1;

            player.volume = volume < 0 ? 0 : volume;
            setVolume(player.volume);
        });

        player.volume = volume;
    }

    passed = 0;

    // 设置时间进度提示块的X轴位置
    progress(currentTime = 0) {
        var duration = this.props.song.duration;

        // Reduce CPU usage, cancel the duplicate compution
        // 减少CPU使用，取消重复计算
        if (currentTime * 1000 - this.passed < 1000) {
            return;
        }

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            var ele = document.querySelector('#progress');

            if (ele) {
                let percent = (currentTime * 1000) / duration;
                // ID为progress的元素，设置自定义属性，第一个记录播放进度，第二个记录伪元素的位置
                ele.setAttribute('data-time', `${helper.getTime(currentTime * 1000)} / ${helper.getTime(duration)}`);
                ele.setAttribute('data-percent', `${percent}%`);
                // 设置它的第一个子元素，宽度变化，也设置自定义属性记录播放时间
                var eleFirstChild = ele.firstElementChild;
                eleFirstChild.style.transform = `translate3d(${-100 + percent * 100}%, 0, 0)`;
                eleFirstChild.setAttribute('data-time', `${helper.getTime(currentTime * 1000)} / ${helper.getTime(duration)}`);

                this.buffering();
            }
        }, 450);

        this.passed = currentTime * 1000;
    }

    // 滚动歌词
    scrollerLyrics(currentTime = 0) {
        var ele = document.querySelector('#lyrics');
        var lyrics = this.props.lyrics;

        if (ele) {
            let key = helper.getLyricsKey(currentTime * 1000, lyrics);

            if (key) {
                let playing = ele.querySelectorAll('[playing]');

                Array.from(playing).map(e => e.removeAttribute('playing'));

                playing = ele.querySelector(`[data-times='${key}']`);

                if (!playing.getAttribute('playing')) {
                    playing.setAttribute('playing', true);
                    playing.scrollIntoViewIfNeeded();
                }
            }
        }
    }

    buffering() {
        var ele = document.querySelector('#progress');
        var player = this.refs.player;

        if (ele
            // Player has started
            && player.buffered.length) {
            let buffered = player.buffered.end(player.buffered.length - 1);

            if (buffered >= 100) {
                buffered = 100;
            }

            ele.lastElementChild.style.transform = `translate3d(${-100 + buffered}%, 0, 0)`;
        }
    }

    resetProgress() {
        this.passed = 0;
    }

    render() {
        var song = this.props.song;

        /* eslint-disable */
        return (
            <audio
                autoPlay={true}
                onAbort={e => {
                    this.passed = 0, this.progress();
                }}
                onEnded={e => {
                    this.props.scrobble();
                    this.passed = 0, this.props.next(true);
                }}
                onError={e => console.log(e)}
                onProgress={e => this.buffering(e)}
                onSeeked={e => this.resetProgress()}
                onTimeUpdate={e => {
                    this.progress(e.target.currentTime);
                    this.scrollerLyrics(e.target.currentTime);
                }}
                ref="player"
                src={(song.data || {}).src}
                style={{
                    display: 'none'
                }} />
        );
        /* eslint-enable */
    }
}
