document.addEventListener('DataPageReady', function (event) {
	// Standard Event Calendar Add
	if (event.detail.appKey == 'caf2600037e3178dc5e249f798fd') {
		initDateTime();
		constructTime();
	}

	// Standard Event Calendar Edit
	if (event.detail.appKey == 'caf26000c1ec6daf1b5d41f09342') {
		initDateTime();
		var t = $('input[name$="Duration"]').val().split(':');
		$('select[name="cbParamVirtual1"]').val(t[0]);
		$('select[name="cbParamVirtual2"]').val(t[1]);
	}
	
	// Custom Event Calendar Add
	if (event.detail.appKey == 'caf260008e46826d08c24f258545') {
		initDateTime();
		constructTime();
	}

	// Custom Event Calendar Edit
	if (event.detail.appKey == 'caf26000106fa8bfc2af43c6b8ca') {
		initDateTime();

		var t = $('input[name$="Duration"]').val().split(':');
		$('select[name="cbParamVirtual1"]').val(t[0]);
		$('select[name="cbParamVirtual2"]').val(t[1]);
	}


});

function constructTime() {
	var hr = $('select[name="cbParamVirtual1"]').val();
	var min = $('select[name="cbParamVirtual2"]').val();
	
	var t = hr + ':' + min;
	$('input[name$="Duration"').val(t);
}

function initDateTime() {
	$( 'input[name*="Date_Time_"]' ).datetimepicker({
		format: 'm/d/Y H:i:00',
		formatTime: 'h:i a', 
		step:30
	});
	
	var $allDayStart = $( 'input[name$="RecordDate_All_Day_Start"]' );
	var $allDayEnd = $( 'input[name$="RecordDate_All_Day_End"]' );
	
	var $start = $( 'input[name$="RecordDate_Start"]' );
	var $end = $( 'input[name$="RecordDate_End"]' );
		
	$('input[type="Submit"]').on('click', function() {
		$start.val( $allDayStart.val() );
		$end.val( $allDayEnd.val() );
		$end.val( moment( $allDayEnd.val(), 'MM/DD/YYYY' ).add( 1, 'days' ).format( 'MM/DD/YYYY' ) );
		
		if( moment( $end.val(), 'MM/DD/YYYY' ) <= moment( $start.val(), 'MM/DD/YYYY' ) ){
			alert( 'The end date must be later than the start date.' );
			return false;
		}
	});

	$('select[name="cbParamVirtual1"]').on('change', function() {
		constructTime();
	});

	$('select[name="cbParamVirtual2"]').on('change', function() {
		constructTime();
	});
};