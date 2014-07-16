require.config({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-1.10.2"
    }
});

require(['jquery','bootstrap','jquery.pin','layer.min','common'], function ($){});
