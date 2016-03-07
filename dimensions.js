(function($) {

$.dimensions = {
    size: function() {
        var width = $(window).width();

        for (var size in $.dimensions.breakpoints) {
            if (width >= ($.dimensions.breakpoints[size].min || 0) && width <= ($.dimensions.breakpoints[size].max || 999999)) {
                return size;
            }
        }

        return size;
    },
    breakpoints: {
        xxs:{max:479},
        xs:{min:480,max:767},
        sm:{min:768,max:991},
        md:{min:992,max:1199},
        lg:{min:1200}
    },
    popup : function (url, name, width, height) {
        var sw = $(window).width();
        var sh = $(window).height();

        if (typeof (width) == 'undefined') {
            width = sw - 150;
        }

        if (typeof (height) == 'undefined') {
            height = sh - 150;
        }

        var win_width = sw - 150 < width ? sw - 150 : width;
        var win_height = sh - 150 < height ? sh - 150 : height;
        var x_pos = Math.ceil ((sw - win_width) / 2);
        var y_pos = Math.ceil ((sh - win_height) / 2);
        var is_image = url.match (/(jpg|gif|jpeg|png|JPG|GIF|JPEG|PNG){1}$/);
        var is_yt = url.match (/(youtube)/);
        var create_doc = is_image || is_yt;
        var scrollable = is_image ? true : (is_yt ? false : true);
        var new_window = window.open (create_doc ? 'about:blank' : url, '', 'location=no,toolbar=no,adressbar=no,statusbar=no,scrollbars=' + (scrollable ? 'yes' : 'no') + ',width=' + win_width + ',height=' + win_height + ',top=' + y_pos + ',left=' + x_pos, true);

        if (create_doc) {
            with (new_window.document) {
                writeln ('<html>');
                writeln ('<head>');
                writeln ('<title>' + name + '</title>');
                writeln ('<style type="text/css">body,html{margin:0;pading:0;border:none;}</style>');
                writeln ('<meta http-equiv="imagetoolbar" content="false">')
                writeln ('</head>');
                writeln ('<body>');

                if (is_image) {
                    writeln('<img src="' + url + '" alt="' + name + '">');
                }
                else if (is_yt) {
                    var qs = url.substr (url.indexOf ('?'), url.length);
                    var ytcodel = qs.indexOf ('&') > 0 ? qs.indexOf ('&') : qs.length;
                    var ytcode = qs.substr (qs.indexOf ('v=') + 2, ytcodel);
                    writeln('<iframe title="YouTube video player" class="youtube-player" type="text/html" width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/' + ytcode + '" frameborder="0" allowFullScreen></iframe>');
                }

                writeln ('</body>');
                writeln ('</html>');
                close ();
            }
        }

        return new_window;
    }
};

})(jQuery);