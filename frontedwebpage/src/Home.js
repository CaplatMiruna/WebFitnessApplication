import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {


    const bodyStyle = {
        backgroundImage: 'url("5172066.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        margin: 0,
        overflow: 'hidden',

    };

    const transparentButtonStyle = {
        width: '30%',
        borderRadius: '50px',
        opacity: 0.7,
        backgroundColor: 'transparent',
        border: '0px solid #ffffff',

    };

    const textStyle = {
        fontFamily: 'Times New Roman',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: '30px',
    };

    return (
        <div style={{...bodyStyle, textAlign: 'center', height: '100vh'}}>
            <div className='container' style={{display: 'inline-block', margin: 'auto'}}>
            </div>
            <br/>
            <div>
                <Link to="/user">
                    <button
                        className="favorite styled"
                        type="button"
                        style={transparentButtonStyle}
                    ><img
                        src="./training.png"
                        alt="Favorite Icon"
                        width="350"
                        height="350"
                        style={{marginRight: '5px'}}
                    />
                        <br/>
                        <h style={textStyle}>
                            Press to start!
                        </h>
                    </button>
                </Link>
            </div>
        </div>
    );
}
