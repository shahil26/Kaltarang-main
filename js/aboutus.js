gsap.registerPlugin(ScrollTrigger);

const columns = document.querySelectorAll(".modal-content-wrapper");

columns.forEach((column) => {
    const opacity = window.innerWidth < 1000 ? 0 : 0;

    gsap.from(column, {
        scrollTrigger: {
            trigger: column,
            start: "top bottom",
            end: "bottom 80%",
            scrub: 0.5,
            markers: false,
            toggleActions: "restart pause reverse pause",
        },
        opacity: opacity,
        opacity: 0,
        duration: 5,
        ease: "power1.inOut",
    });
});

var countOptions = {
    useEasing: true,
    separator: ''
}
  
var count1 = new CountUp('mynum1', 0, 10000, 0, 5, countOptions)
  
count1.start(function() {
    $('#mynumrep1').text('FOOTFALL');
})

var count2 = new CountUp('mynum2', 0, 50, 0, 5, countOptions)

count2.start(function() {
    $('#mynumrep2').text('COLLEGES');
})

var count3 = new CountUp('mynum3', 0, 20, 0, 5, countOptions)

count3.start(function() {
    $('#mynumrep3').text('EVENTS');
})