import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Book from '../components/Book';
import Rating from '../components/Rating';

const book = {
	id: 'abc',
	title: 'Testesss',
	imageLinks: {
		thumbnail: '"http://books.google.com/books/content?id=WhlQxCss0JIC&printsec=frontcover&img=1&zoom=1&source=gbs_api"'
	},
	shelf: 'read',
	authors: ["Robin Moore"]
}

let BookTeste = null;
it('renderizou o book', () => {
	BookTeste = shallow(<Book book={book} key={book.id} />)
});

it('renderizou o ratings', () => {
	expect(BookTeste.containsAnyMatchingElements([
		<Rating/>
	])).toEqual(true);
});

it('simulando troca de estante', () => {
    const onSelectChange = sinon.spy();
    const wrapper = shallow(<Book book={book} key={book.id} updateBook={onSelectChange} />);
    wrapper.find('select').simulate('change', {target:''});
    expect(onSelectChange.calledOnce).toEqual(true);
});
