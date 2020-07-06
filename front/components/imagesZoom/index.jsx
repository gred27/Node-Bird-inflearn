import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Header,
  SlickWrapper,
  ImageWrapper,
  SlickGlobal,
  CloseBtn,
  Indicator,
} from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <div>
        <Header>
          <h1>상세이미지</h1>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
      </div>
      <SlickGlobal />
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinte
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v, i) => (
              <ImageWrapper key={v.src + i}>
                <img src={v.src} alt={v.alt} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}/{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
