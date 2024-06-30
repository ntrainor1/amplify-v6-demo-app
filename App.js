// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import StorageComponent from './StorageComponent';
import { ConsoleLogger } from 'aws-amplify/utils';
ConsoleLogger.LOG_LEVEL = 'DEBUG';

function App() {
  return (
    <div className="App">
      <h1>Amplify Storage File Upload and Download Demo</h1>
      <StorageComponent />
    </div>
  );
}
export default App;
