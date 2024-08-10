document.addEventListener("DOMContentLoaded", function() {
	if (window.location.hash === "#About" || window.location.hash === "#about") {
			var modal = new bootstrap.Modal(document.getElementById("aboutModal"));
			modal.show();
	} else if (window.location.hash === "#Exercises" || window.location.hash === "#exercises") {
			var dropdown = new bootstrap.Dropdown(document.getElementById("dropdownMenu2"));
			dropdown.show();
	}
});