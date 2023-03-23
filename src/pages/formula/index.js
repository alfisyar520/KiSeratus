import { useEffect, useState } from 'react';
import { Button, Input, Flex } from '@chakra-ui/react';
import { evaluate } from 'mathjs';

function FieldFormula({ display }) {
    return <Input background="gray.800" color="white" disabled value={display} />
};

function Calculator({ handleInput, handleClear }) {
    return (
        <>
            <Flex gap={2}>
                <Button onClick={() => handleInput('sin(')}>Sin</Button>
                <Button onClick={() => handleInput('cos(')}>Cos</Button>
                <Button onClick={() => handleInput('tan(')}>Tan</Button>
            </Flex>
            <Flex gap={2}>
                <Button onClick={() => handleInput('7')}>7</Button>
                <Button onClick={() => handleInput('8')}>8</Button>
                <Button onClick={() => handleInput('9')}>9</Button>
                <Button onClick={() => handleInput('/')}>/</Button>
            </Flex>
            <Flex gap={2}>
                <Button onClick={() => handleInput('4')}>4</Button>
                <Button onClick={() => handleInput('5')}>5</Button>
                <Button onClick={() => handleInput('6')}>6</Button>
                <Button onClick={() => handleInput('*')}>*</Button>
            </Flex>
            <Flex gap={2}>
                <Button onClick={() => handleInput('1')}>1</Button>
                <Button onClick={() => handleInput('2')}>2</Button>
                <Button onClick={() => handleInput('3')}>3</Button>
                <Button onClick={() => handleInput('-')}>-</Button>
            </Flex>
            <Flex gap={2}>
                <Button onClick={() => handleInput('0')}>0</Button>
                <Button onClick={() => handleInput('.')}>.</Button>
                <Button onClick={() => handleInput('+')}>+</Button>
                <Button onClick={handleClear}>C</Button>
            </Flex>
        </>
    );
}

function Formula() {
  const [display, setDisplay] = useState('0');
  const [result, setResult] = useState('0');

  function handleInput(value) {
    // handle the user input and update the display
    setDisplay(prevDisp => {
      if (prevDisp === '0') {
        return value
      }
      if (['+', '-', '*', '/'].includes(value)) {
        const res = prevDisp.replaceAll(/(sin\(|cos\(|tan\()(\d+)$/g, "$1$2)")
        return `${res}${value}`
      }
      return `${prevDisp}${value}`
    })
  }

  function handleClear() {
    setDisplay('0');
  }

  function onCalculate() {
    const expression = display;
    setResult(evaluate(expression.replaceAll(/(sin\(|cos\(|tan\()(\d+)$/g, "$1$2)")));
    setDisplay('0');
  }

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        onCalculate();
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onCalculate]);

  return (
    <Flex gap={2}>
        <Flex gap={2} direction="column" align="center" padding={2} borderRadius="md" background="gray.400">
            <FieldFormula display={display} />
            <Calculator
                handleClear={handleClear}
                handleInput={handleInput}
            />
        </Flex>
        <Flex direction="column">
            Result: {result}
            <Button onClick={onCalculate}>Hitung!</Button>
        </Flex>
    </Flex>
  );
}

export default Formula;
