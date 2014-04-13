/*
 * VARIABLES
 * Description: All Global Vars
 */
// Impacts the responce rate of some of the responsive elements (lower value affects CPU but improves speed)
$.throttle_delay = 350;

// The rate at which the menu expands revealing child elements on click
$.menu_speed = 235;

// Note: You will also need to change this variable in the "variable.less" file.
$.navbar_height = 49;

/*
 * APP DOM REFERENCES
 * Description: Obj DOM reference, please try to avoid changing these
 */
  $.root_ = $('body');
  $.left_panel = $('#left-panel');
  $.shortcut_dropdown = $('#shortcut');

function pageSetUp() {

    $.device = 'desktop';
    $.enableJarvisWidgets = true;
    if ($.device === "desktop") {
        // is desktop

        // activate tooltips
        $("[rel=tooltip]").tooltip();

        // activate popovers
//        $("[rel=popover]").popover();
//
//        // activate popovers with hover states
//        $("[rel=popover-hover]").popover({
//            trigger: "hover"
//        });

        // activate inline charts
        runAllCharts();

        // setup widgets
        setup_widgets_desktop();

        //setup nav height (dynamic)
        nav_page_height();

        // run form elements
        runAllForms();

    } else {

        // is mobile

        // activate popovers
        //$("[rel=popover]").popover();

        //// activate popovers with hover states
        //$("[rel=popover-hover]").popover({
        //trigger: "hover"
        //});

        //// activate inline charts
        //runAllCharts();

        //// setup widgets
        //setup_widgets_mobile();

        ////setup nav height (dynamic)
        //nav_page_height();

        //// run form elements
        //runAllForms();

    }

}

