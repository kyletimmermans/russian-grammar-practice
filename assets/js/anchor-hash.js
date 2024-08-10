window.addEventListener("load", function() {
	var modal = new bootstrap.Modal(document.getElementById("aboutModal"));
	var dropdown = new bootstrap.Dropdown(document.getElementById("dropdownMenu2"));
	if (window.location.hash.toLowerCase() === "#about") {
			dropdown.hide();
			modal.show();
	} else if (window.location.hash.toLowerCase() === "#exercises") {
			modal.hide();
			dropdown.show();
	}
});
