require.config({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-1.10.2",
        "bootstrap": "bootstrap-2.3.1.min",
        "pin": "jquery.pin",
        "layer": "layer.min",
        "hotkeys": "external/jquery.hotkeys",
        "prettify": "external/google-code-prettify/prettify",
        "switch": "bootstrap-switch.min",
        "wysiwyg": "bootstrap-wysiwyg"
    },
    shim: {
        'jquery.pin': {
            deps: ['jquery'],
            exports: 'jQuery.pin'
        },
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        },
        'backbone.layoutmanager': {
            deps: ['backbone']
            exports: 'Backbone.LayoutManager'
        }
    }
});

require(['jquery', 'bootstrap', 'pin', 'layer', 'gotoTop', 'common', 'hotkeys', 'prettify', 'wysiwyg', 'editor'], function ($) {
});

