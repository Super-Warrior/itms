// Smart Notification (bootstraphunter.com)

$(document).ready(function () {

    // Plugins placing
    $("body").append("<div id='divSmallBoxes'></div>");
    $("body").append("<div id='divMiniIcons'></div><div id='divbigBoxes'></div>");

});

//Closing Rutine for Loadings

// Messagebox
(function ($) {
    $.SmartMessageBox = function (settings, callback) {
        var smartmessage, content;

        settings = $.extend({
            title: "",
            content: "",
            NormalButton: undefined,
            ActiveButton: undefined,
            buttons: undefined,
            input: undefined,
            placeholder: "",
            options: undefined
        }, settings);

        //Messagebox Sound

        // SmallBox Sound
        if (isIE8orlower() == 0) {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'sound/messagebox.mp3');
            $.get();
            audioElement.addEventListener("load", function () {
                audioElement.play();
            }, true);

            audioElement.pause();
            audioElement.play();
        }

        $.SmartMessageBox.SmartMSGboxCount = $.SmartMessageBox.SmartMSGboxCount + 1;

        if ($.SmartMessageBox.ExistMsg === 0) {
            $.SmartMessageBox.ExistMsg = 1;
            smartmessage = "<div class='divMessageBox animated fadeIn fast' id='MsgBoxBack'></div>";
            $("body").append(smartmessage);

            if (isIE8orlower() == 1) {
                $("#MsgBoxBack").addClass("MessageIE");
            }
        }

        var InputType = "";
        var HasInput = 0;
        if (settings.input != undefined) {
            HasInput = 1;
            settings.input = settings.input.toLowerCase();

            switch (settings.input) {
            case "text":
                InputType = "<input class='form-control' type='" + settings.input + "' id='txt" +
                    $.SmartMessageBox.SmartMSGboxCount  + "' placeholder='" + settings.placeholder + "'/><br/><br/>";
                break;
            case "password":
                InputType = "<input class='form-control' type='" + settings.input + "' id='txt" +
                    $.SmartMessageBox.SmartMSGboxCount  + "' placeholder='" + settings.placeholder + "'/><br/><br/>";
                break;

            case "select":
                if (settings.options == undefined) {
                    alert("For this type of input, the options parameter is required.");
                } else {
                    InputType = "<select class='form-control' id='txt" + $.SmartMessageBox.SmartMSGboxCount  + "'>";
                    for (var i = 0; i <= settings.options.length - 1; i++) {
                        if (settings.options[i] == "[") {
                            Name = "";
                        } else {
                            if (settings.options[i] == "]") {
                                NumBottons = NumBottons + 1;
                                Name = "<option>" + Name + "</option>";
                                InputType += Name;
                            } else {
                                Name += settings.options[i];
                            }
                        }
                    };
                    InputType += "</select>"
                }

                break;
            default:
                alert("That type of input is not handled yet");
            }

        }

        content = "<div class='MessageBoxContainer animated fadeIn fast' id='Msg" + $.SmartMessageBox.SmartMSGboxCount  +
            "'>";
        content += "<div class='MessageBoxMiddle'>";
        content += "<span class='MsgTitle'>" + settings.title + "</span class='MsgTitle'>";
        content += "<p class='pText'>" + settings.content + "</p>";
        content += InputType;
        content += "<div class='MessageBoxButtonSection'>";

        if (settings.buttons == undefined) {
            settings.buttons = "[Accept]";
        }

        settings.buttons = $.trim(settings.buttons);
        settings.buttons = settings.buttons.split('');

        var Name = "";
        var NumBottons = 0;
        if (settings.NormalButton == undefined) {
            settings.NormalButton = "#232323";
        }

        if (settings.ActiveButton == undefined) {
            settings.ActiveButton = "#ed145b";
        }

        for (var i = 0; i <= settings.buttons.length - 1; i++) {

            if (settings.buttons[i] == "[") {
                Name = "";
            } else {
                if (settings.buttons[i] == "]") {
                    NumBottons = NumBottons + 1;
                    Name = "<button id='bot" + NumBottons + "-Msg" + $.SmartMessageBox.SmartMSGboxCount  +
                        "' class='btn btn-default btn-sm botTempo'> " + Name + "</button>";
                    content += Name;
                } else {
                    Name += settings.buttons[i];
                }
            }
        };

        content += "</div>";
        //MessageBoxButtonSection
        content += "</div>";
        //MessageBoxMiddle
        content += "</div>";
        //MessageBoxContainer

        // alert(SmartMSGboxCount);
        if ($.SmartMessageBox.SmartMSGboxCount  > 1) {
            $(".MessageBoxContainer").hide();
            $(".MessageBoxContainer").css("z-index", 99999);
        }

        $(".divMessageBox").append(content);

        // Focus
        if (HasInput == 1) {
            $("#txt" + $.SmartMessageBox.SmartMSGboxCount ).focus();
        }

//        $('.botTempo').hover(function () {
//            var ThisID = $(this).attr('id');
//            // alert(ThisID);
//            // $("#"+ThisID).css("background-color", settings.ActiveButton);
//        }, function () {
//            var ThisID = $(this).attr('id');
//            //$("#"+ThisID).css("background-color", settings.NormalButton);
//        });

        // Callback and button Pressed
        $(".botTempo").click(function () {
            // Closing Method
            var ThisID = $(this).attr('id');
            var MsgBoxID = ThisID.substr(ThisID.indexOf("-") + 1);
            var Press = $.trim($(this).text());

            if (HasInput == 1) {
                if (typeof callback == "function") {
                    var IDNumber = MsgBoxID.replace("Msg", "");
                    var Value = $("#txt" + IDNumber).val();
                    if (callback)
                        callback(Press, Value);
                }
            } else {
                if (typeof callback == "function") {
                    if (callback)
                        callback(Press);
                }
            }

            $("#" + MsgBoxID).addClass("animated fadeOut fast");
            $.SmartMessageBox.SmartMSGboxCount  = $.SmartMessageBox.SmartMSGboxCount  - 1;

            if ($.SmartMessageBox.SmartMSGboxCount  == 0) {
                $("#MsgBoxBack").removeClass("fadeIn").addClass("fadeOut").delay(300).queue(function () {
                    $.SmartMessageBox.ExistMsg = 0;
                    $(this).remove();
                });
            }
        });

    }
})(jQuery);

