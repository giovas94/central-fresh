import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {Home} from '../pages/Home';

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  }
}, Home);
