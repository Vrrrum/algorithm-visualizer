import React from 'react';

interface ControlsProps {
    sorting: boolean;
    algorithm: string;
    setAlgorithm: (alg: any) => void;
    onGenerate: (size: number) => void;
    onSort: () => void;
    arrayLength: number;
    time: number;
    setTime: (time: number) => void;
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
}) => {
    const [arraySize, setArraySize] = React.useState(10);

    const handleGenerate = () => {
        onGenerate(arraySize);
    };

    return (
        <div className="controls flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
                <label htmlFor="arraySize" className="text-white">Array Size:</label>
                <input
                    id="arraySize"
                    type="number"
                    min="2"
                    max="100"
                    value={arraySize}
                    onChange={(e) => setArraySize(Math.min(100, Math.max(2, parseInt(e.target.value) || 2)))}
                    disabled={sorting}
                    className="w-20 px-2 py-1 rounded text-white"
                />
                <button 
                    onClick={handleGenerate} 
                    disabled={sorting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Generate Array
                </button>

                <select
                    onChange={e => setAlgorithm(e.target.value)}
                    disabled={sorting}
                    value={algorithm}
                    className="px-4 py-2 rounded text-white"
                >
                    <option value="Quicksort">Quicksort</option>
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="Selection Sort">Selection Sort</option>
                    <option value="Merge Sort">Merge Sort</option>
                    <option value="Heap Sort">Heap Sort</option>
                    <option value="Radix Sort">Radix Sort</option>
                </select>
                <button 
                    onClick={onSort} 
                    disabled={sorting || arrayLength === 0}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                    {sorting ? `Sorting... ${(time / 1000).toFixed(2)}s` : 'Sort'}
                </button>
            </div>
        </div>
    );
};

export default Controls;
