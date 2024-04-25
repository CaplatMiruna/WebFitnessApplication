import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function User() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/add', {
        name,
        age,
        weight,
        height,
        gender,
        goal,
        activity
      });
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Unknown error');
      }
      setMessage(response.data);
      setName('');
      setAge('');
      setWeight('');
      setHeight('');
      setGender('');
      setGoal('');
      setActivity('');
      navigate('/result', { state: { result: response.data } });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  

  return (
    <div style={{ backgroundImage: "url('backend.png')", backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman, sans-serif', color: '#556B2F', fontSize: '30px' }}>Let's settle this!</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required style={{width: '50px', height: '25px'}}/>
        <br />
        </div>
        <br/>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div> 
          {/* <label>Gender:</label><br/> */}
          <button onClick={() => setGender("F")} style={{
                            backgroundColor: gender === 'F' ? '#ffe4c4' : '#fff',
                            color: gender === 'F' ? '#fff' : '#000',
                            border: 'none'}}>
                           <img src="famale.png" alt="F" width="50" height="50" />
          </button>
          <button onClick={() => setGender("M")} style={{
                            backgroundColor: gender === 'M' ? '#cdf6f6' : '#fff',
                            color: gender === 'M' ? '#fff' : '#000',
                            border: 'none'}}>
                           <img src="male.png" alt="Masculin" width="50" height="50" />
          </button>
        </div>
        <br /></div>

        <div>
        <label style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'rosemary', color: '#6699CC' }}>Goal:</h3>
        </label>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => setGoal("1")} style={{
                        backgroundColor: goal === '1' ? '#FFFFCC' : '#fff',
                        color: goal === '1' ? '#fff' : '#000', marginRight: '20px', border: 'none', fontSize: '20px', borderRadius: goal === '1' ? '30px' : '5px'
                    }}>
                    <img src="./maintenance.png" alt="Maintain" width="60" height="60"/>
                    <h5 style={{fontFamily: 'rosemary', color: 'black'}}> Maintain</h5>
          </button>
          <button onClick={() => setGoal("2")} style={{
                        backgroundColor: goal === '2' ? '#FFCCFF' : '#fff',
                        color: goal === '2' ? '#fff' : '#000', marginRight: '20px', border: 'none', fontSize: '20px', borderRadius: goal === '2' ? '30px' : '5px'
                    }}>
                    <img src="./muscle.png" alt="Gain Muscle" width="60" height="60"/>
                    <h5 style={{fontFamily: 'rosemary', color: 'black'}}> Gain Muscle </h5>
          </button>
          <button onClick={() => setGoal("3")} style={{
                        backgroundColor: goal === '3' ? '#CCFFCC' : '#fff',
                        color: goal === '3' ? '#fff' : '#000', marginRight: '20px', border: 'none', fontSize: '20px', borderRadius: goal === '3' ? '30px' : '5px'
                    }}>
                    <img src="./lose.png" alt="Loss Weight" width="60" height="60"/>
                    <h5 style={{fontFamily: 'rosemary', color: 'black', }}> Loss Weight</h5>
          </button>
        </div>
        </div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}  style={{width: '50px', height: '25px'}}/>
        <br /></div><br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label>Weight:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required style={{width: '50px', height: '25px'}}/>
        <br /></div>


        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label>Height:</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required style={{width: '50px', height: '25px'}} />
        <br /></div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label>Activity Level:</label>
        <select name="activityLevel" value={activity} onChange={(e) => setActivity(e.target.value)} style={{ backgroundColor: 'white' }}>
        <option value="1">Sedentary</option>
        <option value="2">Lightly active</option>
        <option value="3">Moderately active</option>
        <option value="4">Very active</option>
       </select></div>
       <br /><br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
                    <button type="submit" style={{ backgroundColor: 'pink', color: 'black' }}>
                       Go!
                    </button> 
        </div>

      </form>
      <p>{message}</p>
      </div>

    
  );
}
export default User;