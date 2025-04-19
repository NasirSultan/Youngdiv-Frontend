import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'; // Import Lucide icons

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

          const dateStr = date.toISOString().split('T')[0]; // yyyy-mm-dd
          if (!grouped[dateStr]) {
            grouped[dateStr] = { add: 0, delete: 0 };
          }

          if (log.action === 'add') grouped[dateStr].add += total;
          if (log.action === 'delete') grouped[dateStr].delete += total;
        });

        // Get this week's Monday to Saturday
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday
        const monday = new Date(now);
        monday.setDate(now.getDate() - ((currentDay + 6) % 7)); // Move to Monday

        const weekDates = Array.from({ length: 6 }).map((_, i) => {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          return d;
        });

        const priceArray = weekDates.map(date => {
          const dateStr = date.toISOString().split('T')[0];
          const display = `${date.toLocaleDateString('en-US', {
            weekday: 'long',
          })} - ${date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}`;

          const data = grouped[dateStr] || { add: 0, delete: 0 };
          return {
            date: display,
            addTotal: data.add,
            deleteTotal: data.delete,
            netAmount: data.add - data.delete,
            rawDate: dateStr, // Store raw date for sorting
          };
        });

        // Sort priceArray by the most recent date first
        const sortedData = priceArray.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

        setPriceData(sortedData);
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

  const getRowStyle = (date) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format
    return date === currentDate ? { backgroundColor: '#e3f2fd' } : {};
  };

  return (
    <div className='mt-5 pt-4 my-5 ' style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontFamily: "'Roboto', sans-serif" }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Payment Analytics
      </h2>

      <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '30px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>

      <div style={{ marginTop: '20px' }}>
        {priceData.map((item, idx) => (
          <div
            key={idx}
            className="card mb-3"
            style={{
              borderRadius: '12px',
              border: '1px solid #ddd',
              padding: '7px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              marginBottom: '30px',
              ...getRowStyle(item.rawDate), // Apply style for today's row
            }}
          >
            <h5
              style={{
                textAlign: 'center',
                marginBottom: '5px',
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#333',
              }}
            >
              {item.date}
            </h5>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="col-12 col-md-4">
                <div
                  className="p-2"
                  style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '10px 0',
                  }}
                >
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowUpCircle style={{ marginRight: '8px', fontWeight: 'bold', color: '#0d6efd' }} /> ₹{item.addTotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div
                  className="p-2"
                  style={{
                    backgroundColor: 'rgba(255, 232, 232, 0.7)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '10px 0',
                  }}
                >
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowDownCircle style={{ marginRight: '8px', fontWeight: 'bold', color: '#dc3545' }} /> ₹{item.deleteTotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div
                  className="p-2"
                  style={{
                    backgroundColor: 'rgba(232, 255, 232, 0.7)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginBottom: '15px',
                    padding: '10px 0',
                  }}
                >
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.netAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
