import Form from '@/components/reservation/Form';
import UseReservation from '@/components/reservation/hooks/useReservation';
import Summary from '@/components/reservation/Summary';
import useUser from '@/hooks/auth/useUser';
import addDelimiter from '@/utils/addDelimiter';
import {css} from '@emotion/react';
import {parse} from 'qs';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ReservationPage() {
  const user = useUser();
  const navigate = useNavigate();

  const [{startDate, endDate, nights, roomId, hotelId}] = useState(
    () =>
      parse(window.location.search, {
        ignoreQueryPrefix: true,
      }) as {
        startDate: string;
        endDate: string;
        nights: string;
        roomId: string;
        hotelId: string;
      },
  );

  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null;
      })
    ) {
      window.history.back();
    }
  }, [user, startDate, endDate, nights, roomId, hotelId]);

  const {data, isLoading, makeReservation} = UseReservation({
    hotelId,
    roomId,
  });

  if (data == null || isLoading === true) {
    return <div css={loadingStyles}>Loading...</div>;
  }

  const {hotel, room} = data;

  const handleSubmit = async (formValues: {[key: string]: string;}) => {
    console.log('formValues ===>', formValues);
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };

    await makeReservation(newReservation);

    navigate(
      `/reservation/done?hotelName=${encodeURIComponent(hotel.name)}`,
    );
  };

  const buttonLabel = `${nights}박 ${Number(nights) + 1}일 ${addDelimiter(room.price * Number(nights))}원 예약하기`;

  return (
    <div css={pageStyles}>
      <header css={headerStyles}>
        <p css={eyebrowStyles}>Booking</p>
        <h1 css={titleStyles}>예약 확인</h1>
        <p css={subTitleStyles}>선택하신 객실과 일정을 확인하고 정보를 입력해주세요</p>
      </header>
      <div css={contentStyles}>
        <Summary
          hotelName={hotel.name}
          room={room}
          startDate={startDate}
          endDate={endDate}
          nights={nights}
        />
        <Form
          onSubmit={handleSubmit}
          forms={hotel.forms}
          buttonLabel={buttonLabel}
        />
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

const contentStyles = css`
  max-width: 720px;
  margin: 0 auto;
  padding: 8px 16px 96px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const loadingStyles = css`
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(28, 25, 23, 0.5);
  background: #f7f3ee;
`;

export default ReservationPage;
