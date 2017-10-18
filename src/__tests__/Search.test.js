import React from 'react';
import {shallow,mount} from 'enzyme';
import sinon from 'sinon';
import Search from '../components/Search';

it('renderizou o search', () => {
	shallow(<Search renderLoading={jest.fn()}/>)
});

it('Chamou função de sugestões', () => {
    const test = sinon.spy(Search.prototype, 'componentWillMount');
    shallow(<Search renderLoading={jest.fn()}/>);
    expect(test.calledOnce).toEqual(true);
});
