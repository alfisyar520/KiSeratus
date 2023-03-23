import { useEffect, useState } from 'react';
import { Button, Input, Flex, Modal, ModalOverlay, ModalContent, Box, Spacer } from '@chakra-ui/react';
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
  const [formulas, setFormulas] = useState([])
  const [isOpen, setIsOpen] = useState(false);
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

  function onCalculate(formula) {
    const expression = formula;
    setResult(evaluate(expression.replaceAll(/(sin\(|cos\(|tan\()(\d+)$/g, "$1$2)")));
    setDisplay('0');
  }

  function handleAddFormula() {
    const added = display.replaceAll(/(sin\(|cos\(|tan\()(\d+)$/g, "$1$2)");
    setFormulas((prevFormulas) => ([...prevFormulas, added]))
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
    <>
        <Flex mb={5}>
          <Button onClick={() => setIsOpen(true)}>Tambah Formula</Button>
          <Spacer></Spacer>
          <Flex background="salmon" p={4} direction="column">
              Result: {result}
          </Flex>
        </Flex>
    <Flex gap={2}>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <Flex gap={2} direction="column" align="center" padding={2} borderRadius="md" background="gray.400">
                <FieldFormula display={display} />
                <Calculator
                    handleClear={handleClear}
                    handleInput={handleInput}
                />
                <Button onClick={handleAddFormula}>Tambah Formula</Button>
            </Flex>
          </ModalContent>
        </Modal>
        <Flex gap={2} width="full" direction="column">
          {formulas.map(f => (
            <Flex gap={2}>
              <Input
                value={f}
                disabled
              />
              <Button onClick={() => onCalculate(f)}>Hitung</Button>
            </Flex>
          ))}
          <Flex></Flex>
        </Flex>
    </Flex>
    </>
  );
}

export default Formula;
