gsap.registerPlugin(ScrollTrigger);

const columns = document.querySelectorAll('.row-div');

columns.forEach((column) => {

    gsap.from(column, {
        scrollTrigger: {
            trigger: column,
            start: "top bottom",
            end: "bottom 50%",
            scrub: window.innerWidth < 1000 ? 1 : 0.5,
            markers: false,
            toggleActions: "restart pause reverse pause",
        },
        opacity: 0,
        duration: 0.1,
        ease: "power1.inOut",
    });
    gsap.from(column, {
        scrollTrigger: {
            trigger: column,
            start: "top top",
            end: "bottom 50%",
            scrub: window.innerWidth < 1000 ? 1 : 0.5,
            markers: false,
            toggleActions: "restart pause reverse pause",
        },
        opacity: 1,
        duration: 0.1,
        ease: "power1.inOut",
    });
});