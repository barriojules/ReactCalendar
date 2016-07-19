require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';

import ReactCalendar from './calendar/calendar';

class AppComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="index">
        <ReactCalendar lang="en" format="D/M/YYYY" />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
