import React from 'react';
import {shallow} from 'enzyme';
import Shelf from '../components/Shelf';

it('renderizou a estante', () => {
	shallow(<Shelf renderLoading={jest.fn()}/>)
});
