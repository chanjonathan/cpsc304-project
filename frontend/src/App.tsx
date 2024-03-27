import './App.css';
import { Delete } from './modules/Delete';
import { Insert } from './modules/Insert';
import { Project } from './modules/Project';
import { Update } from './modules/Update';

const App = () => {
  return (
    <div className="App">
      <Project />      
      <Insert />
      <Update />
      <Delete />
    </div>
  );
}

export default App;
