import { MouseEvent, useEffect, useState } from 'react';
import Flex from '@shared/Flex';
import Text from '@shared/Text';
import { Hotel } from '@models/hotel';
import { css } from '@emotion/react';
import addDelimiter from '@/utils/addDelimiter';
import Tag from '../shared/Tag';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import formatTime from '@/utils/formatTime';
import { Link } from 'react-router-dom';

const HotelItem = ({
  hotel,
  isLike,
  onLike,
}: {
  hotel: Hotel;
  isLike: boolean;
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>;
  }) => void;
}) => {
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return;
    }

    const promoEndTime = hotel.events.promoEndTime;
    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      );
      if (남은초 < 0) {
        clearInterval(timer);
      }
      setRemainedTime(남은초);
    }, 1_000);

    return () => {
      clearInterval(timer);
    };
  }, [hotel.events]);

  const tagComponent = () => {
    if (hotel.events == null) {
      return null;
    }

    const { name, tagThemeStyle } = hotel.events;

    const promotionTxt =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : '';

    return (
      <div css={tagWrapStyles}>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
      </div>
    );
  };

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    });
  };

  return (
    <li css={cardStyles}>
      <Link to={`/hotel/${hotel.id}`} css={linkStyles}>
        <div css={imageWrapStyles}>
          <img src={hotel.mainImageUrl} alt="" css={imageStyles} />
          <img
            src={
              isLike
                ? 'https://cdn-icons-png.freepik.com/512/4749/4749719.png?uid=R180347339&ga=GA1.1.2025548309.1768199676'
                : 'https://cdn-icons-png.freepik.com/512/1077/1077035.png?uid=R180347339&ga=GA1.1.2025548309.1768199676'
            }
            alt=""
            css={iconHeartStyles}
            onClick={handleLike}
          />
          {tagComponent()}
        </div>
        <Flex direction="column" css={bodyStyles}>
          <Text typography="t7" color="gray500">
            {hotel.starRating}성급
          </Text>
          <Text bold={true} typography="t4" css={nameStyles}>
            {hotel.name}
          </Text>
          <Text typography="t7" color="gray600" css={commentStyles}>
            {hotel.comment}
          </Text>
          <Text bold={true} css={priceStyles}>
            {addDelimiter(hotel.price)}원
          </Text>
        </Flex>
      </Link>
    </li>
  );
};

const cardStyles = css`
  overflow: hidden;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(28, 25, 23, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(28, 25, 23, 0.1);
  }
`;

const linkStyles = css`
  display: block;
  color: inherit;
`;

const imageWrapStyles = css`
  position: relative;
  height: 210px;
  overflow: hidden;
  background: #ece7e1;
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const iconHeartStyles = css`
  position: absolute;
  width: 22px;
  height: 22px;
  top: 14px;
  right: 14px;
  padding: 8px;
  box-sizing: content-box;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 999px;
  box-shadow: 0 6px 16px rgba(28, 25, 23, 0.12);
  z-index: 1;
`;

const tagWrapStyles = css`
  position: absolute;
  left: 14px;
  bottom: 14px;
  z-index: 1;

  span {
    display: inline-block;
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 11px;
    box-shadow: 0 8px 18px rgba(28, 25, 23, 0.16);
  }
`;

const bodyStyles = css`
  padding: 16px 16px 18px;
  gap: 6px;
  min-height: 132px;
`;

const nameStyles = css`
  letter-spacing: -0.03em;
  line-height: 1.3;
`;

const commentStyles = css`
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 34px;
`;

const priceStyles = css`
  margin-top: auto;
  padding-top: 10px;
  font-size: 18px;
  letter-spacing: -0.03em;
  color: #1c1917;
`;

export default HotelItem;
