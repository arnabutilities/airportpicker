import React from 'react';
import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Card from './Card';

configure({adapter: new Adaptor()});

describe('<Card />', () => {
    it('should accept data and will have name , code, and city', () => {
      // testing nodata component
       const wrapper = shallow(<Card/>);
       expect(wrapper.find('div')).toHaveLength(1);
    } );
});