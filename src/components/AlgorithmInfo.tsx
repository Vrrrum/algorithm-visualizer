import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AlgorithmInfoProps {
    algorithmName: string;
}

interface AlgorithmInfo {
    name: string;
    description: string;
    implementation: string;
}
const algorithms: AlgorithmInfo[] = [
    {
        name: "Bubble Sort",
        description: "Prosty algorytm sortowania, który wielokrotnie przechodzi przez listę, porównując sąsiednie elementy i zamieniając je miejscami, jeśli są w złej kolejności.",
        implementation: `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
`
    },
    {
        name: "Quicksort",
        description: "Efektywny algorytm sortowania, który dzieli listę na mniejsze podlisty wokół elementu zwanego pivotem.",
        implementation: `
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
`
    },
    {
        name: "Merge Sort",
        description: "Algorytm sortowania dziel i zwyciężaj, który dzieli listę na mniejsze części, sortuje je i łączy w jedną posortowaną listę.",
        implementation: `
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
`
    },
    {
            name: "Radix Sort",
            description: "Algorytm sortowania, który sortuje liczby cyfrowo, zaczynając od najmniej znaczącej cyfry do najbardziej znaczącej.",
            implementation: `
    def radix_sort(arr):
        max_num = max(arr)
        exp = 1
        while max_num // exp > 0:
            counting_sort(arr, exp)
            exp *= 10
    
    def counting_sort(arr, exp):
        n = len(arr)
        output = [0] * n
        count = [0] * 10
    
        for i in range(n):
            index = (arr[i] // exp) % 10
            count[index] += 1
    
        for i in range(1, 10):
            count[i] += count[i - 1]
    
        i = n - 1
        while i >= 0:
            index = (arr[i] // exp) % 10
            output[count[index] - 1] = arr[i]
            count[index] -= 1
            i -= 1
    
        for i in range(n):
            arr[i] = output[i]
    `
        },
        {
            name: "Heap Sort",
            description: "Algorytm sortowania oparty na strukturze danych zwanej kopcem, który iteracyjnie buduje kopiec maksymalny i usuwa największy element.",
            implementation: `
    def heap_sort(arr):
        n = len(arr)
    
        for i in range(n // 2 - 1, -1, -1):
            heapify(arr, n, i)
    
        for i in range(n - 1, 0, -1):
            arr[i], arr[0] = arr[0], arr[i]
            heapify(arr, i, 0)
    
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
    
        if left < n and arr[left] > arr[largest]:
            largest = left
    
        if right < n and arr[right] > arr[largest]:
            largest = right
    
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    `
        },
];


const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({algorithmName}) => {
    const [info, setInfo] = useState<string>('Ładowanie informacji...');
    const [implementation, setImplementation] = useState<string>('');

    useEffect(() => {
        if(!algorithmName || algorithmName === '') {
            return;
        }

        const algorithmInfo = algorithms.find(alg => alg.name.toLowerCase() === algorithmName.toLowerCase());
        if (algorithmInfo) {
            setInfo(algorithmInfo.description);
            setImplementation(algorithmInfo.implementation);
        } else {
            setInfo('Nie znaleziono informacji o tym algorytmie.');
            setImplementation('');
        }
    }, [algorithmName]);

    return (
        <div>
            <h2>Informacje o algorytmie {algorithmName}</h2>
            <div className="algorithm-info flex max-h-screen mt-8">
                <div className="p-4 w-1/2">
                    <h3 className="text-xl text-left">Implementacja:</h3>
                    <SyntaxHighlighter language="python" style={dark}>
                        {implementation}
                    </SyntaxHighlighter>
                </div>
                <div className="p-4 w-1/2">
                    <h3 className="text-xl text-left">Opis:</h3>
                    <p>{info}</p>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmInfo;
