import {Hotel} from '@/models/hotel';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import Flex from '../shared/Flex';
import Text from '../shared/Text';
import {css} from '@emotion/react';

function Map({location}: {location: Hotel['location'];}) {
  const {
    directions,
    pointGeolocation: {x, y},
  } = location;

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  if (isLoaded === false) {
    return null;
  }

  return (
    <Flex direction="column" css={containerStyles}>
      <Text typography="t4" bold={true}>
        기본 정보
      </Text>
      <div css={mapWrapStyles}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '250px',
            margin: '0',
            boxSizing: 'border-box',
          }}
          center={{
            lat: y,
            lng: x,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: y,
              lng: x,
            }}
          />
        </GoogleMap>
      </div>
      <Text typography="t6">{directions}</Text>
    </Flex>
  );
}

const containerStyles = css`
  margin: 8px 20px 28px;
  padding: 24px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 5px 10px rgba(28, 25, 23, 0.15);
  border: 1px solid rgba(218, 218, 218, 0.4); 
  gap: 14px;
`;

const mapWrapStyles = css`
  overflow: hidden;
  border-radius: 18px;
`;

export default Map;
