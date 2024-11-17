import React from 'react';

const Title = ({ text }) => {
  return (
    <div style={{
        fontSize: '30px',
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    }}>{text}</div>
  );
};

export default Title;