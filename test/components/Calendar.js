/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/calendar/Calendar';

describe('Calendar', () => {
  let calendar;

  beforeEach(() => {
    calendar = createComponent(Calendar);
  });

  it('should have its component name as default className', () => {
    
  });
});
