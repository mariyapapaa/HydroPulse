import './App.css'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
function App() {
  const [sensorData, setSensorData] = useState({
  tds: '--',
  flow_rate: '--',
  filter_status: 'Connecting...'
})
const chartData = {
  labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
  datasets: [
    {
      label: 'TDS Level (ppm)',
      data: [240, 245, 250, 248, 250],
      borderColor: '#36baff',
      backgroundColor: '#36baff',
      tension: 0.4
    },
    {
  label: 'Water Flow Rate (L/min)',
  data: [1.2, 1.4, 1.5, 1.3, 1.6],
  borderColor: '#38e6a5',
  backgroundColor: '#38e6a5',
  tension: 0.4,
  yAxisID: 'y1'
}
  ]
}

useEffect(() => {
  const fetchSensorData = () => {
    fetch('http://192.168.18.150:5000/api/sensors')
      .then(response => response.json())
      .then(data => setSensorData(data))
      .catch(error => console.log(error))
  }

  fetchSensorData()
  const interval = setInterval(fetchSensorData, 3000)

  return () => clearInterval(interval)
}, [])
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>💧 HydroPulse</h2>
        <p className="menu-title">MAIN MENU</p>
        <nav>
          <a href="#overview" className="active">▦ Dashboard</a>
<a href="#water-quality">◉ Water Quality</a>
<a href="#flow-monitoring">◷ Flow Monitoring</a>
<a href="#filter-health">⚙️ Filter Health</a>
<a href="#maintenance-alerts">♧ Maintenance Alerts</a>
        </nav>
        <div className="sidebar-bottom">
          <p>TEAM NOVA</p>
          <small>Smart Water Intelligence</small>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome to your water monitoring centre</p>
          </div>
          <span className="live">● SYSTEM ONLINE</span>
        </div>

        <section className="welcome">
          <div>
            <h2>Water Intelligence at a Glance</h2>
            <p>Monitor your purifier. Understand its performance.</p>
          </div>
          <span className="water-icon">💧</span>
        </section>

        <h3 className="section-title">LIVE SENSOR READINGS</h3>

        <section className="cards">
          <div className="card">
            <span>💧</span>
            <p>TDS LEVEL</p>
            <h2>{sensorData.tds} <small>ppm</small></h2>
            <small>Demo reading</small>
          </div>

          <div className="card" id="flow-monitoring">
            <span>🌊</span>
            <p>WATER FLOW RATE</p>
            <h2>{sensorData.flow_rate} <small>L/min</small></h2>
            <small>Demo reading</small>
          </div>

          <div className="card">
            <span>🛡️</span>
            <p>FILTER STATUS</p>
            <h2 className="healthy">{sensorData.filter_status}</h2>
            <small>Prototype status</small>
          </div>
        </section>

        <section className="lower-grid">
          <div className="panel" id="water-quality">
            <h3>📊 Water Quality Analytics</h3>
            <p>Sensor history will appear here.</p>
            <div className="chart-placeholder">
              <Line
  data={chartData}
  options={{
    responsive: true,
    scales: {
      y: { position: 'left' },
      y1: {
        position: 'right',
        beginAtZero: true,
        grid: { drawOnChartArea: false }
      }
    }
  }}
/>
            </div>
          </div>

          <div className="panel" id="filter-health">
            <h3>⚙️ Filter Health</h3>
            <div className="health-circle">--</div>
            <p>Filter condition</p>
            <small>Awaiting sensor data</small>
          </div>
        </section>

        <section className="alert-panel" id="maintenance-alerts">
          <h3>🔔 Maintenance Alerts</h3>
          <p>No maintenance warnings yet.</p>
          <small>Alerts will appear when readings meet warning conditions.</small>
        </section>

        <footer>© 2026 HydroPulse | Team Nova</footer>
      </main>
    </div>
  )
}

export default App