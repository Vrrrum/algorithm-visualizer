import React from 'react';

interface ArrayVisualizerProps {
    array: number[];
    comparingIndices?: number[];
    sortedIndices?: number[];
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, comparingIndices = [], sortedIndices = [] }) => (
    <div className="array-container">
        {array.map((value, idx) => {
            let backgroundColor = 'teal'; // Default color for unsorted columns
            if (sortedIndices.includes(idx)) {
                backgroundColor = '#4CAF50'; // Green for sorted columns
            } else if (comparingIndices.includes(idx)) {
                backgroundColor = '#FF5722'; // Orange for columns being compared
            }
            
            return (
                <div
                    key={idx}
                    className="array-bar"
                    style={{ 
                        height: `${value*4}px`, 
                        width: `${70/array.length}vw`,
                        backgroundColor
                    }}
                >
                    {value}
                </div>
            );
        })}
    </div>
);

export default ArrayVisualizer;
