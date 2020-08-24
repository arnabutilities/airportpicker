import React, { Component, createRef } from 'react';
import Card from '../Card';
import classes from './dropdown.css';
import clsx from 'clsx';

var clickEventListener;

class Dropdown extends Component {
    scrollEvent;
    myRef;
    inputRef;
    cardRef;
    myLast;
    state;
    searchedData = [];
    data = [];
    selections = {};
    loadData;
    stateUpdated = false;
    clickEventListener;
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.inputRef = React.createRef();
        this.cardRef = React.createRef();
        this.myLast = React.createRef();
        this.state = {
            componentList: [],
            page: 0,
            pageLength: 6,
            pageTill: 6,
            maxLength: false,
            lastUpdate: "",
            selections: {}
        };
    }

    search() {
        let { value } = this.inputRef.current;
        this.searchedData = this.data.filter((e) => {
            if (e.name.toLowerCase().indexOf(value) === 0) {
                return e;
            } else return false;
        });
        this.setState({
            page: this.state.pageLength,
            componentList: this.searchedData.slice(0, this.state.pageLength),
            maxLength: this.state.pageLength >= this.searchedData.length
        });
    }
    scrollAction(e) {
        let scrollPosition = this.myRef.current.getBoundingClientRect().bottom;
        let loaderPosition = this.myLast.current?.getBoundingClientRect().top;

        console.log('search data: ',this.data.length);

        if(!this.searchedData){
            this.searchedData = [...this.data];
        }

        if (scrollPosition > loaderPosition) {
            this.setState({
                page: this.state.page + this.state.pageLength,
                componentList: this.searchedData.slice(0, this.state.page + this.state.pageLength),
                maxLength: this.state.componentList.length >= this.searchedData.length
            });
        }
    }

    updateSelection(v, i) {
        let selectedAirports = Object.keys(this.selections);
        let type = "";
        if (selectedAirports.indexOf(v.code) == -1) {
            type = "add";
            this.selections[v.code] = v;
        }
        else { type = 'remove'; delete this.selections[v.code]; }
        this.props.onSelection(v, this.selections, type);
        this.setState({selections: this.selections})
    }

    static getDerivedStateFromProps(props, state){
     //   console.log('getDerivedStateFromProps: ', state, props);
        let newState;
        if(state.lastUpdate != props.dataVersion){
            newState = {
                componentList: props.initialData.slice(0, 6),
                page: 0,
                pageLength: 6,
                pageTill: 6,
                maxLength: props.initialData.length <= 6,
                lastUpdate: props.dataVersion,
                selections:props.selections
            }
        }
        return newState || false;
    }
    componentDidUpdate(){
        this.data = this.props.initialData;
        let { value } = this.inputRef.current;
        this.searchedData = this.data.filter((e) => {
            if (e.name.toLowerCase().indexOf(value) === 0) {
                return e;
            } else return false;
        });
    }
    componentDidMount(){
        this.componentDidUpdate();
        this.selections = this.props.selections;
    }

    render() {
        return (
        <div ref={this.cardRef}>
            <Card className={clsx(classes.scrollableContent)}>
                    <input ref={this.inputRef} placeholder="Search by airport name" onKeyUp={(e) => { this.search.bind(this)(e) }} className={clsx(classes.input)} />
                    <div ref={this.myRef} className={clsx(classes.content)} onScroll={(e) => { (this.scrollAction.bind(this))(e) }}>
                        <div className={clsx(classes.overlay)}>
                            <ul className={clsx(classes.ul)}>
                                {this.state.componentList.map((v, i) => {
                                    let selectedAirports = Object.keys(this.state.selections);
                                    if (selectedAirports.indexOf(v.code) == -1) {
                                        return <li className={clsx(classes.li)} onClick={(e) => { (this.updateSelection.bind(this))(v, i); }} key={i}>{v.name}</li>
                                    } else {
                                        return <li className={clsx(classes.li, classes.selectedLi)} onClick={(e) => { (this.updateSelection.bind(this))(v, i); }} key={i}>{v.name}</li>
                                    }
                                })}
                                {this.state.maxLength == false ? <li key="loader" className={clsx(classes.li, classes.loader)} ref={this.myLast}>Loading ..</li> : ''}
                            </ul>
                        </div>
                    </div>
                </Card>
        </div>
        );
    }
}

export default Dropdown;