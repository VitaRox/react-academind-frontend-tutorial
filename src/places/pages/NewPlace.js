import React from 'react';

import Input from '../../shared/components/FormElements/Input.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

const NewPlace = () => {

  // Initialize form state;
  const [formState, inputHandler] = useForm({
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
    false  // Sets the validity of the entire form based on validity of its elements
  );

  // This sends our form data to backend
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
};

export default NewPlace;
