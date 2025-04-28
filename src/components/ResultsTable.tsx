import React from 'react';

type Result = {
    algorithm: string;
    time: number;
    timestamp: string;
};

const ResultsTable: React.FC<{ results: Result[] }> = ({ results }) => (
    <div className="results-table">
        <h3>Historia sortowań</h3>
        <table className="table-auto">
            <thead>
            <tr>
                <th>Algorytm</th>
                <th>Czas (ms)</th>
                <th>Data</th>
            </tr>
            </thead>


            <tbody>
            {results.map((result, index) => (
                <tr>
                    <td className="break-before-column">{result.algorithm}</td>
                    <td>{result.time.toFixed(2)}</td>
                    <td>{result.timestamp}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default ResultsTable;
