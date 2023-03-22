import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  VStack,
  HStack,
  Box
} from "@chakra-ui/react";

const inputTypes = ["text", "number", "date"];
const typeNumber = ["integer", "float", "positive", "negative"]

function FormConfiguration() {
  const [inputs, setInputs] = useState([
    { label: "", type: inputTypes[0] },
  ]);


  const handleAddInput = () => {
    setInputs([...inputs, { label: "", type: inputTypes[0] }]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleLabelChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].label = value;
    setInputs(newInputs);
  };

  const handleTypeChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].type = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // do something with the form configuration data
    localStorage.setItem("result", JSON.stringify(inputs))
  };

  // console.log("input types", inputs.type)

  return (
    <VStack spacing="4">
      {inputs.map((input, index) => (
        <HStack key={index} spacing="4">
         
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={input.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
            >
              {inputTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Label</FormLabel>
            <Input
              type={input.type}
              value={input.label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
            />

            <Box>
              {input.type === "number" ? (
                <Select
                value={input.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
              >
                {typeNumber.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              ) : null}
            </Box>
          </FormControl>

          <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
        </HStack>
      ))}
      <Button onClick={handleAddInput}>Add New form Type</Button>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </VStack>
  );
}

export default FormConfiguration;
