var Log = function(Name, Text) {
    console.log(`%c${Name}`, "background-color: #ff0000; color: white; padding: 2px 10px; border-radius: 3px;", `${Text}`);
}

var Name = window.location.href;
var Sites = {
	"asurascans": {
		"previous": "ch-prev-btn",
		"next": "ch-next-btn",
		"parentNode": false,
		"click": false,
		"mode": "class"
	},
    "webtoons": {
        "previous": "pg_prev _prevEpisode NPI=a:prev,g:en_en",
        "next": "pg_next _nextEpisode NPI=a:next,g:en_en",
        "parentNode": false,
        "click": false,
        "mode": "class",
        "function": function() {
            if (document.getElementsByClassName("pg_next")[0]) {
                var node = document.getElementsByClassName("pg_next")[0];
                var parentNode = node.parentNode;
                var em = document.createElement("em");
                var text = document.createTextNode("Last Page");
                var oldhref = node.href;
                em.appendChild(text);
                node = node.cloneNode();
                node.href = oldhref.split("&page=")[0] + "&page=999";
                node.appendChild(em);
                parentNode.appendChild(node);
            }
            if (document.getElementsByClassName("pg_prev")[0]) {
                var node = document.getElementsByClassName("pg_prev")[0];
                var parentNode = node.parentNode;
                var em = document.createElement("em");
                var text = document.createTextNode("First Page");
                var oldhref = node.href;
                em.appendChild(text);
                node = node.cloneNode();
                node.href = oldhref.split("&page=")[0] + "&page=1";
                node.appendChild(em);
                parentNode.insertBefore(node, document.getElementsByClassName("pg_prev")[0]);
            }
        }
    },
    "manganelo": {
        "previous": "navi-change-chapter-btn-prev a-h",
        "next": "navi-change-chapter-btn-next a-h",
        "parentNode": false,
        "click": false,
        "mode": "class"
    },
    "wuxiaworld": {
        "previous": "[src=\"/images/arrow-left.png\"]",
        "next": "[src=\"/images/arrow-right.png\"]",
        "parentNode": true,
        "click": false,
        "mode": "selector"
    },
    "chessmoba": { //mangaowl
        "previous": "owl-direction-horizontal prev",
        "next": "owl-direction-horizontal next",
        "parentNode": false,
        "click": false,
        "mode": "class"
    },
    "saberscans": {
        "previous": "[rel=\"prev\"]",
        "next": "[rel=\"next\"]",
        "parentNode": false,
        "click": false,
        "mode": "selector"
    },
    "totallytranslations": {
        "previous": "[rel=\"prev\"]",
        "next": "[rel=\"next\"]",
        "parentNode": false,
        "click": false,
        "mode": "selector"
    },
    "sololeveling": {
        "previous": "[rel=\"prev\"]",
        "next": "[rel=\"next\"]",
        "parentNode": false,
        "click": false,
        "mode": "selector"
    },
    "divinedaolibrary": {
        "previous": "//a[text()='<<Previous Chapter']",
        "next": "//a[text()='Next Chapter>>']",
        "parentNode": false,
        "click": false,
        "mode": "xpath"
    },
	"mangahub": {
        "previous": "icon-arrow-left",
        "next": "icon-arrow-right",
        "parentNode": true,
        "click": false,
        "mode": "class"
    },
    "mangakakalot": {
        "previous": "next",
        "next": "back",
        "parentNode": false,
        "click": false,
        "mode": "class"
    },
    "genkan": {
        "previous": "fas fa-arrow-left mr-2",
        "next": "fas fa-arrow-right ml-2",
        "parentNode": true,
        "click": false,
        "mode": "class"
    },
    "merakiscans": {
        "previous": "",
        "next": "",
        "parentNode": false,
        "click": false,
        "mode": "none",
        "function": function() {
            var comic = document.querySelector(".comic");
            if (comic) {
                $(function() {
                    $("<style>")
                        .text(".comic {padding-bottom: 0px !important;} body {background: rgb(46, 46, 46);}")
                        .appendTo($("body"));
                });
            }
        }
    },
    "miraclescans": {
        "previous": "",
        "next": "",
        "parentNode": false,
        "click": false,
        "mode": "none",
        "function": function() {
            var antiadblock = document.getElementsByClassName("kill-adblock-container kill-adblock-2 kill-adblock-hide");
            Log("MiracleScans", "Removing Anti-Adblock");
            if (antiadblock && antiadblock.length > 0) {
                antiadblock[0].parentNode.removeChild(antiadblock[0]);
                Log("MiracleScans", "Removed Anti-Adblock");
            }
        }
    },
    "readm": {
        "previous": "",
        "next": "",
        "parentNode": false,
        "click": false,
        "mode": "none",
        "function": function() {
            $(function() {
                $("<style>")
                    .text("body {background: rgb(43, 43, 43) !important;}")
                    .appendTo($("body"));
            });
            const Loop = setInterval(function() {
                const Elem = document.getElementsByClassName("swal2-container");
                if (Elem && Elem.length > 0) {
                    Elem[0].parentNode.removeChild(Elem[0]);
                    Log("readm", "Removed Pop-Up");
                }
            }, 250);
        }
    },
}

