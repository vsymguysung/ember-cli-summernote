module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return that.addBowerPackageToProject('summernote', "0.8.3");
  }
};
