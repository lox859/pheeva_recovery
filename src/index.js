var m = require("mithril")

m.mount("form", [
	m("input['type=text', 'name=identifier']"),
	m("input['type=submit']", {
	onclick: function(identifier) {
		var value = "{name = " + identifier + "}"
		return m.request({
            method: "POST",
            url: "https://f5a15j7due.execute-api.us-east-1.amazonaws.com/latest/getLink",
            data: value
        })
        .then(function(response) {
        	window.location(response.link)
        })
	}
})])