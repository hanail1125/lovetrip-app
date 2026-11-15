import useHotels from '@components/hotelList/hooks/useHotels';
import HotelItem from '@/components/hotelList/HotelItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import useLike from '@hooks/like/useLike';
import WithSuspense from '@/components/shared/hocs/withSuspense';
import {css} from '@emotion/react';

const HotelListPage = () => {
  const {data: hotels, hasNextPage, loadMore} = useHotels();
  const {data: likes, mutate: like} = useLike();

  return (
    <div css={pageStyles}>
      <section css={heroStyles}>
        <p css={eyebrowStyles}>Stay · Relax · Discover</p>
        <h1 css={titleStyles}>인기 호텔</h1>
        <p css={subTitleStyles}>호텔부터 펜션까지 최저가</p>
      </section>

      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul css={listStyles}>
          {hotels?.map((hotel) => (
            <HotelItem
              key={hotel.id}
              hotel={hotel}
              isLike={Boolean(likes?.find((like) => like.hotelId === hotel.id))}
              onLike={like}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

const pageStyles = css`
  min-height: calc(100vh - 65px);
  background: linear-gradient(180deg, #f7f3ee 0%, #fbfaf8 180px, #ffffff 100%);
`;

const heroStyles = css`
  padding: 40px 24px 28px;
  max-width: 1120px;
  margin: 0 auto;
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
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1c1917;
`;

const subTitleStyles = css`
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(28, 25, 23, 0.58);
`;

const listStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  padding: 0 20px 48px;
  max-width: 1120px;
  margin: 0 auto;
  list-style: none;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const fallbackStyles = css`
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(28, 25, 23, 0.5);
  font-size: 14px;
  background: #f7f3ee;
`;

export default WithSuspense(HotelListPage, {
  fallback: <div css={fallbackStyles}>호텔리스트 불러오는 중...</div>,
});
