# jQuery line truncation
A jQuery plugin that truncates content based on a number of lines.

## Default initialization
```js
$('.js-truncate').spLineTruncation();
```

## Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
hiddenElements | string (selector) | '.u-visually-hidden' | Elements that should not be taken into account when calculating the height of the content.
truncateWrapperClass | string | 'js-truncated-content' | The class to apply to the div the truncated content will be wrapped into.
truncatedClass | string | 'is-truncated' | The class that will enable styling while the content remains truncated.
toggleSpeed | integer | 233 | The duration of the expand animation.
buttonHideDuration | integer | 133 | The animation duration for hiding the "more" button.
moreFunctionalClass | string | 'js-expand-truncated' | The class that will be added to the "more" button to attach event listeners.
moreClasses | array | ['o-btn'] | The classes to apply to the "more" button.
moreLabel | string | 'Read more' | The label of the "more" button.
maxLines | integer | 5 | The number of lines of text to show.
heightAdjustment | integer | 0 | A number of pixels to add to / remove from the calculated height based on the number of lines.

## Initialization with custom settings
```js
/**
 * 1. Remove 5px more from the cropped (calculated) height.
 */
$('.js-truncate').spLineTruncation({
    moreClasses: ['o-btn', 'o-btn--link'],
    heightAdjustment: -5 /* [1] */
});
```

### Dependencies
jQuery

### License
Copyright © Steve Piron
