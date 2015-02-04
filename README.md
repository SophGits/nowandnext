# Now and Next

### Task 1
- [x] Fetch the JSON
- [x] Add programme items to the DOM
- [x] Insert each programme's image, start time and title
- [x] Implement scrolling functionality

### Task 2
- [x] Add ability to switch to another channel
- [ ] Include extra information (description and duration) in a mousover overlay
- [ ] Make responsive

### Notes
##### Tools
- jQuery has been used for this task to keep it simple and quick. It's not particularly conducive to an MVC-style separation of concerns. On a bigger scale a client-side framework such as Backbone.js may be more suitable.
- For the carousel, a jQuery plugin was used (bxSlider) because it has more functionality than something I could make (it can be responsive, supports IE7+, is customisable etc).

##### Improvements
- All 24 episodes can be loaded without slowing the page. If there were a lot of data (or videos, for example) I would be selective about appending data to the DOM all at once.
- Would prefer to persist the JSON once it's acquired, so as not to make a call every time a button is clicked.
- The unchecked items under 'Task 2' are things I wanted to implement but did not have the time to. I also considered writing a test in Jasmine, removing default carousel control styles and adding additional styling to the page.
