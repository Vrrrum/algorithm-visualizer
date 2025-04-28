import React, { useState } from 'react';
import './App.css';
import ArrayVisualizer from './components/ArrayVisualizer';
import Controls from './components/Controls';
import ResultsTable from './components/ResultsTable';
import AlgorithmInfo from './components/AlgorithmInfo';
import {
    quickSort,
    bubbleSort,
    selectionSort,
    mergeSort,
    heapSort,
    radixSort
} from './sortingAlgorithms';

type Result = {
    algorithm: string;
    time: number;
    timestamp: string;
};

const App: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [algorithm, setAlgorithm] = useState<'Quicksort' | 'Bubble Sort' | 'Selection Sort' | 'Merge Sort' | 'Heap Sort' | 'Radix Sort'>('Quicksort');
    // @ts-ignore
    const [time, setTime] = useState<number>(0);
    const [results, setResults] = useState<Result[]>([]);

    const generateArray = () => {
            const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
    };

    // const handleSort = async () => {
    //     setSorting(true);
    //
    //     const interval = setInterval(() => {
    //         setTime(performance.now() - startTime);
    //     }, 100);
    //
    //     const startTime = performance.now();
    //     if (algorithm === 'Quicksort') {
    //         await quickSort([...array], setArray);
    //     } else if (algorithm === 'Bubble Sort') {
    //         await bubbleSort([...array], setArray);
    //     } else if (algorithm === 'Selection Sort') {
    //         await selectionSort([...array], setArray);
    //     } else if (algorithm === 'Merge Sort') {
    //         await mergeSort([...array], setArray);
    //     } else if (algorithm === 'Heap Sort') {
    //         await heapSort([...array], setArray);
    //     } else if (algorithm === 'Radix Sort') {
    //     await radixSort([...array], setArray);
    // }

    //     const endTime = performance.now();
    //
    //     setResults(prev => [...prev, { algorithm, time: endTime - startTime, timestamp: new Date().toLocaleString() }]);
    //     setSorting(false);
    // };
    const handleSort = async () => {
        setSorting(true);

        const startTime = performance.now();
        const interval = setInterval(() => {
            setTime(performance.now() - startTime);
        }, 100);

        try {
            if (algorithm === 'Quicksort') {
                await quickSort([...array], setArray);
            } else if (algorithm === 'Bubble Sort') {
                await bubbleSort([...array], setArray);
            } else if (algorithm === 'Selection Sort') {
                await selectionSort([...array], setArray);
            } else if (algorithm === 'Merge Sort') {
                await mergeSort([...array], setArray);
            } else if (algorithm === 'Heap Sort') {
                await heapSort([...array], setArray);
            } else if (algorithm === 'Radix Sort') {
                await radixSort([...array], setArray);
            }
        } finally {
            clearInterval(interval);
            setResults(prev => [...prev, { algorithm, time: time, timestamp: new Date().toLocaleString() }]);
            setSorting(false);
        }
    };

    return (
        <div className="App flex flex-col min-h-full justify-center min-w-full">
                <h1 className="text-2xl mt-8">Wizualizator sortowania</h1>
                <Controls
                    sorting={sorting}
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    onGenerate={generateArray}
                    onSort={handleSort}
                    arrayLength={array.length}
                    time={time}
                    setTime={setTime}
                />
                <ArrayVisualizer array={array} />
                <ResultsTable results={results} />
                {algorithm && (
                    <AlgorithmInfo algorithmName={algorithm} />
                )}
        </div>
    );
};

export default App;