try {
    const Periods = Name.split("/")[2].split(".");
    Name = (Periods.length === 3 && Periods[1] || Periods[0]);
} catch (err) {
    Log("Error", err + " : " + Name);
}

function doc_keyUp(e) {
    switch (e.keyCode) {
        case 37:
            var TextPrevious = Sites[Name] && Sites[Name].previous;
            var ToClickPrevious = Sites[Name] && Sites[Name].click;
            try {
                var ElementPrevious = Sites[Name] && Sites[Name].mode === "class" && document.getElementsByClassName(TextPrevious)[0] || Sites[Name].mode === "selector" && document.querySelectorAll(TextPrevious)[0] || Sites[Name].mode === "xpath" && document.evaluate(TextPrevious, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || document.getElementsByClassName(TextPrevious).length > 0 && document.getElementsByClassName(TextPrevious)[0];
            } catch (err) {
                var ElementPrevious = document.getElementsByClassName(TextPrevious).length > 0 && document.getElementsByClassName(TextPrevious)[0];
            }
            try {
                if (ToClickPrevious) {
                    ElementPrevious.click();
                } else {
                    window.location.href = (Sites[Name] && Sites[Name].parentNode === true && ElementPrevious.parentNode.href || ElementPrevious.href || Sites[Name] == undefined && ElementPrevious.parentNode.href);
                }
            } catch (err) {}
            break;
        case 39:
            var TextNext = Sites[Name] && Sites[Name].next;
            var ToClickNext = Sites[Name] && Sites[Name].click;
            try {
                var ElementNext = Sites[Name] && Sites[Name].mode === "class" && document.getElementsByClassName(TextNext)[0] || Sites[Name].mode === "selector" && document.querySelectorAll(TextNext)[0] || Sites[Name].mode === "xpath" && document.evaluate(TextNext, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || document.getElementsByClassName(TextNext).length > 0 && document.getElementsByClassName(TextNext)[0];
            } catch (err) {
                var ElementNext = document.getElementsByClassName(TextNext).length > 0 && document.getElementsByClassName(TextNext)[0];
            }
            try {
                if (ToClickNext) {
                    ElementNext.click();
                } else {
                    window.location.href = (Sites[Name] && Sites[Name].parentNode === true && ElementNext.parentNode.href || ElementNext.href || Sites[Name] == undefined && ElementNext.parentNode.href);
                }
            } catch (err) {}
            break;
        default:
            break;
    }
}
if (Sites[Name]) {
    console.log("%cComic Shortcuts", "font-size: 40px; padding-bottom: 3px; color: white; text-shadow: -1px -1px #ff0000, 1px -1px #ff0000, -1px 1px #ff0000, 1px 1px #ff0000, 2px 2px #ff0000, 3px 3px #ff0000;", "Version: " + "0.01");
    Log("Site Name", Name)
    Log("Previous", Sites[Name].previous)
    Log("Next", Sites[Name].next)
    Log("Mode", Sites[Name].mode)
    Log("ParentNode", Sites[Name].parentNode)
    Log("Click", Sites[Name].click)
    if (Sites[Name]["mode"] === "none") {} else {
        document.addEventListener('keyup', doc_keyUp, false);
    }
    if (Sites[Name]["function"]) {
        Sites[Name]["function"]();
    }
} else if (document.body && document.body.innerHTML && document.body.innerHTML.includes("Powered by Genkan")) {
    console.log("%cComic Shortcuts", "font-size: 40px; padding-bottom: 3px; color: white; text-shadow: -1px -1px #ff0000, 1px -1px #ff0000, -1px 1px #ff0000, 1px 1px #ff0000, 2px 2px #ff0000, 3px 3px #ff0000;", "Version: " + "0.01");
    Name = "genkan";
    Log("Site Name", Name)
    Log("Previous", Sites[Name].previous)
    Log("Next", Sites[Name].next)
    Log("Mode", Sites[Name].mode)
    Log("ParentNode", Sites[Name].parentNode)
    Log("Click", Sites[Name].click)
    document.addEventListener('keyup', doc_keyUp, false);
}