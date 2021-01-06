import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';

import './PlaceForm.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          // Dynamic assignment: action.inputId will eval to "title", "description", etc.
          // Will only update state of that particular field (input).
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
      default:
        return state;
  }
 };

function NewPlace() {

  // Set initial state
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false // These set validity of individual input values
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false,
      }
    },
    isValid: false  // validity of form as a whole
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);
           /* Leave dependency array empty: prevents infinite loop
              (0 dependencies which it should monitor for changes to rerender)
            */

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);  // Send to backend this data
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description, 5 or more characters in length."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address. "
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewPlace;
