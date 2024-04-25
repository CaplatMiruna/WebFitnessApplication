import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar() {
    const paragraphStyle = {
        fontFamily: 'Times New Roman',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: '40px',
    };

    return (
<div>

<nav nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#D1E4DE', height: '40px', paddingTop: '20px', paddingBottom: '20px' }}>
<div className="container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
    <a className="navbar-brand" href="#" style={{ color: '#D1E4DE', fontWeight: 'bold',  fontFamily: 'Times New Roman' }}></a>
    <h style={paragraphStyle}>Everything is possible if you believe in yourself!</h>
    <div style={{ marginLeft: '50px' }}>
    <Link className='btn btn-light' to="/" style={{ color: 'black', textDecoration: 'black', borderRadius: '50px', padding: '10px 20px', margin: '20px 20px', backgroundColor: '#ADD8E6', fontStyle: 'italic',
        fontSize: '20px', }} activeStyle={{ backgroundColor: 'white' }}>Home</Link>
</div>

</div>
</nav>

</div>
    )
}