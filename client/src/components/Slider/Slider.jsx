import Slider from "react-slick";

import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderContainer = styled.div`
  width: 95%;
  max-width: ${(props) => props.width || "1800px"};
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;

  .slick-slide {
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .slick-prev,
  .slick-next {
    width: 100px;
    height: 100px;
    z-index: 1;
    border: 2px solid red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

   
  }

  .slick-prev {
    left: 0px;
  }

  .slick-next {
    right: 0px; 
  }
`;

const Slide = styled.div`
  position: relative;

  h2 {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
    font-size: 3em;
    font-weight: bold;
  }

  p {
    position: absolute;
    bottom: 0;
    left: 20px;
    color: #fff;
    font-size: 1.5em;
  }
`;

export const CustomSlider = ({ images, width, height }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <SliderContainer width={width}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Slide key={index}>
            <img
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              style={{ height }}
            />
          </Slide>
        ))}
      </Slider>
    </SliderContainer>
  );
};
