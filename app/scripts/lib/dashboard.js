	  // PAGE RELATED SCRIPTS

	 /*
	  * Autostart Carousel
	  */
	 $('.carousel.slide').carousel({
	     interval: 3000,
	     cycle: true
	 });
	 $('.carousel.fade').carousel({
	     interval: 3000,
	     cycle: true
	 });

	  // load bootstrap-progress bar script
	 loadScript("js/plugin/bootstrap-progressbar/bootstrap-progressbar.js", progressBarAnimate);

	  // Fill all progress bars with animation
	 function progressBarAnimate() {
	     $('.progress-bar').progressbar({
	         display_text: 'fill'
	     });
	 }

	 /*
	  * Smart Notifications
	  */
	 $('#eg1').click(function(e) {

	     $.bigBox({
	         title: "Big Information box",
	         content: "This message will dissapear in 6 seconds!",
	         color: "#C46A69",
	         //timeout: 6000,
	         icon: "fa fa-warning shake animated",
	         number: "1",
	         timeout: 6000
	     });

	     e.preventDefault();

	 })

	  $('#eg2').click(function(e) {

	     $.bigBox({
	         title: "Big Information box",
	         content: "Lorem ipsum dolor sit amet, test consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
	         color: "#3276B1",
	         //timeout: 8000,
	         icon: "fa fa-bell swing animated",
	         number: "2"
	     });

	     e.preventDefault();
	 })

	  $('#eg3').click(function(e) {

	     $.bigBox({
	         title: "Shield is up and running!",
	         content: "Lorem ipsum dolor sit amet, test consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
	         color: "#C79121",
	         //timeout: 8000,
	         icon: "fa fa-shield fadeInLeft animated",
	         number: "3"
	     });

	     e.preventDefault();

	 })

	  $('#eg4').click(function(e) {

	     $.bigBox({
	         title: "Success Message Example",
	         content: "Lorem ipsum dolor sit amet, test consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
	         color: "#739E73",
	         //timeout: 8000,
	         icon: "fa fa-check",
	         number: "4"
	     }, function() {
	         closedthis();
	     });

	     e.preventDefault();

	 })

	  $('#eg5').click(function() {

	     $.smallBox({
	         title: "Ding Dong!",
	         content: "Someone's at the door...shall one get it sir? <p class='text-align-right'><a href='javascript:void(0);' class='btn btn-primary btn-sm'>Yes</a> <a href='javascript:void(0);'  onclick='noAnswer();' class='btn btn-danger btn-sm'>No</a></p>",
	         color: "#296191",
	         //timeout: 8000,
	         icon: "fa fa-bell swing animated"
	     });

	 })

	 function noAnswer() {

	     $.smallBox({
	         title: "Sure, as you wish sir...",
	         content: "",
	         color: "#A65858",
	         iconSmall: "fa fa-times",
	         timeout: 5000
	     });

	 }


	 $('#eg6').click(function() {

	     $.smallBox({
	         title: "Big Information box",
	         content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
	         color: "#5384AF",
	         //timeout: 8000,
	         icon: "fa fa-bell"
	     });

	 })

	  $('#eg7').click(function() {

	     $.smallBox({
	         title: "James Simmons liked your comment",
	         content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
	         color: "#296191",
	         iconSmall: "fa fa-thumbs-up bounce animated",
	         timeout: 4000
	     });

	 })

	 function closedthis() {
	     $.smallBox({
	         title: "Great! You just closed that last alert!",
	         content: "This message will be gone in 5 seconds!",
	         color: "#739E73",
	         iconSmall: "fa fa-cloud",
	         timeout: 5000
	     });
	 }

	 /*
	  * SmartAlerts
	  */
	  // With Callback
	 $("#smart-mod-eg1").click(function(e) {
	     $.SmartMessageBox({
	         title: "Smart Alert!",
	         content: "This is a confirmation box. Can be programmed for button callback",
	         buttons: '[No][Yes]'
	     }, function(ButtonPressed) {
	         if (ButtonPressed === "Yes") {

	             $.smallBox({
	                 title: "Callback function",
	                 content: "<i class='fa fa-clock-o'></i> <i>You pressed Yes...</i>",
	                 color: "#659265",
	                 iconSmall: "fa fa-check fa-2x fadeInRight animated",
	                 timeout: 4000
	             });
	         }
	         if (ButtonPressed === "No") {
	             $.smallBox({
	                 title: "Callback function",
	                 content: "<i class='fa fa-clock-o'></i> <i>You pressed No...</i>",
	                 color: "#C46A69",
	                 iconSmall: "fa fa-times fa-2x fadeInRight animated",
	                 timeout: 4000
	             });
	         }

	     });
	     e.preventDefault();
	 })
	  // With Input
	  $("#smart-mod-eg2").click(function(e) {

	     $.SmartMessageBox({
	         title: "Smart Alert: Input",
	         content: "Please enter your user name",
	         buttons: "[Accept]",
	         input: "text",
	         placeholder: "Enter your user name"
	     }, function(ButtonPress, Value) {
	         alert(ButtonPress + " " + Value);
	     });

	     e.preventDefault();
	 })
	  // With Buttons
	  $("#smart-mod-eg3").click(function(e) {

	     $.SmartMessageBox({
	         title: "Smart Notification: Buttons",
	         content: "Lots of buttons to go...",
	         buttons: '[Need?][You][Do][Buttons][Many][How]'
	     });

	     e.preventDefault();
	 })
	  // With Select
	  $("#smart-mod-eg4").click(function(e) {

	     $.SmartMessageBox({
	         title: "Smart Alert: Select",
	         content: "You can even create a group of options.",
	         buttons: "[Done]",
	         input: "select",
	         options: "[Costa Rica][United States][Autralia][Spain]"
	     }, function(ButtonPress, Value) {
	         alert(ButtonPress + " " + Value);
	     });

	     e.preventDefault();
	 });

	  // With Login
	 $("#smart-mod-eg5").click(function(e) {

	     $.SmartMessageBox({
	         title: "Login form",
	         content: "Please enter your user name",
	         buttons: "[Cancel][Accept]",
	         input: "text",
	         placeholder: "Enter your user name"
	     }, function(ButtonPress, Value) {
	         if (ButtonPress == "Cancel") {
	             alert("Why did you cancel that? :(");
	             return 0;
	         }

	         Value1 = Value.toUpperCase();
	         ValueOriginal = Value;
	         $.SmartMessageBox({
	             title: "Hey! <strong>" + Value1 + ",</strong>",
	             content: "And now please provide your password:",
	             buttons: "[Login]",
	             input: "password",
	             placeholder: "Password"
	         }, function(ButtonPress, Value) {
	             alert("Username: " + ValueOriginal + " and your password is: " + Value);
	         });
	     });

	     e.preventDefault();
	 });
