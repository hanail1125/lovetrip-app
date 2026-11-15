import ListRow from '@shared/ListRow';
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';

function SettingPage() {
  return (
    <div css={pageStyles}>
      <header css={headerStyles}>
        <p css={eyebrowStyles}>Account</p>
        <h1 css={titleStyles}>설정</h1>
        <p css={subTitleStyles}>찜한 숙소와 예약 내역을 한곳에서 관리하세요</p>
      </header>
      <ul css={listStyles}>
        <li>
          <Link to={'/settings/like'}>
            <ListRow
              as="div"
              style={rowStyles}
              contents={
                <ListRow.Texts title="찜하기" subTitle="찜한 호텔 순서 변경" />
              }
              withArrow={true}
            />
          </Link>
        </li>
        <li>
          <Link to={'/reservation/list'}>
            <ListRow
              as="div"
              style={rowStyles}
              contents={
                <ListRow.Texts title="예약목록" subTitle="예약목록 보러가기" />
              }
              withArrow={true}
            />
          </Link>
        </li>
      </ul>
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
  padding: 18px 20px;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
`;

export default SettingPage;
