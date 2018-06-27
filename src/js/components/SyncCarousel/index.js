
import React, { Component } from 'react';
import Slider from 'react-slick';
import injectSheet from 'react-jss';

// 引入react-slick轮播图的样式
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import classes from './classes';

// AboutMe组件的同步轮播图
class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        var {bannerList, classes} = this.props;
        return (
            <div style={{color: '#000'}}>
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    autoplay={true}
                    autoplaySpeed={5000}
                    pauseOnHover={true}
                >
                    <div className={classes.sliderOne}>
                        <a
                            href="https://github.com/yllg"
                            target="_blank">
                            <img src={bannerList[0].pic} style={{padding: '50px 0'}} />
                        </a>
                    </div>
                    <div className={classes.sliderOne}>
                        {
                            <img src={bannerList[1].pic} style={{padding: '30px 0'}} />
                        }
                    </div>
                    <div className={classes.sliderOne}>
                        {
                            <img src={bannerList[2].pic} style={{}} />
                        }
                    </div>
                </Slider>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    autoplay={true}
                    autoplaySpeed={5000}
                    pauseOnHover={true}
                    slidesToShow={1}
                >
                    <div className={classes.sliderTwo}>
                        <h3>欢迎star、fork一起完善本项目</h3>
                    </div>
                    <div className={classes.sliderTwo}>
                        <h3>关注微信公众号</h3>
                    </div>
                    <div className={classes.sliderTwo}>
                        <h3>加入技术交流群(备注自己GitHub账号)</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default injectSheet(classes)(AsNavFor);
