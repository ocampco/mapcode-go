import './App.css'
import { LinkSearch } from './components/LinkSearch';
import { CoordinatesSearch } from './components/CoordinatesSearch';

const App = () => (
  <>
    <CoordinatesSearch />
    <LinkSearch />
    {/* TODO: Add result */}
    {/* {mapcodeResult && coordinates && <Result coordinates={coordinates} mapcode={mapcodeResult} />} */}
  </>
);

export default App;
