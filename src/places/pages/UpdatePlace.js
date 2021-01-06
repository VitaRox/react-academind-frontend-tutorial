import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/components/util/validators';

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

  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find the place!</h2>
      </div>
    );
  }
  return <form className="place-form">
    <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={() => {}}
      value={identifiedPlace.title}
      valid={true}
    />
    <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH()]}
      errorText="Please enter a valid description (min. 5 characters)."
      onInput={() => {}}
      value={identifiedPlace.description}
      valid={true}
    />
    <Button type="submit" disable={true}>
      UPDATE PLACE
    </Button>
  </form>;
};

export default UpdatePlace;
