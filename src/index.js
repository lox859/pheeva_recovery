var m = require("mithril")
var Home = require("./view/home")


m.route(document.body, "/", {
    "/": {
        render: function() {
        return m(Home)
        }
    }
})
