import { Room } from '@/models/room';
import { css } from '@emotion/react';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';

interface SummaryProps {
  hotelName: string;
  room: Room;
  startDate: string;
  endDate: string;
  nights: string;
}

function Summary({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) {
  return (
    <div css={cardStyles}>
      <Text typography="t4" bold={true}>
        {hotelName}
      </Text>
      <Spacing size={12} />
      <img
        src={room.imageUrl}
        css={imageStyles}
        alt={`${room.roomName}의 이미지`}
      />
      <Spacing size={16} />
      <div>
        <Text bold={true}>{room.roomName}</Text>
        <Spacing size={12} />
        <ul css={listStyles}>
          <Flex as="li" justify={'space-between'}>
            <Text color="gray600" typography="t6">
              일정
            </Text>
            <Text typography="t6">
              {`${startDate} ~ ${endDate} (${nights}박 ${
                Number(nights) + 1
              }일)`}
            </Text>
          </Flex>
          {Object.keys(room.basicInfo).map((key) => {
            if (key in INFO_LBAEL_MAP) {
              return (
                <Flex as="li" justify={'space-between'} key={key}>
                  <Text color="gray600" typography="t6">
                    {INFO_LBAEL_MAP[key as keyof typeof INFO_LBAEL_MAP]}
                  </Text>
                  <Text typography="t6">{room.basicInfo[key]}</Text>
                </Flex>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
}

const INFO_LBAEL_MAP = {
  bed: '침대',
  maxOccupancy: '최대인원',
  squareMeters: '면적',
  smoke: '흡연여부',
};

const cardStyles = css`
  padding: 22px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
`;

const listStyles = css`
  li:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const imageStyles = css`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 18px;
`;

export default Summary;
