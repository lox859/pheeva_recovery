// var m = require("mithril")

// m.mount("form", [
// 	m("input['type=text', 'name=identifier']"),
// 	m("input['type=submit']", {
// 	onclick: function(identifier) {
// 		var value = "{name = " + identifier + "}"
// 		return m.request({
//             method: "POST",
//             url: "https://f5a15j7due.execute-api.us-east-1.amazonaws.com/latest/getLink",
//             data: value
//         })
//         .then(function(response) {
//         	window.location(response.link)
//         })
// 	}
// })])

// src/views/Layout.js
var m = require("mithril")

module.exports = {
    view: function(vnode) {
        return m("main", [
            m("nav.box_one.navbar.navbar-default",
                m(".container-fluid", [
                    m(".navbar-header",
                        m("a.navbar-brand.higher-button[href='http://pheeva.com/']",
                            m("img[alt='Pheeva Logo'][src='http://pheeva.com/addons/shared_addons/themes/pheeva/img/pheevalogo.svg']")
                        )
                    )
                ])
            ),
            m(".box_two", [
                m("h2.title_h.pheeva_color", "Thank you for using Pheeva."),
                m("h3.pheeva_color", "Pheeva has been closed for over a year"),
                m("p", "When the Pheeva project was first discontiuned. We sent out emails to all who used Pheeva. So, you all could recover your bitcoin.")
            ]),
            m("div.pop-stripe"),
            m(".box_two", [
                m("h2.title_h.pheeva_color", "Recovery"),
                m("h3.pheeva_color", "Pheeva is no longer in operation"),
                m("span", "Thank you for you support of Pheeva Wallet. We are sorry to inform you that "),
                m("span.pheeva_color", "Pheeva Hot Wallet"),
                m("span", " is no longer in operation. We understand that, due to the increasing price of bitcoin, many are trying to recover bitcoin from old wallets. To aid in this process, we have created a simple wallet recovery tool,which is linked below. To recover your bitcoin, enter your username and then simply click the button below labeled \“Recvoer Wallet\"")
            ]),
            m(".box_three.title_h", [
                m("input[placeholder='Username']")
            ]),
            m(".box_three.title_h", [
                m("button.title_h", "Recover Wallet")
            ])
        ])
    }
}
