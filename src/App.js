import './App.css';
import Login from './Login'
import ParentComponent from './ParentComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/>
        <ParentComponent/>
      </header>
    </div>
  );
}

export default App;
