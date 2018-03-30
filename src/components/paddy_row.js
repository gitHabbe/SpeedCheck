import React from 'react';

const PaddyRow = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.total_points}</td>
            <td>{props.atr_points}</td>
        </tr>
    );
};

export default PaddyRow;