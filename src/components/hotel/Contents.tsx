import {typographyMap} from '@styles/typography';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

const Contents = ({content}: {content: string;}) => {
  const contents = content
    .split('\n')
    .map((line) => line.trimStart())
    .join('\n');

  return (
    <Container>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </Container>
  );
};

const Container = styled.div`
  margin: 8px 20px 28px;
  padding: 10px 0 0;
  background: #ffffff;
  border-radius: 24px;
  /* box-shadow: 0 5px 10px rgba(28, 25, 23, 0.15); */
  /* border: 1px solid rgba(218, 218, 218, 0.4); */
  color: #1c1917;
  ${typographyMap.t6};

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px 0;
    letter-spacing: -0.03em;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style: disc;
    margin: 6px 0;
  }

  p {
    margin: 18px 0;
    line-height: 1.7;
    color: rgba(28, 25, 23, 0.78);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

export default Contents;
