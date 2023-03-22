import logo from './logo.svg';
import './App.css';
import { Box, Container } from '@chakra-ui/react'
import PreviewPage from './containers/fomConfig';
import FormConfiguration from './components/fomrUnik';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Box>this is chakra</Box>
      <FormConfiguration />
      <PreviewPage />
    </div>
  );
}

export default App;
