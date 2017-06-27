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
var state = {
    value: "",
    setValue: function(v) { state.value = v }
}
var isLink = true;
var redirct_link;
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
                m("h1.title_h.pheeva_color", "Thank you for using Pheeva."),
            ]),
            m(".space"),
            m("div.pop-stripe"),
            m(".box_two", [
                m("h1.title_h.pheeva_color", "Recovery"),
            ]),
            m(".space"),
            m(".box_four", [
                m("h3.pheeva_color", "Pheeva is no longer in operation"),
                m(".space_two"),
                m("span", "When the Pheeva project was first discontiuned over a year ago. We sent out emails to all who used Pheeva. So, you all could recover your bitcoin. Thank you for you support of Pheeva Wallet. We are sorry to inform you that "),
                m("span.pheeva_color", "Pheeva Hot Wallet"),
                m("span", " is no longer in operation. We understand that, due to the increasing price of bitcoin, many are trying to recover bitcoin from old wallets. To aid in this process, we have created a simple wallet recovery tool,which is linked below. To recover your bitcoin, enter your username and then simply click the button below labeled \“Recvoer Wallet\"")
            ]),
            m(".box_three.title_h", [
                m("form", [
                    m("input[placeholder='Username'][type='text', name='identifier']", {
                        oninput: m.withAttr("value", state.setValue),
                        value: state.value,
                    }),
                    m(".space_three"),
                    m("button.title_h[data-target='#sign_in_modal'][data-toggle='modal']", {
                        onclick: function(id) {
                            var value = { name: state.value }
                            console.log("value: ", value)
                            return m.request({
                                    method: "POST",
                                    url: "https://f5a15j7due.execute-api.us-east-1.amazonaws.com/latest/getLink",
                                    data: value
                                })
                                .then(function(response) {
                                    console.log("res: ", response)
                                    state.value = ""
                                    if (typeof response.link != "undefined") {
                                        console.log(response.link);
                                        window.location = response.link;
                                        redirct_link = response.link;

                                        isLink = true;
                                        console.log("isLink:", isLink);

                                    } else {
                                        isLink = false;
                                        console.log("isLink:", isLink);

                                    }
                                })
                        }
                    }, "Recover Wallet"),
                ]),
                m(".space"),
                m(".space"),
            ]),
            m(".modal.fade[aria-labelledby='myModalLabel'][id='sign_in_modal'][role='dialog'][tabindex='-1']",
                m(".modal-dialog.summary-dialog[role='document']",
                    m(".modal-content", [
                        m(".modal-header",
                            (isLink) ? [
                                m("h4.modal-title[id='myModalLabel']",
                                    "Redirecting")
                            ] : [
                                m("h4.modal-title[id='myModalLabel']",
                                    "Not vaild")
                            ],
                        ),
                        m(".modal-body",
                            (isLink) ? [
                                m("div", "If you are not redirected shortly, please click the button below or copy link below"),
                                m("div.pop-stripe"),
                                m("div.link",
                                    m("a[href='" + redirct_link + "']", redirct_link))
                            ] : [
                                m("div", "The Username you entered - was not vaild, press the button below and try again.")
                            ],
                        ),
                        m(".modal-footer.summary-footer", 
							(isLink) ? [
                             m("button.btn[type='button']", {
                                    onclick: function() {
                                        window.location = redirct_link
                                    }
                                },
                                "Recover")
                            ] : [
                             m("button.btn[data-dismiss='modal'][type='button']",
                                "Try again")                            ],
                        )
                    ])
                )
            )
        ])
    }
}
