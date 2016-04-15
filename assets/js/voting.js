$(document).ready(function (){
	$('.vote-button').on('change', function(){
		var selectedVote = $(this).val();
		var vote = draftVote(selectedVote);
		$(this).next(".selected-vote").text(vote);
		$(this).hide();
	});
	function draftVote(value){
		var finalVote = value;
		return finalVote; 	
	}

	$("#submit").click(function(){
		 $.ajax({
                url: 'test.php', // url where to submit the request
                type : "POST", // type of action POST || GET
                dataType : 'json', // data type
                data : $("#form").serialize(), // post data || get data
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
	});
	
});