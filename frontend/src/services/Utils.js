

export function loadRazorpayScript() {
    return new Promise((resolve) => {
        const script = document.createElememt("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload() = () => resolve(true);
        script.orerror = () => resolve(false);
        document.body.appendChild(script);
    });
};