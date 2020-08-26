import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../../places/components/PlaceList';

// Create dummy data easily for developing;
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


function UserPlaces(props) {
  const userId = useParams().userId;
  // Means: filter() method looks thru DUMMY_PLACES AND
  // returns a new array containing only those elements of
  // DUMMY_PLACES which matches the condition stated;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return (
    <PlaceList items={loadedPlaces} />
  );

}

export default UserPlaces;
