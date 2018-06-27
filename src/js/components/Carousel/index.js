import React, { Component } from 'react';
import Slider from 'react-slick';
// 引入react-slick轮播图的样式
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, background: '#ac3934', borderRadius: '50%' }}
//             onClick={onClick}
//         />
//     );
// }

// 首页的大轮播图
export default class Carousel extends Component {
    render() {
        var bannerList = this.props.bannerList;
        var picWidth = this.props.picWidth;
        // console.log('picWidth', picWidth);
        const settings = {
            // className: 'center',
            centerMode: true,
            centerPadding: '85px',
            dots: true,
            infinite: true,
            swipeToSlide: true,
            // fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            focusOnSelect: true,
            // nextArrow: <SampleNextArrow />,
        };
        return (
            <div>
                <Slider {...settings}>
                    {
                        // 轮播图列表
                        bannerList.map((e, index) => {
                            return (
                                <div
                                    key={index}>
                                    {
                                        <img src={e.pic} style={{width: `${picWidth}`}} />
                                    }
                                    {/* <h3>{index}</h3> */}
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        );
    }
}
