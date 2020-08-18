import React from 'react';
import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Picker from './Picker';
import Card from '../Card';
import Items from '../Items';

configure({adapter: new Adaptor()});
let wrapper;

describe('<Picker/>', () => {

    beforeEach(() => {
        wrapper = shallow(<Picker/> );
       });


    it('Initially only button will be available', () => {
        // testing nodata component
       expect(wrapper.find(Card)).toHaveLength(0);
       expect(wrapper.find('button')).toHaveLength(1);
    } );

    it('should show card once button is clicked', () => {
        wrapper.find('button').simulate('click');
        expect(wrapper.find(Card)).toHaveLength(1);
        expect(wrapper.find(Items)).toHaveLength(1);
   } );
});