import './App.css'
import { LinkSearch } from './components/LinkSearch';
import { CoordinatesSearch } from './components/CoordinatesSearch';
import { useSearchParams } from 'react-router';

enum SearchType {
  COORDINATES = 'coordinates',
  LINK = 'link',
};

const App = () => {
  const [searchParams] = useSearchParams();
  const searchType =
    searchParams.get('type') === SearchType.COORDINATES
      ? SearchType.COORDINATES
      : SearchType.LINK;

  return (
    <>
      {searchType === SearchType.COORDINATES ? <CoordinatesSearch /> : <LinkSearch />}
      {/* TODO: Add result */}
      {/* {mapcodeResult && coordinates && <Result coordinates={coordinates} mapcode={mapcodeResult} />} */}
    </>
  )
};

export default App;
