import { Meteor } from 'meteor/meteor';

import { Products } from '../products';

Meteor.publish('catalogue', function(searchQuery, filterQuery) {
  // if(!this.userId) {
  //   return this.ready();
  // }

  return Products.find(
    {
      name: {
        $regex: searchQuery, $options: 'i'
      },
      category: {$regex: filterQuery, $options: 'i'},
      productStatus: {
        $nin: ['agotado', 'fuera-temporada']
      }
    },
    {
      fields: {
        name: 1,
        currentPrice: 1,
        unit: 1,
        productStatus: 1,
        imageURL: 1,
        description: 1,
        category: 1,
        grams: 1,
      }
    }
  );

});
