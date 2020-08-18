import React from 'react';
import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Paging from '../Paging/Paging';

configure({adapter: new Adaptor()});
let wrapper;

describe('<Paging  totalRecord={} recordPerPage={} initialIndex={} onPageChange={}/>', () => {

    beforeEach(() => {
        wrapper = shallow(<Paging/> );
    });

    it('should not have previous and next button for nodata', () => {
        // testing nodata component
       expect(wrapper.find('.prev')).toHaveLength(0);
       expect(wrapper.find('.next')).toHaveLength(0);
    } );

    it('should have previous and next button for data', () => {
        // testing nodata component
        wrapper.setProps({totalRecord: 10, recordPerPage: 5, initialIndex: 0});
       expect(wrapper.find('.prev')).toHaveLength(1);
       expect(wrapper.find('.next')).toHaveLength(1);
    } );
});