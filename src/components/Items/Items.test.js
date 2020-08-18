import React from 'react';
import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import Items from './items';
import Paging from '../Paging/Paging';
import Item from '../Item/item';

let wrapper;
const data =[ {
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
  }];
configure({adapter: new Adaptor()});

describe('<Items itemList = {} selectedItems = [] onChangeSelection={callBack} />', () => {
    beforeEach(() => {
        wrapper = shallow(<Items/> );
    });

    it('should have paging', () => {
        // testing nodata component
       expect(wrapper.find(Paging)).toHaveLength(1);
    } );

    it('should have list of item based on itemList', () => {
        wrapper.setProps({'itemList':data});
       expect(wrapper.find(Paging).prop("totalRecord")).toEqual(data.length);
    } );
});