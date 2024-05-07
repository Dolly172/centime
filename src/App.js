import './App.css';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Chart from "chart.js/auto";
import SankeyDiagram from './components/SankeyDiagram';
import { CategoryScale } from "chart.js";
import Form from './components/Form';
import { useSelector } from 'react-redux';

Chart.register(CategoryScale);

function App() {

  const { data } = useSelector(state => state.chart);
  const chartSwitch = useSelector(state => state.chart.chartSwitch);
  console.log(chartSwitch);
  return (
    <div className="App">
       <Header/>
       {chartSwitch ? <BarChart /> : <SankeyDiagram />}
       <Form />
    </div>
  );
}

export default App;
