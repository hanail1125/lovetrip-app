import Button from '@components/shared/Button';
import useUser from '@hooks/auth/useUser';
import useGoogleSignin from '@hooks/useGoogleSignin';
import getProfileImageUrl from '@utils/getProfileImageUrl';
import {css} from '@emotion/react';

function Mypage() {
  const user = useUser();
  const {signout} = useGoogleSignin();

  const nickname = user?.displayName || user?.email || '사용자';

  return (
    <div css={pageStyles}>
      <header css={headerStyles}>
        <p css={eyebrowStyles}>Profile</p>
        <h1 css={titleStyles}>마이페이지</h1>
        <p css={subTitleStyles}>내 프로필을 확인하고 로그아웃할 수 있습니다</p>
      </header>

      <section css={cardStyles}>
        <img
          src={getProfileImageUrl(user?.photoURL, 160)}
          alt="프로필 이미지"
          css={imageStyles}
          referrerPolicy="no-referrer"
        />
        <p css={nicknameStyles}>{nickname}</p>
        {user?.email ? <p css={emailStyles}>{user.email}</p> : null}
        <Button
          size="medium"
          color="error"
          weak={true}
          full={true}
          onClick={signout}
          css={logoutButtonStyles}
        >
          로그아웃
        </Button>
      </section>
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

const cardStyles = css`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
  width: calc(100% - 32px);
  box-sizing: border-box;
`;

const imageStyles = css`
  width: 96px;
  height: 96px;
  border-radius: 100%;
  object-fit: cover;
  background: #f7f3ee;
`;

const nicknameStyles = css`
  margin: 16px 0 0;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1c1917;
`;

const emailStyles = css`
  margin: 6px 0 0;
  font-size: 14px;
  color: rgba(28, 25, 23, 0.55);
`;

const logoutButtonStyles = css`
  margin-top: 28px;
  border-radius: 999px;
`;

export default Mypage;
