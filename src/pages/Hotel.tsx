import useHotel from '@components/hotel/hooks/useHotel';
import {useParams} from 'react-router-dom';
import Carousel from '@components/hotel/Carousel';
import Contents from '@components/hotel/Contents';
import Rooms from '@components/hotel/Rooms';
import Map from '@components/hotel/Map';
import RecommendHotels from '@components/hotel/RecommendHotels';
import ActionButtons from '@components/hotel/ActionButtons';
import Review from '@components/hotel/Review';
import {css} from '@emotion/react';
import ScrollProgressBar from '@/components/shared/ScrollProgressBar';
import SEO from '@/components/SEO';

const HotelPage = () => {
  const {id} = useParams() as {id: string;};
  const {isLoading, data} = useHotel({id});

  if (data == null || isLoading) {
    return <div css={loadingStyles}>Loading...</div>;
  }

  const {name, comment, images, contents, location, recommendHotels} = data;

  return (
    <div css={pageStyles}>
      <SEO title={name} description={comment} image={images[0]} />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Carousel images={images} />
      <div css={bodyStyles}>
        <header css={headerStyles}>
          <p css={eyebrowStyles}>Hotel Stay</p>
          <h1 css={titleStyles}>{name}</h1>
          <p css={subTitleStyles}>{comment}</p>
        </header>
        <ActionButtons hotel={data} />
        <Rooms hotelId={id} />
        <Contents content={contents} />
        <Map location={location} />
        <RecommendHotels recommendHotels={recommendHotels} />
        <Review hotelId={id} />
      </div>
    </div>
  );
};

const pageStyles = css`
  min-height: calc(100vh - 65px);
  background: linear-gradient(180deg, #f7f3ee 0%, #fbfaf8 220px, #ffffff 100%);
  padding-bottom: 64px;
`;

const bodyStyles = css`
  max-width: 920px;
  margin: 0 auto;
`;

const headerStyles = css`
  padding: 28px 24px 8px;
`;

const eyebrowStyles = css`
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9a6b4f;
  font-weight: 600;
`;

const titleStyles = css`
  margin: 0;
  font-size: 30px;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1c1917;
`;

const subTitleStyles = css`
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.55;
  color: rgba(28, 25, 23, 0.62);
`;

const loadingStyles = css`
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(28, 25, 23, 0.5);
  background: #f7f3ee;
`;

const scrollProgressBarStyles = css`
  position: sticky;
  top: 65px;
  z-index: 2;
  height: 4.5px !important;
  background: tomato !important;
  /*background: linear-gradient(90deg, #c45c26, #9a6b4f) !important;}*/
`;

export default HotelPage;
