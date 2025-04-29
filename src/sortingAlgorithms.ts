export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function quickSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300,
    left = 0,
    right = arr.length - 1
): Promise<number[]> {
    if (left >= right) {
        setSortedIndices((prev) => [...prev, left]);
        return arr;
    }
    const pivotIndex = await partition(arr, setArray, setComparingIndices, sleepTime, left, right);
    setSortedIndices((prev) => [...prev, pivotIndex]);
    await quickSort(arr, setArray, setComparingIndices, setSortedIndices, sleepTime, left, pivotIndex - 1);
    await quickSort(arr, setArray, setComparingIndices, setSortedIndices, sleepTime, pivotIndex + 1, right);
    setArray([...arr]);
    return arr;
}

async function partition(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    sleepTime: number,
    left: number,
    right: number
): Promise<number> {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        setComparingIndices([j, right]);
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setArray([...arr]);
            await sleep(sleepTime);
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    setArray([...arr]);
    await sleep(sleepTime);
    return i;
}

export async function bubbleSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300
): Promise<number[]> {
    const sortedIndices: number[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            setComparingIndices([j, j + 1]);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setArray([...arr]);
                await sleep(sleepTime);
            }
        }
        sortedIndices.push(arr.length - i - 1);
        setSortedIndices([...sortedIndices]);
    }
    sortedIndices.push(0);
    setSortedIndices([...sortedIndices]);
    setComparingIndices([]);
    return arr;
}

export async function selectionSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300
): Promise<number[]> {
    const sortedIndices: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            setComparingIndices([minIndex, j]);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            await sleep(sleepTime);
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            setArray([...arr]);
            await sleep(sleepTime);
        }
        sortedIndices.push(i);
        setSortedIndices([...sortedIndices]);
    }
    setComparingIndices([]);
    return arr;
}

export async function mergeSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300
): Promise<number[]> {
    const merge = async (left: number[], right: number[], leftStart: number): Promise<number[]> => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            setComparingIndices([leftStart + leftIndex, leftStart + left.length + rightIndex]);
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
            await sleep(sleepTime);
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = await mergeSort(left, setArray, setComparingIndices, setSortedIndices, sleepTime);
    const sortedRight = await mergeSort(right, setArray, setComparingIndices, setSortedIndices, sleepTime);

    const merged = await merge(sortedLeft, sortedRight, arr.length - left.length - right.length);
    setArray([...merged]);
    await sleep(sleepTime);

    return merged;
}

export async function heapSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300
): Promise<number[]> {
    const n = arr.length;
    const sortedIndices: number[] = [];

    const heapify = async (n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) setComparingIndices([i, left]);
        if (left < n && arr[left] > arr[largest]) largest = left;

        if (right < n) setComparingIndices([i, right]);
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await sleep(sleepTime);
            await heapify(n, largest);
        }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        sortedIndices.push(i);
        setSortedIndices([...sortedIndices]);
        setArray([...arr]);
        await sleep(sleepTime);
        await heapify(i, 0);
    }
    sortedIndices.push(0);
    setSortedIndices([...sortedIndices]);
    setComparingIndices([]);
    return arr;
}

export async function radixSort(
    arr: number[],
    setArray: (arr: number[]) => void,
    setComparingIndices: (indices: number[]) => void,
    setSortedIndices: (indices: number[]) => void,
    sleepTime = 300
): Promise<number[]> {
    const getMax = (arr: number[]) => Math.max(...arr);
    const getDigit = (num: number, place: number) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    const digitCount = (num: number) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

    const maxDigits = digitCount(getMax(arr));

    for (let k = 0; k < maxDigits; k++) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < arr.length; i++) {
            const digit = getDigit(arr[i], k);
            setComparingIndices([i]);
            buckets[digit].push(arr[i]);
            await sleep(sleepTime);
        }

        arr = buckets.flat();
        setArray([...arr]);
        await sleep(sleepTime);
    }

    setSortedIndices([...Array(arr.length).keys()]);
    setComparingIndices([]);
    return arr;
}