function runAllCharts() {
    /*
     * SPARKLINES
     * DEPENDENCY: js/plugins/sparkline/jquery.sparkline.min.js
     * See usage example below...
     */

    /* Usage:
     * 		<div class="sparkline-line txt-color-blue" data-fill-color="transparent" data-sparkline-height="26px">
     *			5,6,7,9,9,5,9,6,5,6,6,7,7,6,7,8,9,7
     *		</div>
     */

    if ($.fn.sparkline) {

        $('.sparkline').each(function() {
            $this = $(this);
            var sparklineType = $this.data('sparkline-type') || 'bar';

            // BAR CHART
            if (sparklineType == 'bar') {

                var barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0',
                    sparklineHeight = $this.data('sparkline-height') || '26px',
                    sparklineBarWidth = $this.data('sparkline-barwidth') || 5,
                    sparklineBarSpacing = $this.data('sparkline-barspacing') || 2,
                    sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329',
                    sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];

                $this.sparkline('html', {
                    type: 'bar',
                    barColor: barColor,
                    type: sparklineType,
                    height: sparklineHeight,
                    barWidth: sparklineBarWidth,
                    barSpacing: sparklineBarSpacing,
                    stackedBarColor: sparklineStackedColor,
                    negBarColor: sparklineNegBarColor,
                    zeroAxis: 'false'
                });

            }

            //LINE CHART
            if (sparklineType == 'line') {

                var sparklineHeight = $this.data('sparkline-height') || '20px',
                    sparklineWidth = $this.data('sparkline-width') || '90px',
                    thisLineColor = $this.data('sparkline-line-color') || $this.css('color') || '#0000f0',
                    thisLineWidth = $this.data('sparkline-line-width') || 1,
                    thisFill = $this.data('fill-color') || '#c0d0f0',
                    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000',
                    thisMinSpotColor = $this.data('sparkline-minspot-color') || '#ed1c24',
                    thisMaxSpotColor = $this.data('sparkline-maxspot-color') || '#f08000',
                    thishighlightSpotColor = $this.data('sparkline-highlightspot-color') || '#50f050',
                    thisHighlightLineColor = $this.data('sparkline-highlightline-color') || 'f02020',
                    thisSpotRadius = $this.data('sparkline-spotradius') || 1.5;
                thisChartMinYRange = $this.data('sparkline-min-y') || 'undefined', thisChartMaxYRange = $this.data('sparkline-max-y') || 'undefined', thisChartMinXRange = $this.data('sparkline-min-x') || 'undefined', thisChartMaxXRange = $this.data('sparkline-max-x') || 'undefined', thisMinNormValue = $this.data('min-val') || 'undefined', thisMaxNormValue = $this.data('max-val') || 'undefined', thisNormColor = $this.data('norm-color') || '#c0c0c0', thisDrawNormalOnTop = $this.data('draw-normal') || false;

                $this.sparkline('html', {
                    type: 'line',
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineWidth: thisLineWidth,
                    lineColor: thisLineColor,
                    fillColor: thisFill,
                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor,
                    maxSpotColor: thisMaxSpotColor,
                    highlightSpotColor: thishighlightSpotColor,
                    highlightLineColor: thisHighlightLineColor,
                    spotRadius: thisSpotRadius,
                    chartRangeMin: thisChartMinYRange,
                    chartRangeMax: thisChartMaxYRange,
                    chartRangeMinX: thisChartMinXRange,
                    chartRangeMaxX: thisChartMaxXRange,
                    normalRangeMin: thisMinNormValue,
                    normalRangeMax: thisMaxNormValue,
                    normalRangeColor: thisNormColor,
                    drawNormalOnTop: thisDrawNormalOnTop

                });

            }

            //PIE CHART
            if (sparklineType == 'pie') {

                var pieColors = $this.data('sparkline-piecolor') || ["#B4CAD3", "#4490B1", "#98AA56", "#da532c", "#6E9461", "#0099c6", "#990099", "#717D8A"],
                    pieWidthHeight = $this.data('sparkline-piesize') || 90,
                    pieBorderColor = $this.data('border-color') || '#45494C',
                    pieOffset = $this.data('sparkline-offset') || 0;

                $this.sparkline('html', {
                    type: 'pie',
                    width: pieWidthHeight,
                    height: pieWidthHeight,
                    tooltipFormat: '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
                    sliceColors: pieColors,
                    offset: 0,
                    borderWidth: 1,
                    offset: pieOffset,
                    borderColor: pieBorderColor
                });

            }

            //BOX PLOT
            if (sparklineType == 'box') {

                var thisBoxWidth = $this.data('sparkline-width') || 'auto',
                    thisBoxHeight = $this.data('sparkline-height') || 'auto',
                    thisBoxRaw = $this.data('sparkline-boxraw') || false,
                    thisBoxTarget = $this.data('sparkline-targetval') || 'undefined',
                    thisBoxMin = $this.data('sparkline-min') || 'undefined',
                    thisBoxMax = $this.data('sparkline-max') || 'undefined',
                    thisShowOutlier = $this.data('sparkline-showoutlier') || true,
                    thisIQR = $this.data('sparkline-outlier-iqr') || 1.5,
                    thisBoxSpotRadius = $this.data('sparkline-spotradius') || 1.5,
                    thisBoxLineColor = $this.css('color') || '#000000',
                    thisBoxFillColor = $this.data('fill-color') || '#c0d0f0',
                    thisBoxWhisColor = $this.data('sparkline-whis-color') || '#000000',
                    thisBoxOutlineColor = $this.data('sparkline-outline-color') || '#303030',
                    thisBoxOutlineFill = $this.data('sparkline-outlinefill-color') || '#f0f0f0',
                    thisBoxMedianColor = $this.data('sparkline-outlinemedian-color') || '#f00000',
                    thisBoxTargetColor = $this.data('sparkline-outlinetarget-color') || '#40a020';

                $this.sparkline('html', {
                    type: 'box',
                    width: thisBoxWidth,
                    height: thisBoxHeight,
                    raw: thisBoxRaw,
                    target: thisBoxTarget,
                    minValue: thisBoxMin,
                    maxValue: thisBoxMax,
                    showOutliers: thisShowOutlier,
                    outlierIQR: thisIQR,
                    spotRadius: thisBoxSpotRadius,
                    boxLineColor: thisBoxLineColor,
                    boxFillColor: thisBoxFillColor,
                    whiskerColor: thisBoxWhisColor,
                    outlierLineColor: thisBoxOutlineColor,
                    outlierFillColor: thisBoxOutlineFill,
                    medianColor: thisBoxMedianColor,
                    targetColor: thisBoxTargetColor

                })

            }

            //BULLET
            if (sparklineType == 'bullet') {

                var thisBulletHeight = $this.data('sparkline-height') || 'auto',
                    thisBulletWidth = $this.data('sparkline-width') || 2,
                    thisBulletColor = $this.data('sparkline-bullet-color') || '#ed1c24',
                    thisBulletPerformanceColor = $this.data('sparkline-performance-color') || '#3030f0',
                    thisBulletRangeColors = $this.data('sparkline-bulletrange-color') || ["#d3dafe", "#a8b6ff", "#7f94ff"]

                    $this.sparkline('html', {

                        type: 'bullet',
                        height: thisBulletHeight,
                        targetWidth: thisBulletWidth,
                        targetColor: thisBulletColor,
                        performanceColor: thisBulletPerformanceColor,
                        rangeColors: thisBulletRangeColors

                    })

            }

            //DISCRETE
            if (sparklineType == 'discrete') {

                var thisDiscreteHeight = $this.data('sparkline-height') || 26,
                    thisDiscreteWidth = $this.data('sparkline-width') || 50,
                    thisDiscreteLineColor = $this.css('color'),
                    thisDiscreteLineHeight = $this.data('sparkline-line-height') || 5,
                    thisDiscreteThrushold = $this.data('sparkline-threshold') || 'undefined',
                    thisDiscreteThrusholdColor = $this.data('sparkline-threshold-color') || '#ed1c24';

                $this.sparkline('html', {

                    type: 'discrete',
                    width: thisDiscreteWidth,
                    height: thisDiscreteHeight,
                    lineColor: thisDiscreteLineColor,
                    lineHeight: thisDiscreteLineHeight,
                    thresholdValue: thisDiscreteThrushold,
                    thresholdColor: thisDiscreteThrusholdColor

                })

            }

            //TRISTATE
            if (sparklineType == 'tristate') {

                var thisTristateHeight = $this.data('sparkline-height') || 26,
                    thisTristatePosBarColor = $this.data('sparkline-posbar-color') || '#60f060',
                    thisTristateNegBarColor = $this.data('sparkline-negbar-color') || '#f04040',
                    thisTristateZeroBarColor = $this.data('sparkline-zerobar-color') || '#909090',
                    thisTristateBarWidth = $this.data('sparkline-barwidth') || 5,
                    thisTristateBarSpacing = $this.data('sparkline-barspacing') || 2,
                    thisZeroAxis = $this.data('sparkline-zeroaxis') || false;

                $this.sparkline('html', {

                    type: 'tristate',
                    height: thisTristateHeight,
                    posBarColor: thisBarColor,
                    negBarColor: thisTristateNegBarColor,
                    zeroBarColor: thisTristateZeroBarColor,
                    barWidth: thisTristateBarWidth,
                    barSpacing: thisTristateBarSpacing,
                    zeroAxis: thisZeroAxis

                })

            }

            //COMPOSITE: BAR
            if (sparklineType == 'compositebar') {

                var sparklineHeight = $this.data('sparkline-height') || '20px',
                    sparklineWidth = $this.data('sparkline-width') || '100%',
                    sparklineBarWidth = $this.data('sparkline-barwidth') || 3,
                    thisLineWidth = $this.data('sparkline-line-width') || 1,
                    thisLineColor = $this.data('sparkline-color-top') || '#ed1c24',
                    thisBarColor = $this.data('sparkline-color-bottom') || '#333333'

                $this.sparkline($this.data('sparkline-bar-val'), {

                    type: 'bar',
                    width: sparklineWidth,
                    height: sparklineHeight,
                    barColor: thisBarColor,
                    barWidth: sparklineBarWidth
                    //barSpacing: 5

                })

                $this.sparkline($this.data('sparkline-line-val'), {

                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor,
                    lineWidth: thisLineWidth,
                    composite: true,
                    fillColor: false

                })

            }

            //COMPOSITE: LINE
            if (sparklineType == 'compositeline') {

                var sparklineHeight = $this.data('sparkline-height') || '20px',
                    sparklineWidth = $this.data('sparkline-width') || '90px',
                    sparklineValue = $this.data('sparkline-bar-val'),
                    sparklineValueSpots1 = $this.data('sparkline-bar-val-spots-top') || null,
                    sparklineValueSpots2 = $this.data('sparkline-bar-val-spots-bottom') || null,
                    thisLineWidth1 = $this.data('sparkline-line-width-top') || 1,
                    thisLineWidth2 = $this.data('sparkline-line-width-bottom') || 1,
                    thisLineColor1 = $this.data('sparkline-color-top') || '#333333',
                    thisLineColor2 = $this.data('sparkline-color-bottom') || '#ed1c24',
                    thisSpotRadius1 = $this.data('sparkline-spotradius-top') || 1.5,
                    thisSpotRadius2 = $this.data('sparkline-spotradius-bottom') || thisSpotRadius1,
                    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000',
                    thisMinSpotColor1 = $this.data('sparkline-minspot-color-top') || '#ed1c24',
                    thisMaxSpotColor1 = $this.data('sparkline-maxspot-color-top') || '#f08000',
                    thisMinSpotColor2 = $this.data('sparkline-minspot-color-bottom') || thisMinSpotColor1,
                    thisMaxSpotColor2 = $this.data('sparkline-maxspot-color-bottom') || thisMaxSpotColor1,
                    thishighlightSpotColor1 = $this.data('sparkline-highlightspot-color-top') || '#50f050',
                    thisHighlightLineColor1 = $this.data('sparkline-highlightline-color-top') || '#f02020',
                    thishighlightSpotColor2 = $this.data('sparkline-highlightspot-color-bottom') || thishighlightSpotColor1,
                    thisHighlightLineColor2 = $this.data('sparkline-highlightline-color-bottom') || thisHighlightLineColor1,
                    thisFillColor1 = $this.data('sparkline-fillcolor-top') || 'transparent',
                    thisFillColor2 = $this.data('sparkline-fillcolor-bottom') || 'transparent';

                $this.sparkline(sparklineValue, {

                    type: 'line',
                    spotRadius: thisSpotRadius1,

                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor1,
                    maxSpotColor: thisMaxSpotColor1,
                    highlightSpotColor: thishighlightSpotColor1,
                    highlightLineColor: thisHighlightLineColor1,

                    valueSpots: sparklineValueSpots1,

                    lineWidth: thisLineWidth1,
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor1,
                    fillColor: thisFillColor1

                })

                $this.sparkline($this.data('sparkline-line-val'), {

                    type: 'line',
                    spotRadius: thisSpotRadius2,

                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor2,
                    maxSpotColor: thisMaxSpotColor2,
                    highlightSpotColor: thishighlightSpotColor2,
                    highlightLineColor: thisHighlightLineColor2,

                    valueSpots: sparklineValueSpots2,

                    lineWidth: thisLineWidth2,
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor2,
                    composite: true,
                    fillColor: thisFillColor2

                })

            }

        });

    } // end if

    /*
     * EASY PIE CHARTS
     * DEPENDENCY: js/plugins/easy-pie-chart/jquery.easy-pie-chart.min.js
     * Usage: <div class="easy-pie-chart txt-color-orangeDark" data-pie-percent="33" data-pie-size="72" data-size="72">
     *			<span class="percent percent-sign">35</span>
     * 	  	  </div>
     */

    if ($.fn.easyPieChart) {

        $('.easy-pie-chart').each(function() {
            $this = $(this);
            var barColor = $this.css('color') || $this.data('pie-color'),
                trackColor = $this.data('pie-track-color') || '#eeeeee',
                size = parseInt($this.data('pie-size')) || 25;
            $this.easyPieChart({
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: false,
                lineCap: 'butt',
                lineWidth: parseInt(size / 8.5),
                animate: 1500,
                rotate: -90,
                size: size,
                onStep: function(value) {
                    this.$el.find('span').text(~~value);
                }
            });
        });

    } // end if
}

