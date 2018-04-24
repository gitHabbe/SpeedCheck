import React from 'react';

const PaddyRow = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.total_points}</td>
            <td>{props.atr_points}</td>
            <td>{props.car_points}</td>
            <td>{props.hover_points}</td>
            <td>{props.plane_points}</td>
            <td>{props.car_wrs_count}</td>
            <td>{props.hover_wrs_count}</td>
            <td>{props.plane_wrs_count}</td>
            <td>{props.total_wrs_count}</td>
        </tr>
    );
};

export default PaddyRow;