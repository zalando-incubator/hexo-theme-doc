const ghpages = require('gh-pages');

ghpages.publish('public', function(err) {
  if(err) { console.error(err); process.exit(1); return; }
  console.log('done.');
});
