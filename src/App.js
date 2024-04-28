import './App.css';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Form from './components/Form';

Chart.register(CategoryScale);

function App() {
  return (
    <div className="App">
       <Header />
       <BarChart />
       <Form />
    </div>
  );
}

export default App;
