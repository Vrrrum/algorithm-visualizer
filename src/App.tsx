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
import Header from './components/Header';

export type Result = {
    algorithm: string;
    time: number;
    length: number;
};

const App: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [algorithm, setAlgorithm] = useState<'Quicksort' | 'Bubble Sort' | 'Selection Sort' | 'Merge Sort' | 'Heap Sort' | 'Radix Sort'>('Quicksort');
    const [time, setTime] = useState<number>(0);
    const [results, setResults] = useState<Result[]>([]);
    const [comparingIndices, setComparingIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);

    const generateArray = (size: number) => {
        const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
        setComparingIndices([]);
        setSortedIndices([]);
    };

    const handleSort = async () => {
        setSorting(true);
        setComparingIndices([]);
        setSortedIndices([]);

        const startTime = performance.now();
        const interval = setInterval(() => {
            setTime(performance.now() - startTime);
        }, 100);

        try {
            if (algorithm === 'Quicksort') {
                await quickSort([...array], setArray, setComparingIndices, setSortedIndices);
            } else if (algorithm === 'Bubble Sort') {
                await bubbleSort([...array], setArray, setComparingIndices, setSortedIndices);
            } else if (algorithm === 'Selection Sort') {
                await selectionSort([...array], setArray, setComparingIndices, setSortedIndices);
            } else if (algorithm === 'Merge Sort') {
                await mergeSort([...array], setArray, setComparingIndices, setSortedIndices);
            } else if (algorithm === 'Heap Sort') {
                await heapSort([...array], setArray, setComparingIndices, setSortedIndices);
            } else if (algorithm === 'Radix Sort') {
                await radixSort([...array], setArray, setComparingIndices, setSortedIndices);
            }
        } finally {
            clearInterval(interval);
            setResults(prev => [...prev, { algorithm, time: time, length: array.length }]);
            setSorting(false);
            setComparingIndices([]);
        }
    };

    return (
        <div className="App flex flex-col min-h-full justify-center min-w-full">
            <Header />
            <div className="h-full">
                <ArrayVisualizer 
                    array={array} 
                    comparingIndices={comparingIndices}
                    sortedIndices={sortedIndices}
                />
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
            </div>
            <ResultsTable results={results} />
            {algorithm && (
                <AlgorithmInfo algorithmName={algorithm} />
            )}
        </div>
    );
};

export default App;
