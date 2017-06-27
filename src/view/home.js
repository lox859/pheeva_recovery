// var m = require("mithril")

// m.mount("form", [
//  m("input['type=text', 'name=identifier']"),
//  m("input['type=submit']", {
//  onclick: function(identifier) {
//      var value = "{name = " + identifier + "}"
//      return m.request({
//             method: "POST",
//             url: "https://f5a15j7due.execute-api.us-east-1.amazonaws.com/latest/getLink",
//             data: value
//         })
//         .then(function(response) {
//          window.location(response.link)
//         })
//  }
// })])

// src/views/Layout.js
var m = require("mithril")
var state = {
	disabledBtn: true,
    value: "",
    setValue: function(v) {
    	state.value = v;
    	if (state.value != "") {
    		state.disabledBtn = false
    	} else {
    		state.disabledBtn = true
    	}
    }
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
            m(".pop-stripe"),
            m(".space_three"),
            m(".box_four", [
                m("h3.pheeva_color", "Pheeva is no longer in operation, recovery for wallet"),
                m(".space_two"),
                m("span", "We appreciate your support of "),
                m("span.pheeva_color", "Pheeva Hot Wallet."),
                m("span", " Unfortunately we discontinued our wallet service over a year ago. Throughout our closing process, we sent emails to all customers detailing the preperations that should be taken to to ensure the saftey of their funds. We understand that due to the increasing price of bitcoin many are searching old wallets to recover funds. To aid in this process, we have created a simple recovery tool for "),
                m("span.pheeva_color", "Pheeva Hot Wallets"),
                m("span", " To recover your wallet, enter your username or email adress below and click \“Recvoer Wallet.\"")
            ]),
            m(".box_three.title_h", [
                m("form", [
                    m("input[placeholder='Username'][type='text', name='identifier']", {
                        oninput: m.withAttr("value", state.setValue),
                        value: state.value,
                    }),
                    m(".space_three"),
                    m("button.title_h[data-target='#sign_in_modal'][data-toggle='modal']", {
                    	disabled: state.disabledBtn,
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
                                        setTimeout(function() { window.location = response.link; }, 3000);
                                        redirct_link = response.link;

                                        isLink = true;
                                        console.log("isLink:", isLink);

                                    } else {
                                        isLink = false;
                                        console.log("isLink:", isLink);

                                    }
                                    state.disabledBtn = true
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
                                m(".space_three"),
                                m("div.pop-stripe"),
                                m(".space_three"),

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
                                    "Try again")
                            ],
                        )
                    ])
                )
            )
        ])
    }
}
