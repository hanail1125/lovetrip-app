import FixedBottomButton from '@/components/shared/FixedBottomButton';
import RangePicker from '@/components/shared/RangePicker';
import { css } from '@emotion/react';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SchedulePage() {
  const navigate = useNavigate();

  const { hotelId, roomId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string;
    hotelId: string;
  };

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({ startDate: undefined, endDate: undefined, nights: 0 });

  useEffect(() => {
    if (hotelId === '' || roomId === '') {
      window.history.back();
    }
  }, [hotelId, roomId]);

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    );

    navigate(`/reservation${params}`);
  };

  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null;

  const buttonLabel = 제출가능한가
    ? `${selectedDate.startDate} ~ ${selectedDate.endDate} (${
        selectedDate.nights
      }박 ${selectedDate.nights + 1}일)`
    : '예약 날짜를 선택해주세요';

  return (
    <div css={pageStyles}>
      <header css={headerStyles}>
        <p css={eyebrowStyles}>Stay dates</p>
        <h1 css={titleStyles}>예약 일정</h1>
        <p css={subTitleStyles}>
          체크인부터 체크아웃까지 원하는 날짜를 선택해주세요
        </p>
      </header>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          // console.log( '사용처:', dateRange );
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          });
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={제출가능한가 === false}
        onClick={moveToReservationPage}
      />
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

export default SchedulePage;
