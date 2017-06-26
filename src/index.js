var m = require("mithril")
var Home = require("./view/home")


m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
        return m(Home)
        }
    }
})
