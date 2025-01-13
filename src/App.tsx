import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [algorithm, setAlgorithm] = useState<'quicksort' | 'bubblesort' | 'selectionsort'>('quicksort');

    const generateArray = () => {
        const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        setArray(newArray);
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const quickSort = async (arr: number[], left = 0, right = arr.length - 1): Promise<number[]> => {
        if (left >= right) return arr;

        const pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);

        setArray([...arr]);
        return arr;
    };

    const partition = async (arr: number[], left: number, right: number): Promise<number> => {
        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await sleep(300);
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        setArray([...arr]);
        await sleep(300);
        return i;
    };

    const bubbleSort = async (arr: number[]): Promise<number[]> => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await sleep(300);
                }
            }
        }
        return arr;
    };

    const selectionSort = async (arr: number[]): Promise<number[]> => {
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await sleep(300);
            }
        }
        return arr;
    };

    const handleSort = async () => {
        setSorting(true);
        if (algorithm === 'quicksort') {
            await quickSort([...array]);
        } else if (algorithm === 'bubblesort') {
            await bubbleSort([...array]);
        } else if (algorithm === 'selectionsort') {
            await selectionSort([...array]);
        }
        setSorting(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sorting Visualizer</h1>
                <button onClick={generateArray} disabled={sorting}>Generate Array</button>
                <select onChange={(e) => setAlgorithm(e.target.value as 'quicksort' | 'bubblesort' | 'selectionsort')} disabled={sorting}>
                    <option value="quicksort">Quicksort</option>
                    <option value="bubblesort">Bubble Sort</option>
                    <option value="selectionsort">Selection Sort</option>
                </select>
                <button onClick={handleSort} disabled={sorting || array.length === 0}>Sort</button>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            key={idx}
                            className="array-bar"
                            style={{ height: `${value}px` }}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
};

export default App;