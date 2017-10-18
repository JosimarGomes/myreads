import React from 'react';
import '../App.css';

const Loader = (props) =>  (
        <div>
            { props.show ?
                 <div className="imgloading"></div>
                  : null
            }
        </div>
    );

export default Loader;
