import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentSeven from './PaymentSeven';
const TotalPricePieChart = () => {
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [addTotalPrice, setAddTotalPrice] = useState(0);
  const [deleteTotalPrice, setDeleteTotalPrice] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // State to track screen size (whether it's a large screen)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992); 

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No authentication token found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/log/payment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const logs = response.data.logs;

        const addLogs = logs.filter(log => log.action === 'add');
        const deleteLogs = logs.filter(log => log.action === 'delete');

        const addTotal = addLogs.reduce((acc, log) => {
          const { price, quantity } = log.productSnapshot;
          if (price && quantity) acc += price * quantity;
          return acc;
        }, 0);

        const deleteTotal = deleteLogs.reduce((acc, log) => {
          const { price, quantity } = log.productSnapshot;
          if (price && quantity) acc += price * quantity;
          return acc;
        }, 0);

        const net =  addTotal - deleteTotal ;

        setAddTotalPrice(addTotal);
        setDeleteTotalPrice(deleteTotal);
        setNetAmount(net);

        const addQuantity = addLogs.reduce((acc, log) => acc + (log.productSnapshot.quantity || 0), 0);
        const deleteQuantity = deleteLogs.reduce((acc, log) => acc + (log.productSnapshot.quantity || 0), 0);

        const data = {
          labels: ['Add Quantity', 'Delete Quantity'],
          datasets: [
            {
              data: [addQuantity, deleteQuantity],
              backgroundColor: ['#0d6efd', '#dc3545'],
              hoverOffset: 4,
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Product Quantity Distribution',
              font: {
                size: 18,
              },
              color: '#343a40',
            },
            legend: {
              position: 'bottom',
              labels: {
                color: '#495057',
              },
            },
          },
        };

        if (chartInstance) chartInstance.destroy();

        const newChart = new Chart(canvasRef.current, {
          type: 'pie',
          data,
          options,
        });

        setChartInstance(newChart);
      } catch (error) {
        console.error('Error fetching or displaying chart:', error);
      }
    };

    fetchDataAndRenderChart();

    // Handle window resize to toggle large screen
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance) chartInstance.destroy();
    };
  }, []);

  const formatINR = amount =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  const handleBack = () => {
    window.history.back();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bg-light mt-5 pt-4">
    <div className="row w-100 px-3 py-4 gy-4 gx-lg-5 d-flex justify-content-center align-items-center flex-column flex-lg-row">
  
      {/* Pie Chart Column */}
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        <div className="bg-white shadow p-4 rounded-4 w-100" style={{ maxWidth: '400px' }}>
          <canvas
            id="v34subtitle"
            ref={canvasRef}
            height="200"
            width="300"
            aria-label="Pie chart"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
  
      {/* Price Boxes Column */}
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div
            className="p-3 shadow-sm rounded-4 mb-4 text-center bg-primary-subtle"
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            <h5 className="fw-bold text-primary mb-1">Add amount</h5>
            <p className="mb-0 fs-5">{formatINR(addTotalPrice)}</p>
          </div>
          <div
            className="p-3 shadow-sm rounded-4 mb-4 text-center"
            style={{ backgroundColor: '#ffe8e8', color: 'black', fontWeight: 'bold' }}
          >
            <h5 className="fw-bold text-danger mb-1">Delete amount</h5>
            <p className="mb-0 fs-5">{formatINR(deleteTotalPrice)}</p>
          </div>
          <div
            className="p-3 shadow-sm rounded-4 text-center"
            style={{ backgroundColor: '#e8ffe8', color: 'black', fontWeight: 'bold' }}
          >
            <h5 className="fw-bold text-success mb-1">Net Amount</h5>
            <p className="mb-0 fs-5">{formatINR(netAmount)}</p>
          </div>
        </div>
      </div>
  
    </div>
  </div>
  
  );
};

export default TotalPricePieChart;
