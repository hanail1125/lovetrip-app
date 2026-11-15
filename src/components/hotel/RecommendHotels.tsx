import addDelimiter from '@/utils/addDelimiter';
import {css} from '@emotion/react';
import {useState} from 'react';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import useRecommendHotels from './hooks/useRecommendHotels';

function RecommendHotels({recommendHotels}: {recommendHotels: string[];}) {
  const {data, isLoading} = useRecommendHotels({hotelIds: recommendHotels});
  const [showMore, setShowMore] = useState(false);

  if (data == null || isLoading) {
    return null;
  }

  const 추천호텔리스트 = data.length < 3 || showMore ? data : data.slice(0, 3);

  return (
    <div css={sectionStyles}>
      <Text bold={true} typography="t4" css={textStyles}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul css={listStyles}>
        {추천호텔리스트.map((hotel) => (
          <li key={hotel.id} css={cardStyles}>
            <img src={hotel.mainImageUrl} alt="" css={imageStyles} />
            <div css={metaStyles}>
              <Text bold={true}>{hotel.name}</Text>
              <Text typography="t7" color="gray600">
                {`${addDelimiter(hotel.price)}원`}
              </Text>
            </div>
          </li>
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{padding: '0 24px'}}>
          <Button
            full={true}
            weak={true}
            onClick={() => {
              setShowMore(true);
            }}
            css={showMoreBtn}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const sectionStyles = css`
  margin: 8px 0 28px;
`;

const listStyles = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
`;

const cardStyles = css`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(28, 25, 23, 0.15);
  border: 1px solid rgba(218, 218, 218, 0.4);
`;

const metaStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const imageStyles = css`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 16px;
  flex-shrink: 0;
`;

const textStyles = css`
  margin-left: 24px;
`;

const showMoreBtn = css`
  padding: 12px 24px;
  margin-top: 16px;
  border-radius: 999px;
`;

export default RecommendHotels;
