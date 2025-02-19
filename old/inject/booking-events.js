if (window.ca) {
    window.ca.addEventListener('bookingEvent', (...args) => {
        console.log('Got booking event', ...args);
    })
}