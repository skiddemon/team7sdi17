import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import {Card} from 'flowbite-react'
import {Line} from 'react-chartjs-2'
import{Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend
)

export default function DataView(){
  const [metrics, setMetrics] = useState([])
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const userid = Cookies.get('userId')
  const token = Cookies.get('token')

  const retrieveTests = () => {
    fetch(`http://localhost:8080/ptTests/${userid}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
  .then(res => res.json())
  .then(data => {console.log(data); setTests(data)})
  .then(() => setLoading(false))
  }

  useEffect(() => {
    fetch(`http://localhost:8080/metrics/${userid}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
  .then(res => res.json())
  .then(data => {console.log(data); setMetrics(data)})
  .then(() => retrieveTests())
  }, [])

  const MetricsLineGraph = () => {
    if (metrics.length === 0) {
      return <p>No data available</p>;
    }

    const dates = metrics.map((e) => e.log_date);
    const bodyFat = metrics.map((e) => e.body_fat);
    const data = {
      labels: dates,
      datasets: [
        {
          label:'Body Fat',
          data: bodyFat,
          backgroundColor: 'aqua',
          borderColor: 'black',
          pointBorderColor: 'aqua',
          fill: false,
          tension: 0.4,
        },
      ],
    };
    const options = {
      plugins: {
        legend: true,
      },
      scales: {
        y: {
          min: 0,
          max: 40,
        },
      },
    };
    return (
        <Line data={data} options={options} />
    );
  };

  const TestsLineGraph = () => {
    if (tests.length === 0) {
      return <p>No data available</p>;
    }

    const dates = tests.map((e) => e.test_date);
    const scores = tests.map((e) => e.score);
    console.log(scores)
    const data = {
      labels: dates,
      datasets: [
        {
          label:'Pt Scores',
          data: scores,
          backgroundColor: 'aqua',
          borderColor: 'black',
          pointBorderColor: 'aqua',
          fill: false,
          tension: 0.4,
        },
      ],
    };
    const options = {
      plugins: {
        legend: true,
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    };
    return (
        <Line data={data} options={options} />
    );
  };


  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col gap-10">
    <Card className="w-1/2 ml-5">
      <MetricsLineGraph />
    </Card>
    <Card className="w-1/2 ml-5">
      <TestsLineGraph />
    </Card>
    </div>
  )
}