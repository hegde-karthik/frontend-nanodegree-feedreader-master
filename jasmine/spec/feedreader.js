// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */


  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('contains URL', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });
    /*  test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('All objects have name defined', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });


  /*  test suite named "The menu" */
  describe("The menu", function() {
    body = $('body');
    menu = $('.menu-icon-link');
    /* test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
    /* test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when icon clicked', function() {
      // show menu when menu icon is clicked.
      menu.click();
      expect(body.hasClass('menu-hidden')).toBe(false);
      menu.click();
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });


  /*  test suite named "Initial Entries" */
  describe("Initial Entries", function() {
    /* test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    it('has atleast one entry element', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });


  /*test suite named "New Feed Selection" */
  describe("New Feed Selection", function() {
    /* test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * loadFeed() is asynchronous.
     */
    beforeEach(function(done) {
      // run loadFeed function to load content
      loadFeed(0, function() {
        firstLoad = $('.feed').html();
        done();
      });
    });
    it('changes content when load new feeds', function(done) {
      // run loadFeed again to load new content
      loadFeed(1, function() {
        secondLoad = $('.feed').html();
        expect(secondLoad).not.toBe(firstLoad);
        done();
      });
    });
  });
}());
