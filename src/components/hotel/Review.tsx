import useUser from '@hooks/auth/useUser';
import getProfileImageUrl from '@utils/getProfileImageUrl';
import { format } from 'date-fns';
import { ChangeEvent, useCallback, useState } from 'react';
import Button from '../shared/Button';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextLabel';
import UseReview from './hooks/useReview';
import { css } from '@emotion/react';

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading, write, remove } = UseReview({ hotelId });
  const user = useUser();
  const [text, setText] = useState('');

  const reviewRows = useCallback(() => {
    if (reviews == null || reviews.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn-icons-png.magnific.com/512/2190/2190550.png?ga=GA1.1.2039400138.1778518111"
            style={{ width: '70px' }}
            alt=""
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </Text>
        </Flex>
      );
    }

    return (
      <ul css={reviewListStyles}>
        {reviews.map((review) => (
          <li key={review.id} css={reviewCardStyles}>
            {review.user.photoURL !== null ? (
              <img
                src={getProfileImageUrl(review.user.photoURL)}
                alt=""
                width={40}
                height={40}
                referrerPolicy="no-referrer"
                css={avatarStyles}
              />
            ) : null}
            <div css={reviewBodyStyles}>
              <Text bold={true}>{review.text}</Text>
              <Text typography="t7" color="gray500">
                {format(review.createdAt, 'yyyy-MM-ddd')}
              </Text>
            </div>
            {review.userId === user?.uid ? (
              <Button
                onClick={() => {
                  const ok = window.confirm('정말 삭제하시겠습니까?');
                  if (!ok) return;

                  remove({
                    reviewId: review.id,
                    hotelId: review.hotelId,
                  });
                }}
              >
                삭제
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
    );
  }, [reviews, user, remove]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <div css={sectionStyles}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user !== null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify={'flex-end'}>
            <Button
              disabled={text === ''}
              onClick={async () => {
                const success = await write(text);

                if (success === true) {
                  setText('');
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}

const sectionStyles = css`
  margin: 8px 0 40px;
`;

const reviewListStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px 16px;
`;

const reviewCardStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
`;

const reviewBodyStyles = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const avatarStyles = css`
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
`;

export default Review;
