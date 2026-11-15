import addDelimiter from '@utils/addDelimiter';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import qs from 'qs';
import Button from '@shared/Button';
import Flex from '@shared/Flex';
import Spacing from '@shared/Spacing';
import Tag from '@shared/Tag';
import Text from '@shared/Text';
import useRooms from './hooks/useRooms';
import useUser from '@hooks/auth/useUser';
import {useAlertContext} from '@contexts/AlertContext';
import {useNavigate} from 'react-router-dom';
import WithSuspense from '@/components/shared/hocs/withSuspense';

const Rooms = ({hotelId}: {hotelId: string;}) => {
  const {data} = useRooms({hotelId});
  const user = useUser();
  const {open} = useAlertContext();
  const navigate = useNavigate();

  return (
    <Container>
      <Header justify='space-between' align='center'>
        <Text bold={true} typography='t4'>
          객실정보
        </Text>
        <Text typography='t6' color='gray400'>
          1박, 세금 포함
        </Text>
      </Header>
      <ul css={listStyles}>
        {data?.map((room) => {
          const 마감임박인가 = room.avaliableCount === 1;
          const 매진인가 = room.avaliableCount === 0;

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            {addQueryPrefix: true},
          );

          return (
            <li key={room.id} css={roomCardStyles}>
              <img
                src={room.imageUrl}
                alt={`${room.roomName}의 객실 이미지`}
                css={imageStyles}
              />
              <Flex direction='column' css={roomBodyStyles}>
                <Flex>
                  <Text bold={true}>{room.roomName}</Text>
                  {마감임박인가 === true ? (
                    <>
                      <Spacing size={6} direction='horizontal' />
                      <Tag backgroundColor='red'>마감임박</Tag>
                    </>
                  ) : null}
                </Flex>
                <Text typography='t7' color='gray600'>
                  {`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                </Text>
              </Flex>
              <Button
                size='medium'
                disabled={매진인가}
                onClick={() => {
                  if (user === null) {
                    open({
                      title: '로그인이 필요한 기능입니다.',
                      onButtonClick: () => {
                        navigate('/signin');
                      },
                    });

                    return;
                  }

                  navigate(`/schedule${params}`);
                }}
                css={selectButtonStyles}
              >
                {매진인가 === true ? '매진' : '선택'}
              </Button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 32px;
`;

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 16px;
`;

const listStyles = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  `;

const roomCardStyles = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(28, 25, 23, 0.15);
    border: 1px solid rgba(218, 218, 218, 0.4);
`;

const roomBodyStyles = css`
  flex: 1;
  min-width: 0;
  gap: 6px;
`;

const imageStyles = css`
  width: 92px;
  height: 92px;
  object-fit: cover;
  border-radius: 16px;
  flex-shrink: 0;
`;

const selectButtonStyles = css`
  border-radius: 999px;
  padding: 10px 16px;
  flex-shrink: 0;
`;

const fallbackStyles = css`
  margin: 24px;
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  color: rgba(28, 25, 23, 0.5);
  text-align: center;
`;

export default WithSuspense(Rooms, {
  fallback: <div css={fallbackStyles}>룸 불러오는 중...</div>,
});
