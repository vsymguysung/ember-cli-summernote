module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return that.addAddonToProject('summernote', "~0.8.3");
  }
};
