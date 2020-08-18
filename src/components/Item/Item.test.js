import React from 'react';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Item from './item';

let wrapper;
const data = {
    "code": "AAA",
    "lat": "-17.3595",
    "lon": "-145.494",
    "name": "Anaa Airport",
    "city": "Anaa",
    "state": "Tuamotu-Gambier",
    "country": "French Polynesia",
    "woeid": "12512819",
    "tz": "Pacific\/Midway",
    "phone": "",
    "type": "Airports",
    "email": "",
    "url": "",
    "runway_length": "4921",
    "elev": "7",
    "icao": "NTGA",
    "direct_flights": "2",
    "carriers": "1"
  };
configure({adapter: new Adaptor()});

describe('<Item  data={DATA} onSelect="callback" className = "className" selected = false/>', () => {
    beforeEach(() => {
       wrapper = shallow(<Item/> );
      });

    it('should accept data and will have name , code, and city', () => {
       expect(wrapper.find('div')).toHaveLength(4);
       wrapper.setProps({'data':data});
       expect(wrapper.find('.name').prop('children')).toEqual(data.name);
       expect(wrapper.find('.code').prop('children')).toEqual(data.code);
       expect(wrapper.find('.city').prop('children')).toEqual(data.city);

    } );
    it('should should be clickable and on click icon will be visible', () => {
         wrapper.simulate('click');
         expect(wrapper.find('.checkIcon').prop('data-visible')).toEqual(true);
         wrapper.simulate('click');
         expect(wrapper.find('.checkIcon').prop('data-visible')).toEqual(false);
    } );
});