// BigBox
var BigBoxes = 0;

(function ($) {
    $.bigBox = function (settings, callback) {
        var boxBig, content;
        settings = $.extend({
            title: "",
            content: "",
            icon: undefined,
            number: undefined,
            color: undefined,
            sound: true,
            timeout: undefined,
            colortime: 1500,
            colors: undefined
        }, settings);

        // bigbox Sound
        if (settings.sound === true) {
            if (isIE8orlower() == 0) {
                var audioElement = document.createElement('audio');

                if (navigator.userAgent.match('Firefox/'))
                    audioElement.setAttribute('src', 'sound/bigbox.ogg');
                else
                    audioElement.setAttribute('src', 'sound/bigbox.mp3');

                $.get();
                audioElement.addEventListener("load", function () {
                    audioElement.play();
                }, true);

                audioElement.pause();
                audioElement.play();
            }
        }

        $.bigBox.BigBoxes = $.bigBox.BigBoxes + 1;

        boxBig = "<div id='bigBox" + $.bigBox.BigBoxes +
            "' class='bigBox animated fadeIn fast'><div id='bigBoxColor" + $.bigBox.BigBoxes +
            "'><i class='botClose fa fa-times' id='botClose" + $.bigBox.BigBoxes + "'></i>";
        boxBig += "<span>" + settings.title + "</span>";
        boxBig += "<p>" + settings.content + "</p>";
        boxBig += "<div class='bigboxicon'>";

        if (settings.icon == undefined) {
            settings.icon = "fa fa-cloud";
        }
        boxBig += "<i class='" + settings.icon + "'></i>";
        boxBig += "</div>";

        boxBig += "<div class='bigboxnumber'>";
        if (settings.number != undefined) {
            boxBig += settings.number;
        }

        boxBig += "</div></div>";
        boxBig += "</div>";

        // stacking method
        $("#divbigBoxes").append(boxBig);

        if (settings.color == undefined) {
            settings.color = "#004d60";
        }

        $("#bigBox" + $.bigBox.BigBoxes).css("background-color", settings.color);

        $("#divMiniIcons").append("<div id='miniIcon" + $.bigBox.BigBoxes +
            "' class='cajita animated fadeIn' style='background-color: " + settings.color +
            ";'><i class='" + settings.icon + "'/></i></div>");

        //Click Mini Icon
        $("#miniIcon" + $.bigBox.BigBoxes).bind('click', function () {
            var FrontBox = $(this).attr('id');
            var FrontBigBox = FrontBox.replace("miniIcon", "bigBox");
            var FronBigBoxColor = FrontBox.replace("miniIcon", "bigBoxColor");

            $(".cajita").each(function (index) {
                var BackBox = $(this).attr('id');
                var BigBoxID = BackBox.replace("miniIcon", "bigBox");

                $("#" + BigBoxID).css("z-index", 9998);
            });

            $("#" + FrontBigBox).css("z-index", 9999);
            $("#" + FronBigBoxColor).removeClass("animated fadeIn").delay(1).queue(function () {
                $(this).show();
                $(this).addClass("animated fadeIn");
                $(this).clearQueue();

            });

        });

        var ThisBigBoxCloseCross = $("#botClose" + $.bigBox.BigBoxes);
        var ThisBigBox = $("#bigBox" + $.bigBox.BigBoxes);
        var ThisMiniIcon = $("#miniIcon" + $.bigBox.BigBoxes);

        // Color Functionality
        var ColorTimeInterval;
        if (settings.colors != undefined && settings.colors.length > 0) {
            ThisBigBoxCloseCross.attr("colorcount", "0");

            ColorTimeInterval = setInterval(function () {

                var ColorIndex = ThisBigBoxCloseCross.attr("colorcount");

                ThisBigBoxCloseCross.animate({
                    backgroundColor: settings.colors[ColorIndex].color
                });

                ThisBigBox.animate({
                    backgroundColor: settings.colors[ColorIndex].color
                });

                ThisMiniIcon.animate({
                    backgroundColor: settings.colors[ColorIndex].color
                });

                if (ColorIndex < settings.colors.length - 1) {
                    ThisBigBoxCloseCross.attr("colorcount", ((ColorIndex * 1) + 1));
                } else {
                    ThisBigBoxCloseCross.attr("colorcount", 0);
                }

            }, settings.colortime);
        }

        //Close Cross
        ThisBigBoxCloseCross.bind('click', function () {
            clearInterval(ColorTimeInterval);
            if (typeof callback == "function") {
                if (callback)
                    callback();
            }

            var FrontBox = $(this).attr('id');
            var FrontBigBox = FrontBox.replace("botClose", "bigBox");
            var miniIcon = FrontBox.replace("botClose", "miniIcon");

            $("#" + FrontBigBox).removeClass("fadeIn fast");
            $("#" + FrontBigBox).addClass("fadeOut fast").delay(300).queue(function () {
                $(this).clearQueue();
                $(this).remove();
            });

            $("#" + miniIcon).removeClass("fadeIn fast");
            $("#" + miniIcon).addClass("fadeOut fast").delay(300).queue(function () {
                $(this).clearQueue();
                $(this).remove();
            });

        });

        if (settings.timeout != undefined) {
            var TimedID = $.bigBox.BigBoxes;
            setTimeout(function () {
                clearInterval(ColorTimeInterval);
                $("#bigBox" + TimedID).removeClass("fadeIn fast");
                $("#bigBox" + TimedID).addClass("fadeOut fast").delay(300).queue(function () {
                    $(this).clearQueue();
                    $(this).remove();
                });

                $("#miniIcon" + TimedID).removeClass("fadeIn fast");
                $("#miniIcon" + TimedID).addClass("fadeOut fast").delay(300).queue(function () {
                    $(this).clearQueue();
                    $(this).remove();
                });

            }, settings.timeout);
        }

    }
})(jQuery);

