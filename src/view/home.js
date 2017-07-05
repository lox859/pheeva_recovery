// src/views/Layout.js
var m = require("mithril")
    // var $ = require("jquery");
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
            m(".row", [
                m(".col-md-1"),

                m(".col-md-10", [
                    m(".box_five", [

                        // m("nav.box_one.navbar.navbar-default",
                        //     m(".container-fluid", [
                        //         m(".navbar-header",
                        //             m("a.navbar-brand.higher-button[href='http://pheeva.com/']",
                        m(".space_three"),

                        m("img[alt='Pheeva Logo'][src='http://pheeva.com/addons/shared_addons/themes/pheeva/img/pheevalogo.svg']"),
                        //             )
                        //         )
                        //     ])
                        // )
                        m(".space_three")
                    ])
                ]),
                m(".col-md-1"),

            ]),
            m(".pop-stripe"),
            m(".row", [
                m(".col-md-1"),
                m(".col-md-10", [
                    m(".box_two", [
                        m(".box_six", [

                            m("h1.title_h.pheeva_color", "Thank you for using Pheeva.")
                        ]),
                    ]),
                    m(".space")
                ]),
                m(".col-md-1")
            ]),
            m(".pop-stripe"),
            m(".row", [
                m(".col-md-1"),
                m(".col-md-10", [
                    m(".space_three"),
                    m(".box_four", [
                        m("div", [
                            m("div",
                                "Dear Pheeva Wallet User,"
                            ),
                            m("p",
                                "Pheeva's Bitcoin journey is completed. The Pheeva Wallet service for Bitcoin is completely shut down. We removed the wallet from new users over a year ago, but now it's time to say goodbye."
                            ),
                            m("p",
                                "We really appreciated joining you in your cryptocurrency endeavours. We are happy to say that over our three years, we never had a security breach. Which makes us extremely proud. Our strategy to keep your keys safe, and passwords offline served in protecting your information from outside threats. But it also kept away any potential internal threats as well.\
                                "
                            ),
                            m("p",
                                "Our philosophy is to allow everyone to manage their own keys. Which helps with security, but not necessarily with convenience. We’ve created this small application to help you migrate from Pheeva into another great wallet provider."
                            )
                        ])
                    ])

                ]),
                m(".col-md-1"),


            ]),
            m(".row", [
                m(".col-md-4"),

                m(".col-md-4", [
                    m(".box_three.title_h", [
                        m("form", [
                            m("input[placeholder='Username'][type='text', name='identifier']", {
                                oninput: m.withAttr("value", state.setValue),
                                value: state.value,
                            }),
                            m(".space_three"),
                            m("button.title_h[data-target='#sign_in_modal'][data-toggle='modal']", {
                                disabled: state.disabledBtn,
                                onhover: function() {
                                    if (state.disabledBtn) {
                                        this.$element.css({ "background-color": "#C60006" });
                                    }
                                },
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
                                                setTimeout(function() { window.location = response.link; }, 4500);
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
                    ])
                ]),
                m(".col-md-4")
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
                                    "Try again")
                            ],
                        )
                    ])
                )
            )
        ])
    }
}