/*
 * LOAD SCRIPTS
 * Usage:
 * Define function = myPrettyCode ()...
 * loadScript("js/my_lovely_script.js", myPrettyCode);
 */

var jsArray = {};

function loadScript(scriptName, callback) {

    if (!jsArray[scriptName]) {
        jsArray[scriptName] = true;

        // adding the script tag to the head as suggested before
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        //script.onreadystatechange = callback;
        script.onload = callback;

        // fire the loading
        body.appendChild(script);

    } else if (callback) {
        // changed else to else if(callback)
        //console.log("JS file already added!");
        //execute function
        callback();
    }
}

/* ~ END: LOAD SCRIPTS */

function setup_widgets_desktop() {

    if ($.fn.jarvisWidgets && $.enableJarvisWidgets) {

        $('#widget-grid').jarvisWidgets({

            grid: 'article',
            widgets: '.jarviswidget',
            localStorage: true,
            deleteSettingsKey: '#deletesettingskey-options',
            settingsKeyLabel: 'Reset settings?',
            deletePositionKey: '#deletepositionkey-options',
            positionKeyLabel: 'Reset position?',
            sortable: true,
            buttonsHidden: false,
            // toggle button
            toggleButton: true,
            toggleClass: 'fa fa-minus | fa fa-plus',
            toggleSpeed: 200,
            onToggle: function() {},
            // delete btn
            deleteButton: true,
            deleteClass: 'fa fa-times',
            deleteSpeed: 200,
            onDelete: function() {},
            // edit btn
            editButton: true,
            editPlaceholder: '.jarviswidget-editbox',
            editClass: 'fa fa-cog | fa fa-save',
            editSpeed: 200,
            onEdit: function() {},
            // color button
            colorButton: true,
            // full screen
            fullscreenButton: true,
            fullscreenClass: 'fa fa-resize-full | fa fa-resize-small',
            fullscreenDiff: 3,
            onFullscreen: function() {},
            // custom btn
            customButton: false,
            customClass: 'folder-10 | next-10',
            customStart: function() {
                alert('Hello you, this is a custom button...')
            },
            customEnd: function() {
                alert('bye, till next time...')
            },
            // order
            buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
            opacity: 1.0,
            dragHandle: '> header',
            placeholderClass: 'jarviswidget-placeholder',
            indicator: true,
            indicatorTime: 600,
            ajax: true,
            timestampPlaceholder: '.jarviswidget-timestamp',
            timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
            refreshButton: true,
            refreshButtonClass: 'fa fa-refresh',
            labelError: 'Sorry but there was a error:',
            labelUpdated: 'Last Update:',
            labelRefresh: 'Refresh',
            labelDelete: 'Delete widget:',
            afterLoad: function() {},
            rtl: false, // best not to toggle this!
            onChange: function() {

            },
            onSave: function() {

            },
            ajaxnav: $.navAsAjax // declears how the localstorage should be saved

        });

    }
}
/*
 * NAV OR #LEFT-BAR RESIZE DETECT
 * Description: changes the page min-width of #CONTENT and NAV when navigation is resized.
 * This is to counter bugs for min page width on many desktop and mobile devices.
 * Note: This script uses JSthrottle technique so don't worry about memory/CPU usage
 */

