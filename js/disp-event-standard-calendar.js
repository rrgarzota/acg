$('#cb-calendar').fullCalendar({
	header: { center: 'month,agendaWeek,listWeek' }, 
	
	views: {
		basic: {
			// options apply to basicWeek and basicDay views
		},
		agenda: {
			// options apply to agendaWeek and agendaDay views
		},
		week: {
			// options apply to basicWeek and agendaWeek views
		},
		day: {
			// options apply to basicDay and agendaDay views
		}
	},
	
	selectable: true,
	editable: true,
	eventStartEditable: true,
	eventDurationEditable: true,
	
	eventColor: '#174478',
	eventTextColor: 'white',
	
	events: '../ws/event-get.php', 
});

var calendar = $( '#cb-calendar' ).fullCalendar( 'getCalendar' );

// Add new Event
calendar.on( 'select', function( start, end, jsEvent, view ){
	var dateStart = start.format( 'MM/DD/YYYY hh:mm:ss A' );
	var dateEnd = end.format( 'MM/DD/YYYY hh:mm:ss A' );
	var dateStartAllDay = start.format( 'MM/DD/YYYY' );
	var dateEndAllDay = end.subtract( 1, 'days' ).format( 'MM/DD/YYYY' );
	
	openModal( 'Add Booking', './modal-event-standard-add.php?Date_Start=' + dateStart + '&Date_End=' + dateEnd + '&Date_Start_All_Day=' + dateStartAllDay + '&Date_End_All_Day=' + dateEndAllDay );
});

// Open existing Event
calendar.on( 'eventClick', function( event, jsEvent, view ){
	openModal( 'Edit Booking', './modal-event-standard-edit.php?Event_ID=' + event.id );
});

// Existing Event modified by drag/drop
calendar.on( 'eventDrop', function( event, delta, revertFunc ){
	updateEvent( event, revertFunc );
});
calendar.on( 'eventResize', function( event, delta, revertFunc ){
	updateEvent( event, revertFunc );
});

// Update Event common function
function updateEvent( event, revertFunc ){
	$('.loader').show();
	var dateStart = event.start.format( 'MM/DD/YYYY hh:mm:ss A' );
	var dateEnd = event.end == null ? dateStart : event.end.subtract( 1, 'days' ).format( 'MM/DD/YYYY hh:mm:ss A' );
		
	var url = '../ws/event-update.php?User_ID=' + CONST_User_ID + '&Event_ID=' + event.id + '&Date_Start=' + dateStart + '&Date_End=' + dateEnd + '&All_Day=' + event.allDay;
	$.get( url, function() {
	})
		.done( function() {
			$('.loader').hide();
			//console.log( 'success' );

		})
		.fail( function() {
			$('.loader').hide();
			//console.log( 'failed' );
			revertFunc();
		});
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";

var eventer = window[eventMethod];

var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window

eventer(messageEvent,function(e) {

		var key = e.message ? "message" : "data";

		var data = e[key];

		if (data == 'Reload') {
			location.reload();
		};

		// if (data == 'Error') {
		// 	iframeLoaded('cb-modal-frame');
		// }

}, false);

// window.addEventListener("resize", function() {
// 	if ($(window).width() < 452) {
// 		iframeLoaded('cb-modal-frame');
// 	};
// });