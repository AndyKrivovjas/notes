/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'front/app', // 'dist',
    '@angular':                   'front/node_modules/@angular',
    'angular2-in-memory-web-api': 'front/node_modules/angular2-in-memory-web-api',
    'rxjs':                       'front/node_modules/rxjs',
    'angular2-localstorage':      'front/node_modules/angular2-localstorage',
    'angular2-cookie':            'front/node_modules/angular2-cookie',
    'angular2-moment':            'front/node_modules/angular2-moment',
    'moment':                     'front/node_modules/moment',
    'angular2-css':               'front/node_modules/angular2-css',
    'angular2-materialize':       'front/node_modules/angular2-materialize',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'angular2-localstorage':      { defaultExtension: "js" },
    'angular2-cookie':            { main: 'core.js', defaultExtension: 'js' },
    'angular2-moment':            { main: 'index.js', defaultExtension: 'js' },
    'moment':                     { main: 'moment.js', defaultExtension: 'js' },
    'materialize-css':            { main: "dist/js/materialize", defaultExtension: "js" },
    'angular2-materialize':       { main: "dist/index", defaultExtension: "js" }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);

  global.bootstrapping = System
       .import( "app" )
       .then(
           function handleResolve() {

               console.info( "System.js successfully bootstrapped app." );

           },
           function handleReject( error ) {

               console.warn( "System.js could not bootstrap the app." );
               console.error( error );

               return( Promise.reject( error ) );

           }
       )
   ;
})(this);
