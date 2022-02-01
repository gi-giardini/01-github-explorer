import { useState } from 'react';

export function Counter(){
    const [counter, setCounter] = useState(0);
    
    function increment() {
        setCounter(counter + 1);
    }

    function decrement() {
        setCounter(counter - 1);
    }
    
    return (
        <div>
            <h2>{counter}</h2>
            <ul>
                <button type="button" onClick={increment}>
                    Somar
                </button>
                <button type="button" onClick={decrement}>
                    Subtrair
                </button>
            </ul>
        </div>
    );
}