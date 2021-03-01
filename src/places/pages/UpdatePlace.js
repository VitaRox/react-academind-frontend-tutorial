import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empoire State Building',
    description: 'Famousest skyscraper in New York City',
    imageUrl: 'https://www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2020-02/Green%20lights.jpg?itok=nRbtw3hG',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Burj Khalifa',
    description: 'A pretty goddamned big building, eh?',
    imageUrl: 'https://cdn.britannica.com/37/135437-050-A12461CC/Burj-Khalifa-world-Sheikh-Khalifah-ibn-Zayid-2010.jpg',
    address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
    location: {
      lat: 25.197197,
      lng: 55.2721877
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false
    }
  }, false);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  // Here we wrap setFormData in useEffect so it can recall state of OG object
  // and not re-render unnecessarily
  useEffect(() => {
    setFormData({
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true
      }
    },
    true
  );
  setIsLoading(false);
 }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find the place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>L O A D I N G</h2>
      </div>
    );
  }
  return <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialValid={formState.inputs.title.isValid}
    />
    <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH()]}
      errorText="Please enter a valid description (min. 5 characters)."
      onInput={inputHandler}
      initialValue={formState.inputs.description.value}
      initialValid={formState.inputs.description.isValid}
    />
    <Button type="submit" disable={true}>
      UPDATE PLACE
    </Button>
  </form>;
};

export default UpdatePlace;
