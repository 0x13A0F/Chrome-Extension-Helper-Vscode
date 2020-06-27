const getManifest = (projectName,type) => {
    return JSON.stringify({
        "manifest_version":2,
        "name":""+projectName,
        "version":"1.0",
        "description":"A description for "+projectName,
        "icons":{
            "128":"img/icon128.png",
            "48":"img/icon48.png",
            "16":"img/icon16.png"
        },
        [type]:{
            "default_icon":"img/icon16.png",
            "default_popup":"popup.html",
            "default_title":""+projectName
        },
        "options_page":"options.html",
        "background":{
            "scripts":["js/eventPage.js"],
            "persistence":false
        },
        "permissions":[
            "*://*/*"
        ]
    
    },null, "\t");
}

exports.getManifest = getManifest;