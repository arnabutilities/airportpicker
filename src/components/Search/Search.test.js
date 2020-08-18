import React from 'react';
import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Search from './Search';

configure({adapter: new Adaptor()});
let wrapper;
describe('<Search totalRecords = {} totalSelection = {}/>', () => {

    beforeEach(() => {
        wrapper = shallow(<Search/> );
    });

    it('should not have total record and total selection section for nodata', () => {
        // testing nodata component
       expect(wrapper.find('input')).toHaveLength(1);
       expect(wrapper.find('totalRecords')).toHaveLength(0);
       expect(wrapper.find('totalSelections')).toHaveLength(0);
    } );
    it('should have total record and total selection section for valid data', () => {

        wrapper.setProps({"totalRecords": 10, "totalSelection": new Array(10)});
        
       expect(wrapper.find('input')).toHaveLength(1);
       expect(wrapper.find('.totalRecords')).toHaveLength(1);
       expect(wrapper.find('.totalSelections')).toHaveLength(1);
    } );
});