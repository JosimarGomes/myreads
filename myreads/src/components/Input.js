import React from 'react';
import '../App.css';

const Input = (props)=>{
	return(
		<label
			onClick={()=>props.onChangeRating(props.rate)}
			className={props.rate <= props.value ? 'checked' : ''}
			title={props.title}>
		</label>
	)
}

export default Input;
