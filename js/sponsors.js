gsap.registerPlugin(ScrollTrigger);

const columns = ["#column1", "#column2", "#column3", "#column4", "#column5", "#column6", "#column7", "#newcolumn1"];

columns.forEach((column, index) => {
    const direction = index % 2 === 1 ? -1 : 1;
    // const xOffset = window.innerWidth < 1000 ? direction * 1000 : direction * 1000;
    const opacity = window.innerWidth < 1000 ? 0 : 0;

    gsap.from(`${column} div`, {
        scrollTrigger: {
            trigger: `${column} div`,
            start: "top bottom",
            end: "bottom 80%",
            scrub: window.innerWidth < 1000 ? 1 : 0.5,
            // scrub: 0.5,
            markers: false,
            toggleActions: "restart pause reverse pause",
        },
        opacity: opacity,
        opacity: 0,
        duration: 0.1,
        ease: "power1.inOut",
    });
});