import React from 'react';

interface ControlsProps {
    sorting: boolean;
    algorithm: string;
    setAlgorithm: (alg: any) => void;
    onGenerate: () => void;
    onSort: () => void;
    arrayLength: number;
    time: number;
}

const Controls: React.FC<ControlsProps> = ({
                                               sorting,
                                               algorithm,
                                               setAlgorithm,
                                               onGenerate,
                                               onSort,
                                               arrayLength,
                                               time,
                                               setTime
                                           }) => (
    <div className="controls">
        <button onClick={onGenerate} disabled={sorting}>Generate Array</button>
        <select
            onChange={e => setAlgorithm(e.target.value)}
            disabled={sorting}
            value={algorithm}
            // className={"text-black"}
        >
            <option className="text-black" value="Quicksort">Quicksort</option>
            <option className="text-black" value="Bubble Sort">Bubble Sort</option>
            <option className="text-black" value="Selection Sort">Selection Sort</option>
            <option className="text-black" value="Merge Sort">Merge Sort</option>
            <option className="text-black" value="Heap Sort">Heap Sort</option>
            <option className="text-black" value="Radix Sort">Radix Sort</option>
        </select>
        <button onClick={onSort} disabled={sorting || arrayLength === 0}>
            {sorting ? `Sorting... ${(time / 1000).toFixed(2)}s` : 'Sort'}
        </button>
    </div>
);

export default Controls;
