import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const PricePerDayComponent = () => {
  const [priceData, setPriceData] = useState([]);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/log/payment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const logs = response.data.logs;
        const grouped = {};

        logs.forEach(log => {
          const snapshot = log.productSnapshot || {};
          const price = Number(snapshot.price) || 0;
          const quantity = Number(snapshot.quantity) || 0;
          const total = price * quantity;

          const date = new Date(log.timestamp);
          if (log.action === 'add') date.setDate(date.getDate() - 7);
          if (log.action === 'delete') date.setDate(date.getDate() - 1);
          const adjustedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          if (!grouped[adjustedDate]) {
            grouped[adjustedDate] = { add: 0, delete: 0 };
          }

          if (log.action === 'add') grouped[adjustedDate].add += total;
          if (log.action === 'delete') grouped[adjustedDate].delete += total;
        });

        const priceArray = Object.keys(grouped).map(date => ({
          date,
          addTotal: grouped[date].add,
          deleteTotal: grouped[date].delete,
          netAmount:grouped[date].add- grouped[date].delete ,
        }));

        setPriceData(priceArray);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || priceData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: priceData.map(item => item.date),
        datasets: [
          {
            type: 'line',
            label: 'Add Total (₹)',
            data: priceData.map(item => item.addTotal),
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            tension: 0.3,
            fill: true,
          },
          {
            type: 'bar',
            label: 'Delete Total (₹)',
            data: priceData.map(item => item.deleteTotal),
            backgroundColor: '#dc3545',
          },
          {
            type: 'bar',
            label: 'Net Amount (₹)',
            data: priceData.map(item => item.netAmount),
            backgroundColor: '#ffc107',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Analytics: Add vs Delete vs Net',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }, [priceData]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontFamily: "'Roboto', sans-serif" }}>
      {/* Improved Title Section */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Price Per Adjusted Day
      </h2>

      {/* Responsive Chart */}
      <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '30px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* Mobile-friendly Card Layout with Iconography */}
      <div style={{ marginTop: '20px' }}>
        {priceData.map((item, idx) => (
          <div
            key={idx}
            className="card mb-3"
            style={{
              borderRadius: '12px',
              border: '1px solid #ddd',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              marginBottom: '30px',
            }}
          >
            <h5
              style={{
                textAlign: 'center',
                marginBottom: '15px',
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#333',
              }}
            >
              {item.date}
            </h5>
            <div className="row">
              <div className="col-12 col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '15px 0',
                  }}
                >
                  <h6
                    className="text-primary"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i> Add
                  </h6>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.addTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor: 'rgba(255, 232, 232, 0.7)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '15px 0',
                  }}
                >
                  <h6
                    className="text-danger"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    <i className="bi bi-dash-circle" style={{ marginRight: '8px' }}></i> Delete
                  </h6>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.deleteTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div
                  className="p-3"
                  style={{
                    backgroundColor: 'rgba(232, 255, 232, 0.7)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '15px 0',
                  }}
                >
                  <h6
                    className="text-success"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    <i className="bi bi-currency-exchange" style={{ marginRight: '8px' }}></i> Net
                  </h6>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.netAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Query for Mobile Devices */}
      <style jsx>{`
        @media (max-width: 576px) {
          h2 {
            font-size: 1.5rem;
            font-weight: 700;
          }
          h5 {
            font-size: 1rem;
            font-weight: 600;
          }
          h6 {
            font-size: 1rem;
            font-weight: 600;
          }
          p {
            font-size: 1rem;
            font-weight: bold;
          }
        }
      `}</style>
    </div>
  );
};

export default PricePerDayComponent;
