/**!
 * @author Steve Piron <https://twitter.com/stevepiron>
 * @requires jQuery
 *
 * A jQuery plugin that truncates content based on a number of lines.
 */
(function( $ ) {

    var defaults;
    var params;

    var $moreBtn;
    var $document = $(document);

    // ====================================================================== //
    // Functions
    // ====================================================================== //

    /**
     * @function `returnMargin`
     *
     * Defines a context-based margin where context is the threshold.
     *
     * @param threshold (int)
     */
    function returnMargin( threshold ) {
        var margin = 0;
        switch( true ) {
            case( threshold < 20 ):
                margin = 2;
                break;
            case( threshold < 30 ):
                margin = 4;
                break;
            default:
                margin = -1;
        }
        return margin;
    }

    /**
     * @function `createMoreBtn`
     *
     * Creates HTML markup for the "more" button.
     */
    function createMoreBtn() {
        $moreBtn = $('<button class="'+params.moreFunctionalClass+' '+params.moreClasses.join(' ')+
            '" type="button">'+params.moreLabel+'</button>');
    }

    /**
     * @function `truncate`
     *
     * Truncates text container, based on a number of lines.
     *
     * @param $el (node) - the text-containing element
     * @param maxLines (int) - the maximum number of lines to show
     *
     * 1. Quick escape if the element to truncate does not exist.
     * 2. Only take into account as direct inner elements those that are rendered
     *    on screen.
     * 3. If there are any valid inner elements, truncate container based on them.
     * 4. Calculate an average line height, in case inner elements don't share the
     *    same line height.
     * 5. Tolerance above `maxLines` threshold: if the threshold is set to 4 lines,
     *    it's stupid to hide just one line.
     */
    function truncate( $el, maxLines ) {
        if( !$el.length ) { /* [1] */
            return;
        }
        var $toTruncate = $el;
        var $innerElements = $el.children().not(params.hiddenElements); /* [2] */
        var height = 0;
        var lineHeight = 0;
        if( $innerElements.length ) { /* [3] */
            $toTruncate = $innerElements;
        }
        $toTruncate.each(function(i, el) {
            var $el = $(el);
            height += $el.outerHeight();
            lineHeight += parseInt( $el.css('line-height') );
        });
        var averageLineHeight = lineHeight / $toTruncate.length; /* [4] */
        var lines = height / averageLineHeight;
        var extraLines = lines - maxLines;
        if( returnMargin( maxLines ) - extraLines < 0 )	{ /* [5] */
            var maxHeight = maxLines * averageLineHeight;
            maxHeight += parseInt( $innerElements.eq(0).css('margin-top') );
            maxHeight += params.heightAdjustment;
            $el.wrapInner('<div class="' + params.truncateWrapperClass + '"></div>');
            var $wrapper = $el.find('.'+params.truncateWrapperClass);
            $wrapper.css('height', maxHeight+'px').addClass('is-truncated');
            createMoreBtn();
            $moreBtn.insertAfter($wrapper);
        }
    }

    /**
     * @function `expand`
     *
     * Expands truncated text to original height to see it in its entirety.
     *
     * 1. Temporarily remove any modifiers to calculate the height of the original
     *    text.
     * 2. Add them back.
     * 3. Animate the height from truncated to non-truncated.
     * 4. When animation is complete, remove all modifiers.
     */
    function expand( $clickedMoreBtn ) {
        var $content = $clickedMoreBtn.siblings('.'+params.truncateWrapperClass);
        var truncated_height = $content.css('height');
        var content_height = $content
            .css('height', '')
            .removeClass(params.truncatedClass) /* [1] */
            .outerHeight();
        $clickedMoreBtn.slideUp(params.toggleSpeedFast);
        $content
            .css('height', truncated_height)
            .addClass(params.truncateWrapperClass) /* [2] */
            .animate({ /* [3] */
                height: content_height + 'px'
            }, params.toggleSpeed, function() { /* [4] */
                $content.css('height', '');
                $content.removeClass(params.truncatedClass);
            });
    }

    // ====================================================================== //
    // Plugin
    // ====================================================================== //

    $.fn.spLineTruncation = function( options ) {

        /**
         * Note: using `return` keeps jQuery's chaining possibility
         */
        return this.each(function() {

            defaults = {
                hiddenElements: '.u-visually-hidden',
                truncateWrapperClass: 'js-truncated-content',
                truncatedClass: 'is-truncated',
                toggleSpeed: 233,
                toggleSpeedFast: 133,
                moreFunctionalClass: 'js-expand-truncated',
                moreClasses: ['o-btn'],
                moreLabel: $(this).data('more-label') || 'Read more',
                maxLines: $(this).data('lines') || 5,
                heightAdjustment: 0
            };

            params = $.extend( defaults, options );

            truncate($(this), params.maxLines);

            // ============================================================== //
            // On click
            // ============================================================== //

            $document.on('click', '.'+params.moreFunctionalClass, function() {
                expand( $(this) );
            });

        });
    };

}( jQuery ));
