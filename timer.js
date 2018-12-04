
class Timer {
    constructor(){
        this.time = 60;
        this.timerId = '';
        this.isRunning = false;

        this.DOMElement = document.getElementById('sec');
        this.endgame = document.querySelector('#endgame');
        this.losegame = document.querySelector('#losegame');
    }

    timerRun(){
        // начать повторы с интервалом 1 сек
        this.timerId = setInterval( () => {
            if(this.time > 0) {
                this.time -= 1;
                this.DOMElement.textContent = this.time >=10 ?  this.time : '0' + this.time;
                this.isRunning = true;
            }else {
                this.timerStop();
                this.isRunning = false;
                this.timeIsOver()
            }
        }, 1000);
    }

    timerStop(){
        clearInterval(this.timerId);
        this.isRunning = false;
    }

    startNewTimer(){
        this.timerStop();
        // this.time = 60;
        this.DOMElement.textContent = this.time;
        this.isRunning = true
        this.timerRun();
    }

    timeIsOver(){
        this.endgame.style.display = 'block';
        this.losegame.style.display = 'block';
    }

    setTime(time){
        this.time = time || 60;
        this.DOMElement.textContent = this.time;
    }


}


















