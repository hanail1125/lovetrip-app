import UseReservations from '@/components/reservation-list/hooks/useReservations';
import ListRow from '@shared/ListRow';
import {css} from '@emotion/react';

function ReservationListPage() {
  const {data, isLoading} = UseReservations();
  console.log('data ===>', data);

  if (data == null || isLoading === true) {
    return <div css={loadingStyles}>Loading...</div>;
  }

  return (
    <div css={pageStyles}>
      <header css={headerStyles}>
        <p css={eyebrowStyles}>Trips</p>
        <h1 css={titleStyles}>예약 목록</h1>
        <p css={subTitleStyles}>예약한 숙소와 일정을 한눈에 확인하세요</p>
      </header>
      <div css={listStyles}>
        {data.map(({hotel, reservation}) => (
          <ListRow
            key={reservation.id}
            style={rowStyles}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={`${hotel.name} 이미지`}
                width={80}
                height={80}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${reservation.startDate} ~ ${reservation.endDate}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

const pageStyles = css`
  min-height: calc(100vh - 65px);
  background: linear-gradient(180deg, #f7f3ee 0%, #fbfaf8 180px, #ffffff 100%);
`;

const headerStyles = css`
  padding: 32px 24px 12px;
  max-width: 720px;
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

const listStyles = css`
  max-width: 720px;
  margin: 0 auto;
  padding: 8px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const rowStyles = css`
  padding: 14px;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
`;

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 16px;
`;

const loadingStyles = css`
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(28, 25, 23, 0.5);
  background: #f7f3ee;
`;

export default ReservationListPage;
