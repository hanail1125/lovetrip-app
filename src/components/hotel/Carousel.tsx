import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {css} from '@emotion/react';
import {LazyLoadImage} from 'react-lazy-load-image-component';

const Carousel = ({images}: {images: string[];}) => {
  return (
    <div css={wrapStyles}>
      <Swiper
        css={containerStyles}
        spaceBetween={16}
        slidesPerView={3}
        centeredSlides={true}
        loop={images.length > 2}
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={imageUrl}>
            <div css={slideInnerStyles}>
              <LazyLoadImage
                src={imageUrl}
                alt={`${idx + 1}번째 호텔의 이미지`}
                css={imageStyles}
                height={300}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const wrapStyles = css`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: -5px;
  margin-bottom: 30px;
`;

const containerStyles = css`
  height: 360px;
  overflow: visible;
  cursor: pointer;

  .swiper-slide {
    height: 360px;
    opacity: 0.15;
    transition: opacity 0.35s ease;
  }

  .swiper-slide-active {
    opacity: 1;
    z-index: 1;
  }
`;

const slideInnerStyles = css`
  height: 100%;
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(28, 25, 23, 0.12);
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Carousel;
