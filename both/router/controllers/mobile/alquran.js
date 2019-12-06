AlquranController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});

quranviewer = RouteController.extend({
    waitOn: function () {
    },

    data: function () {
        return{
            index: this.params.index
        };
    },

    action: function () {
        this.render();
    }
});
