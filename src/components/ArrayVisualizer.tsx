import React from 'react';

interface ArrayVisualizerProps {
    array: number[];
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array }) => (
    <div className="array-container">
        {array.map((value, idx) => (
            <div
                key={idx}
                className="array-bar"
                style={{ height: `${value*4}px`, width: `${70/array.length}vw` }}
            >
                {value}
            </div>
        ))}
    </div>
);

export default ArrayVisualizer;
