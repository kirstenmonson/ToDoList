import Ember from 'ember';

export default Ember.Controller.extend({
  lists: Ember.computed.alias('model'),
  list: Ember.computed.alias('lists.firstObject'),
hasItems:Ember.computed.notEmpty('list.items'),

  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

  taskIsDone: function() {
    return this.get('list.isCompleted') === 'true';}.property('list'),


  actions: {
addList: function(){
      var title = this.get('newTitle');
      var char = this.store.createRecord('list', {
        title: title,
        isCompleted:false
      });
      char.save();
      this.set('newTitle', '');
    },

     deleteList: function(list) {
      this.store.find('list', list.id).then(function (post) {
        post.destroyRecord();
      });
    },
  }
});