// .BigBox

// Small Notification
var SmallBoxes = 0,
    SmallCount = 0,
    SmallBoxesAnchos = 0;

(function ($) {
    $.smallBox = function (settings, callback) {
        var BoxSmall, content;
        settings = $.extend({
            title: "",
            content: "",
            icon: undefined,
            iconSmall: undefined,
            sound: true,
            color: undefined,
            timeout: undefined,
            colortime: 1500,
            colors: undefined
        }, settings);

        // SmallBox Sound
        if (settings.sound === true) {
            if (isIE8orlower() == 0) {
                var audioElement = document.createElement('audio');

                if (navigator.userAgent.match('Firefox/'))
                    audioElement.setAttribute('src', 'sound/smallbox.ogg');
                else
                    audioElement.setAttribute('src', 'sound/smallbox.mp3');

                $.get();
                audioElement.addEventListener("load", function () {
                    audioElement.play();
                }, true);
                audioElement.pause();
                audioElement.play();
            }
        }

        $.smallBox.SmallBoxes = $.smallBox.SmallBoxes + 1;

        BoxSmall = ""

        var IconSection = "",
            CurrentIDSmallbox = "smallbox" + $.smallBox.SmallBoxes;

        if (settings.iconSmall == undefined) {
            IconSection = "<div class='miniIcono'></div>";
        } else {
            IconSection = "<div class='miniIcono'><i class='miniPic " + settings.iconSmall +
                "'></i></div>";
        }

        if (settings.icon == undefined) {
            BoxSmall = "<div id='smallbox" + $.smallBox.SmallBoxes +
                "' class='SmallBox animated fadeInRight fast'><div class='textoFull'><span>" + settings.title +
                "</span><p>" + settings.content + "</p></div>" + IconSection + "</div>";
        } else {
            BoxSmall = "<div id='smallbox" + $.smallBox.SmallBoxes +
                "' class='SmallBox animated fadeInRight fast'><div class='foto'><i class='" + settings.icon +
                "'></i></div><div class='textoFoto'><span>" + settings.title + "</span><p>" + settings.content +
                "</p></div>" + IconSection + "</div>";
        }

        if ($.smallBox.SmallBoxes == 1) {
            $("#divSmallBoxes").append(BoxSmall);
            $.smallBox.SmallBoxesAnchos = $("#smallbox" + $.smallBox.SmallBoxesAnchos).height() + 40;
        } else {
            var SmartExist = $(".SmallBox").size();
            if (SmartExist == 0) {
                $("#divSmallBoxes").append(BoxSmall);
                $.smallBox.SmallBoxesAnchos = $("#smallbox" + $.smallBox.SmallBoxes).height() + 40;
            } else {
                $("#divSmallBoxes").append(BoxSmall);
                $("#smallbox" + $.smallBox.SmallBoxes).css("top",  $.smallBox.SmallBoxesAnchos);
                $.smallBox.SmallBoxesAnchos =  $.smallBox.SmallBoxesAnchos + $("#smallbox" + $.smallBox.SmallBoxes).height() + 20;

                $(".SmallBox").each(function (index) {

                    if (index == 0) {
                        $(this).css("top", 20);
                        heightPrev = $(this).height() + 40;
                        $.smallBox.SmallBoxesAnchos = $(this).height() + 40;
                    } else {
                        $(this).css("top", heightPrev);
                        heightPrev = heightPrev + $(this).height() + 20;
                        $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos + $(this).height() + 20;
                    }

                });

            }
        }

        var ThisSmallBox = $("#smallbox" + $.smallBox.SmallBoxes);

        // IE fix
        // if($.browser.msie) {
        //     // alert($("#"+CurrentIDSmallbox).css("height"));
        // }

        if (settings.color == undefined) {
            ThisSmallBox.css("background-color", "#004d60");
        } else {
            ThisSmallBox.css("background-color", settings.color);
        }

        var ColorTimeInterval;

        if (settings.colors != undefined && settings.colors.length > 0) {
            ThisSmallBox.attr("colorcount", "0");

            ColorTimeInterval = setInterval(function () {

                var ColorIndex = ThisSmallBox.attr("colorcount");

                ThisSmallBox.animate({
                    backgroundColor: settings.colors[ColorIndex].color
                });

                if (ColorIndex < settings.colors.length - 1) {
                    ThisSmallBox.attr("colorcount", ((ColorIndex * 1) + 1));
                } else {
                    ThisSmallBox.attr("colorcount", 0);
                }

            }, settings.colortime);
        }

        if (settings.timeout != undefined) {

            setTimeout(function () {
                clearInterval(ColorTimeInterval);
                var ThisHeight = $(this).height() + 20;
                var ID = CurrentIDSmallbox;
                var ThisTop = $("#" + CurrentIDSmallbox).css('top');

                // SmallBoxesAnchos = SmallBoxesAnchos - ThisHeight;
                // $("#"+CurrentIDSmallbox).remove();

                if ($("#" + CurrentIDSmallbox + ":hover").length != 0) {
                    //Mouse Over the element
                    $("#" + CurrentIDSmallbox).on("mouseleave", function () {
                        $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos - ThisHeight;
                        $("#" + CurrentIDSmallbox).remove();
                        if (typeof callback == "function") {
                            if (callback)
                                callback();
                        }

                        var Primero = 1;
                        var heightPrev = 0;
                        $(".SmallBox").each(function (index) {

                            if (index == 0) {
                                $(this).animate({
                                    top: 20
                                }, 300);

                                heightPrev = $(this).height() + 40;
                                $.smallBox.SmallBoxesAnchos = $(this).height() + 40;
                            } else {
                                $(this).animate({
                                    top: heightPrev
                                }, 350);

                                heightPrev = heightPrev + $(this).height() + 20;
                                $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos + $(this).height() + 20;
                            }

                        });
                    });
                } else {
                    clearInterval(ColorTimeInterval);
                    $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos - ThisHeight;

                    if (typeof callback == "function") {
                        if (callback)
                            callback();
                    }

                    $("#" + CurrentIDSmallbox).removeClass().addClass("SmallBox").animate({
                        opacity: 0
                    }, 300, function () {

                        $(this).remove();

                        var Primero = 1;
                        var heightPrev = 0;
                        $(".SmallBox").each(function (index) {

                            if (index == 0) {
                                $(this).animate({
                                    top: 20
                                }, 300);

                                heightPrev = $(this).height() + 40;
                                $.smallBox.SmallBoxesAnchos = $(this).height() + 40;
                            } else {
                                $(this).animate({
                                    top: heightPrev
                                });

                                heightPrev = heightPrev + $(this).height() + 20;
                                $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos + $(this).height() + 20;
                            }

                        });
                    })
                }

            }, settings.timeout);
        }

        // Click Closing
        $("#smallbox" + $.smallBox.SmallBoxes).bind('click', function () {
            clearInterval(ColorTimeInterval);
            if (typeof callback == "function") {
                if (callback)
                    callback();
            }

            var ThisHeight = $(this).height() + 20;
            var ID = $(this).attr('id');
            var ThisTop = $(this).css('top');

            $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos - ThisHeight;

            $(this).removeClass().addClass("SmallBox").animate({
                opacity: 0
            }, 300, function () {
                $(this).remove();

                var Primero = 1;
                var heightPrev = 0;

                $(".SmallBox").each(function (index) {

                    if (index == 0) {
                        $(this).animate({
                            top: 20
                        }, 300);
                        heightPrev = $(this).height() + 40;
                        $.smallBox.SmallBoxesAnchos = $(this).height() + 40;
                    } else {
                        $(this).animate({
                            top: heightPrev
                        }, 350);
                        heightPrev = heightPrev + $(this).height() + 20;
                        $.smallBox.SmallBoxesAnchos = $.smallBox.SmallBoxesAnchos + $(this).height() + 20;
                    }

                });
            })
        });

    }
})(jQuery);

// .Small Notification

// Sounds

function getInternetExplorerVersion() {
    var rv = -1;
    // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function isIE8orlower() {

    var msg = "0";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver >= 9.0)
            msg = 0
        else
            msg = 1;
    }
    return msg;
    // alert(msg);
}