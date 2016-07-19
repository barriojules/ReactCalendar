import React from 'react';
import moment from 'moment';
require('./calendar.less');

import classNamesUtil from './../../utils/classnames';
import safeInvocateUtil from './../../utils/safeinvocate'
import languages from './languages.js';

class ReactCalendar extends React.Component {

  constructor() {
    super();
    this.state = {open: false, activeDate: new Date()};
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.open = this.open.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.generateDays = this.generateDays.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }
  handleClickOutside(e) {
    if (!this.Calendar.contains(e.target)) {
      // If the target of the click was made on an that doesn't contain our calendar, close the calendar.
      this.close();
    }
  }
  render() {
    var titleFormat = this.props.titleFormat || 'MMM, YYYY';
    return (
        <div onClick={ this.handleClickInside } className='react-calendar'>
        <input placeholder={ this.props.placeholder } type="text" value={ this.state.hasValue ? moment(this.state.selectedDate).format(this.props.format) : '' } onClick={ this.open } />
          <div ref={ (ref) => this.Calendar = ref } className={'react-calendar__body' + ( this.state.open ? ' open' : '') }>
            <div className="react-calendar__body__title">
              <a href="javascript:;" onClick={ () => this.changeMonth(-1) }>Previous</a>
              <span>{ moment( this.state.activeDate ).format( titleFormat ) }</span>
              <a href="javascript:;" onClick={ () => this.changeMonth(1) }>Next</a>
            </div>
            <div className="react-calendar__body__dates">
              <div className="react-calendar__body__dates__labels">
                { this.generateLabels() }
              </div>
              { this.generateDays() }
            </div>
          </div>
        </div>
    );
  }
  open() {
    this.setState({open: true, activeDate: this.state.selectedDate ? this.state.selectedDate : new Date()});
  }
  close() {
    this.setState({open: false});
  }
  changeMonth(modifier) {
    var modifiedDate = this.modifyDate( this.state.activeDate, modifier );
    this.setState({activeDate: modifiedDate});
  }
  modifyDate(baseDate, monthModifier = 0, yearModifier = 0) {
    var ret = new Date(baseDate);
    ret.setMonth( ret.getMonth() + monthModifier );
    ret.setFullYear( ret.getFullYear() + yearModifier );
    return ret;
  }
  getAvailableDates(baseDate = new Date() ) {
    var copyDate = new Date(baseDate);
    var ret = [];
    copyDate.setDate(1);
    while ( copyDate.getMonth() === baseDate.getMonth() ) {
      ret.push( new Date(copyDate) );
      copyDate.setDate( copyDate.getDate() + 1 );
    }
    return ret;
  }
  generateLabels() {
    var ret = [];
    for (var key in languages[this.props.lang]) {
      ret.push(<span key={ languages[this.props.lang][key] }> { languages[this.props.lang][key] } </span>);
    }
    return ret;
  }
  generateDays() {
    var datesArray = this.getAvailableDates(this.state.activeDate);
    var availableDates = datesArray.map(function(date) {
      return (
        <span key={date} onClick={ () => this.selectDate(date) } className={ classNamesUtil({ 'active': ( date.toString() === ( this.state.selectedDate && this.state.selectedDate.toString() ) ), 'today': moment(date).diff(moment(),'minutes') === 0 }) }> { date.getDate() } </span>
      );
    }.bind(this));

    var startingDay = +moment(datesArray[0]).day();

    for (var a = 1; a < startingDay; a++ ) {
      var day = new Date(datesArray[0]);
      day.setDate( day.getDate() - a );
      availableDates.unshift(<span disabled key={a}>{ day.getDate() }</span>);
    }

    while (availableDates.length % 7 > 0) {
      var day = new Date(availableDates[availableDates.length - 1].key);
      day.setDate( day.getDate() + 1 );
      availableDates.push(<span disabled key={ day }>{ day.getDate() }</span>);
    }

    return availableDates;
  }
  selectDate(date) {
    this.setState({selectedDate: date, hasValue: true});
    safeInvocateUtil(this.props.onChange, date);
  }
}

ReactCalendar.defaultProps = {
  titleFormat: 'MMM, YYYY',
  placeholder: 'Enter a date',
  format: 'YYYY/M/D',
  lang: 'en'
};

export default ReactCalendar;
