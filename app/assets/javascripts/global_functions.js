function accessibleClick(event) {
    if (event.type === 'click') {
        return true;
    } else if (event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            return true;
        }
    } else {
        return false;
    }
}

// global debug
if (window.location.href.indexOf("???") > -1) {
    // log and highlight the element with focus
    document.addEventListener('focus', function () {
        console.log('%c focused:  ', 'background: #222; color: yellow', document.activeElement);
        $(document.activeElement).addClass('debug');
    }, true);

}