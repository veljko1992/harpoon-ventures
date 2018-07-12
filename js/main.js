
let sectionID ;
let sectionPosition;

// smoth page scrool
$(".navigation-link").on("click", function (e) {
    e.preventDefault();
    sectionID = $(this).attr("href");
    console.log(sectionID);
    sectionPosition = $(sectionID).offset().top;
    console.log(sectionPosition);
    $("html, body").animate({
      scrollTop : sectionPosition
    }, 1000);
} );
