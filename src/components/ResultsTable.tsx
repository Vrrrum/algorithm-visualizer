import React from 'react';
import { Result } from '../App';

// type Result = {
//     algorithm: string;
//     time: number;
//     length: string;
// };

const ResultsTable: React.FC<{ results: Result[] }> = ({ results }) => (
    <div className="results-table">
        <h2 className="text-4xl font-bold mt-30">Historia sortowań</h2>
        <table className="bg-gray-950 table-fixed w-90 rounded-lg text-sm text-left rtl:text-right text-gray-500">
            <thead>
            <tr>
                <th scope="col" className="px-6 py-3">Algorytm</th>
                <th scope="col" className="px-6 py-3">Czas (ms)</th>
                <th scope="col" className="px-6 py-3">Liczba elementów</th>
            </tr>
            </thead>
            <tbody>
            {results.map((result) => (
                <tr className="border-b bg-gray-800 border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{result.algorithm}</th>
                    <td className="px-6 py-4">{result.time.toFixed(2)}</td>
                    <td className="px-6 py-4">{result.length}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default ResultsTable;