// Fix page and nav height
function nav_page_height() {
    setHeight = $('#main').height();
    menuHeight = $.left_panel.height();
    windowHeight = $(window).height() - $.navbar_height;
    //set height

    if (setHeight > windowHeight) { // if content height exceedes actual window height and menuHeight
        $.left_panel.css('min-height', setHeight + 'px');
        $.root_.css('min-height', setHeight + $.navbar_height + 'px');

    } else {
        $.left_panel.css('min-height', windowHeight + 'px');
        $.root_.css('min-height', windowHeight + 'px');
    }
}

/*
 * RESIZER WITH THROTTLE
 * Source: http://benalman.com/code/projects/jquery-resize/examples/resize/
 */

(function($, window, undefined) {

    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id, str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    jq_resize[str_delay] = $.throttle_delay;

    jq_resize[str_throttle] = true;

    $.event.special[str_resize] = {

        setup: function() {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function() {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },

        add: function(handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply(this, arguments);
            };
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function() {
            elems.each(function() {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);
                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }
            });
            loopy();
        }, jq_resize[str_delay]);
    };

})(jQuery, this);

function runAllForms() {

    /*
     * BOOTSTRAP SLIDER PLUGIN
     * Usage:
     * Dependency: js/plugin/bootstrap-slider
     */
    if ($.fn.slider) {
        $('.slider').slider();
    }

    /*
     * SELECT2 PLUGIN
     * Usage:
     * Dependency: js/plugin/select2/
     */
    if ($.fn.select2) {
        $('.select2').each(function() {
            $this = $(this);
            var width = $this.attr('data-select-width') || '100%';
            //, _showSearchInput = $this.attr('data-select-search') === 'true';
            $this.select2({
                //showSearchInput : _showSearchInput,
                allowClear: true,
                width: width
            })
        })
    }

    /*
     * MASKING
     * Dependency: js/plugin/masked-input/
     */
    if ($.fn.mask) {
        $('[data-mask]').each(function() {

            $this = $(this);
            var mask = $this.attr('data-mask') || 'error...',
                mask_placeholder = $this.attr('data-mask-placeholder') || 'X';

            $this.mask(mask, {
                placeholder: mask_placeholder
            });
        })
    }

    /*
     * Autocomplete
     * Dependency: js/jqui
     */
    if ($.fn.autocomplete) {
        $('[data-autocomplete]').each(function() {

            $this = $(this);
            var availableTags = $this.data('autocomplete') || ["The", "Quick", "Brown", "Fox", "Jumps", "Over", "Three", "Lazy", "Dogs"];

            $this.autocomplete({
                source: availableTags
            });
        })
    }

    /*
     * JQUERY UI DATE
     * Dependency: js/libs/jquery-ui-1.10.3.min.js
     * Usage:
     */
    if ($.fn.datepicker) {
        $('.datepicker').each(function() {

            $this = $(this);
            var dataDateFormat = $this.attr('data-dateformat') || 'dd.mm.yy';

            $this.datepicker({
                dateFormat: dataDateFormat,
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>'
            });
        })
    }

    /*
     * AJAX BUTTON LOADING TEXT
     * Usage: <button type="button" data-loading-text="Loading..." class="btn btn-xs btn-default ajax-refresh"> .. </button>
     */
    $('button[data-loading-text]').on('click', function() {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function() {
            btn.button('reset')
        }, 3000)
    });
}

// SHORTCUT ANIMATE SHOW
function shortcut_buttons_show() {
    $.shortcut_dropdown.animate({
        height: "show"
    }, 200, "easeOutCirc")
    $.root_.addClass('shortcut-on');
}

function shortcut_buttons_hide() {
    $.shortcut_dropdown.animate({
        height: "hide"
    }, 300, "easeOutCirc");
    $.root_.removeClass('shortcut-on');

}

