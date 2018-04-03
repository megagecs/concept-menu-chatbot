$(document).ready(function() {

    $('.click').click(function () {
        $('.slider').toggle("slide", {
            direction: "right",
            distance: 180
        }, 500);
    });
});