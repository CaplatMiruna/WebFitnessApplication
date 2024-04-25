import React from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'primereact/chart';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result;

  console.log(result);

  const bmi = result?.bmi || '';
  const bmr = result?.bmr || '';
  const protein = result?.protein || '';
  const carbs = result?.carbs || '';
  const fat = result?.fat || '';

  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [protein , carbs, fat],
        backgroundColor: ['#66FFCC', '#FF9999', '#FFCC99'],
        hoverBackgroundColor: ['#66FFCC', '#FF9999', '#FFCC99'],
        
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: 'black'
            }
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed && context.parsed.y !== null) {
                        const index = context.dataIndex;
                        const value = data.datasets[0].data[index];

                        label += value + 'g';
                    }
                    return label;
                }
            }
        }
    }
};

  return (
    <div style={{ backgroundImage: "url('backend.png')", backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="centered-div">
        <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman, sans-serif', color: '#556B2F', fontSize: '30px'}}>Results</h2>
        <h2 style={{ textAlign: '', fontFamily: 'Calibri, sans-serif', fontSize: '20px', fontWeight: 'normal' }}>BMI: {bmi}</h2>
        <img src="meter.png" alt="Descriere a imaginii" style={{ width: '330px', height: '170px' }}/>
        <br/>
        <h2 style={{ textAlign: '', fontFamily: 'Calibri, sans-serif', fontSize: '20px', fontWeight: 'normal' }}>BMR: {bmr} kcal</h2>
        <p style={{ color: '#FF6666', fontFamily: 'Arial', fontSize: '20px' }}>Macronutrients</p>
        <Chart type="pie" data={data} options={chartOptions} style={{ width: '350px', height: '250px' }} />
      </div>
    </div>
  );
};

export default Result;
