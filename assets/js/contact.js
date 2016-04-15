(function($){
$(document).ready(function() {
	/* ---------------------------------------------- /*
	 * E-mail validation
	/* ---------------------------------------------- */

	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(emailAddress);
	};

	$('#contact-form').submit(function(e) {

			e.preventDefault();

			var c_name = $('#name').val();
			var c_email = $('#email').val();
			var c_sub = $('#sub').val();
			var c_message = $('#message').val();
			var response = $('#contact-form .ajax-response');
			
			var formData = {
				'name'       : c_name,
				'email'      : c_email,
				'message'    : c_message
			};

			if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
				response.fadeIn(500);
				response.html('<span class="error">Please fix the errors and try again.</span>');
				if(!isValidEmailAddress(c_email))
					$("#email").addClass('error');
				if(c_name == '')
					$("#name").addClass('error');
				if(c_message == '');
					$("#message").addClass('error');
				$(".ajax-response").removeClass('success');
			}

			else {
				$("#email").removeClass('error');
				$("#name").removeClass('error');
				$("#message").removeClass('error');


					 $.ajax({
							type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
							url         : 'assets/php/contact.php', // the url where we want to POST
							data        : formData, // our data object
							dataType    : 'json', // what type of data do we expect back from the server
							encode      : true,
							success		: function(res){
											var ret = $.parseJSON(JSON.stringify(res));
											$(".ajax-response").addClass('success');
											response.html(ret.message).fadeIn(500);
							}
						});
				}           
            	return false;
	});

});

})(jQuery);