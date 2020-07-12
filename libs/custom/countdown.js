class countdown {
    constructor(idObject, endDate) {
        this.idObject = idObject;
        this.countDownDate = endDate;
    }
    start() {
        // Set the date we're counting down to
        var countDownDate = this.countDownDate;

        // Update the count down every 1 second
        var x = setInterval(() => {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            var days = "00 : ",
                hours = "00 : ",
                minutes = "00 : ",
                seconds = "00";

            if (distance < 0) {
                days = '';
                hours = new Date(now).getHours().pad(2) + " : ";
                minutes = new Date(now).getMinutes().pad(2) + " : ";
                seconds = new Date(now).getSeconds().pad(2);
            } else {
                days = Math.floor(distance / (1000 * 60 * 60 * 24)).pad(2) + " : ";
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).pad(2) + " : ";
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).pad(2) + " : ";
                seconds = Math.floor((distance % (1000 * 60)) / 1000).pad(2);
            }
            document.getElementById(this.idObject).innerHTML = days + hours + minutes + seconds;
            document.getElementById(this.idObject).style = "animation-duration: .5s"
        }, 1000);
    }
}