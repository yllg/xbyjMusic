
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';
import { ThemeProvider } from 'react-jss';
import 'ionicons201/css/ionicons.css';

import './globalCss/global.css';
import 'utils/albumColors';
import { PLAYER_REPEAT, PLAYER_SHUFFLE, PLAYER_LOOP } from 'stores/controller';
import theme from './theme';
import getRoutes from './js/routes';
import stores from './js/stores';

class App extends Component {
    componentDidMount() {
        var { controller, fm, me, aboutme, playing, search } = stores;
        var navigator = this.refs.navigator;
        var isFMPlaying = () => controller.playlist.id === fm.playlist.id;

        // Player play
        ipcRenderer.on('player-play', (e, args) => {
            controller.play(args.id);
        });

        // Toggle the player
        ipcRenderer.on('player-toggle', () => {
            // Ignore signal
            if (search.show || playing.show) {
                return;
            }
            controller.toggle();
        });

        // Pause the player when system suspend
        ipcRenderer.on('player-pause', () => {
            if (controller.playing) {
                controller.toggle();
            }
        });

        // Play the next song
        ipcRenderer.on('player-next', () => {
            let FMPlaying = isFMPlaying();

            if (FMPlaying) {
                fm.next();
            } else {
                controller.next();
            }
        });

        // Play previous song
        ipcRenderer.on('player-previous', () => {
            controller.prev();
        });

        // Like a song
        ipcRenderer.on('player-like', () => {
            var song = controller.song;

            if (me.likes.get(song.id)) {
                return;
            }

            me.like(controller.song);
        });

        // Go the home screen
        ipcRenderer.on('show-home', () => {
            navigator.router.push('/');
        });

        // Search
        ipcRenderer.on('show-search', () => {
            search.toggle(true);
        });

        // Show the Ranking list
        ipcRenderer.on('show-top', () => {
            navigator.router.push('/top');
        });

        // All playlists
        ipcRenderer.on('show-playlist', () => {
            navigator.router.push('/playlist/全部');
        });

        // Show personal FM channel
        ipcRenderer.on('show-fm', () => {
            navigator.router.push('/fm');
        });

        // Show preferences screen
        ipcRenderer.on('show-preferences', () => {
            navigator.router.push('/preferences');
        });

        // 改成联系我
        ipcRenderer.on('about-me', () => {
            aboutme.toggle(true);
        });

        // 显示“播放列表”
        ipcRenderer.on('show-playing', () => {
            playing.toggle(true);
        });

        // 右键菜单
        window.addEventListener('contextmenu', e => {
            let logined = me.hasLogin();
            let contextmenu = new remote.Menu.buildFromTemplate([
                {
                    label: '首选项(Preferences)',
                    click: () => {
                        navigator.router.push('/preferences');
                    },
                },
                {
                    type: 'separator',
                },
                {
                    label: controller.playing ? '暂停(Pause)' : '播放(Play)',
                    click: () => {
                        controller.toggle();
                    }
                },
                {
                    label: '下一首(Next)',
                    click: () => {
                        isFMPlaying() ? fm.next() : controller.next();
                    }
                },
                {
                    label: '上一首(Previous)',
                    click: () => {
                        controller.prev();
                    }
                },
                {
                    label: '播放列表',
                    click: () => {
                        playing.toggle(true);
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: '单曲循环',
                    type: 'checkbox',
                    checked: controller.mode === PLAYER_REPEAT,
                    click: () => {
                        controller.changeMode(PLAYER_REPEAT);
                    }
                },
                {
                    label: '列表循环',
                    type: 'checkbox',
                    checked: controller.mode === PLAYER_LOOP,
                    click: () => {
                        controller.changeMode(PLAYER_LOOP);
                    }
                },
                {
                    label: '随机播放',
                    type: 'checkbox',
                    checked: controller.mode === PLAYER_SHUFFLE,
                    enabled: !isFMPlaying(),
                    click: () => {
                        controller.changeMode(PLAYER_SHUFFLE);
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: '喜欢(Like) ',
                    type: 'checkbox',
                    checked: me.isLiked(controller.song.id),
                    enabled: logined && !(me.isLiked(controller.song.id)),
                    click: () => {
                        if (me.likes.get(controller.song.id)) {
                            return;
                        }
                        me.like(controller.song);
                    }
                },
                {
                    label: '不喜欢',
                    enabled: logined && isFMPlaying(),
                    click: () => {
                        fm.ban(controller.song.id);
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: '回到首页(Home)',
                    click: () => {
                        navigator.router.push('/');
                    }
                },
                {
                    label: '登陆(Login)',
                    enabled: !logined,
                    click: () => {
                        navigator.router.push('/login/0');
                    }
                },
                {
                    label: '每日推荐',
                    click: () => {
                        navigator.router.push('/dailyPlayer');
                    }
                },
                {
                    label: '私人FM',
                    click: () => {
                        navigator.router.push('/fm');
                    }
                },
                {
                    label: '排行榜(Top)',
                    click: () => {
                        navigator.router.push('/top');
                    }
                },
                {
                    label: '歌单(Playlist)',
                    click: () => {
                        navigator.router.push('/playlist/全部');
                    }
                },
                {
                    label: '搜索(Search)',
                    click: () => {
                        stores.search.toggle(true);
                    }
                },
                {
                    type: 'separator',
                },
                {
                    label: '联系作者',
                    click: () => {
                        aboutme.toggle(true);
                    }
                },
                {
                    label: '最小化(Minimize)',
                    click: () => {
                        ipcRenderer.send('minimize');
                    }
                },
                {
                    label: '退出(Goodbye)',
                    click: () => {
                        ipcRenderer.send('goodbye');
                    }
                },
                {
                    type: 'separator',
                },
            ]);

            contextmenu.popup(remote.getCurrentWindow(), {
                async: true,
            });
        });
    }

    render() {
        return (
            <Provider {...stores}>
                <Router
                    history={hashHistory}
                    ref="navigator">
                    {getRoutes()}
                </Router>
            </Provider>
        );
    }
}

render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
