import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
// 
import apiPath from '../../utils/apiPath';


const carouselOptions = {
    rewind : true,
    type : 'loop',
    heightRatio : 1/3,
    autoplay: true,
    interval : 3000,
    pauseOnHover : true,
    drag : true,
    cover : true,
}

const Carousel = ({banners}) => {
    return (
        <div>
            <Splide options={carouselOptions}>
                {
                    banners &&
                    banners.map((banner, index) => (
                        <SplideSlide key={index}>
                            <Link to={{pathname: banner.banner_url}} target="_blank">
                                <img style={{borderRadius : '5px', width : '100%', height : "100%", objectFit:'cover'}} src={`${apiPath()}/${banner.banner_image}`} alt={banner.banner_name} />
                            </Link>
                        </SplideSlide>
                    ))
                }
            </Splide>
        </div>
    )
}

export default Carousel
