$('#passwordForm').submit(function(event) {
	event.preventDefault()

	$('#passwordForm button .spinner-border').show()

	$.ajax({
		type: "POST",
		url: '/account/password',
		data: $('#passwordForm').serialize(),
		dataType: "json",
		success: function(data) {
			alert('Password changed successfully!')
			$('#passwordModal').modal('hide')
		},
		error: function(e) {
			alert(e.responseJSON.error)
			console.error(e.responseJSON)
		}
	})
})