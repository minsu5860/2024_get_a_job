//뱀의 이동 방향
let inputDir = {
    x: 0,
    y: 0
}; 

//게임 속도
let speed = 5;

//마지막으로 화면을 그린 시간
let lastPaintTime = 0;

//뱀 배열 초기화
let snakeArr = [{
    x: 13,
    y: 15
}];

//음식 초기 위치
food = {
    x: 6,
    y: 7
};

//점수 초기화
let score = 0;

//게임 함수
function main(ctime){
    window.requestAnimationFrame(main); //애니메이션 프레임 요청
    if((ctime - lastPaintTime) / 1000 < 1 / speed){
        return;  //지정된 속도에 따라 화면을 그리는 시간 조정
    }
    lastPaintTime = ctime;
    gameEngine(); //게임 로직 실행
}

//충돌 확인 함수
function isCollide(snake){
    //자기 자신과 부딪혔는지 확인
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //벽과 부딪혔는지 확인
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

//게임 엔진 함수
function gameEngine(){
    //뱀 배열 및 음식 업데이트
    if(isCollide(snakeArr)){
        inputDir = {
            x: 0,
            y: 0
        }; //뱀의 이동 방향 초기화
        alert("Game OVer. Press Any Key To COntinue"); //게임 오버 메시지
        snakeArr = [{
            x: 13,
            y: 15
        }]; //뱀 초기 위치
        score = 0; //점수 초기화
        scoreBox.innerHTML = 'Score : ' + score; //점수 표시 업데이트
    }

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1;  //점수 증가
        if(score > hiscoreval){
            hiscoreval = score; //최고 점수 업데이트
            localStorage.setItem('hisore', JSON.stringify(hiscoreval));  //로컬 스토리지에 저장
            hiscoreBox.innerHTML = 'Hi Score : ' + hiscoreval;  //최고 점수 표시 업데이트
        }
        scoreBox.innerHTML = 'Score : ' + score;  //현재 점수 표시 업데이트
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });  //뱀 길이 증가
        let a = 2;
        let b = 16;

        food = {
            x: Math.round(a + (b - 1) * Math.random()),
            y: Math.round(a + (b - 1) * Math.random())
        };  //음식 위치 재설정
    }

    //뱀이동
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {
            ...snakeArr[i]
        };
    }
    snakeArr[0].x += inputDir.x;  //뱀 머리의 x좌표 이동
    snakeArr[0].y += inputDir.y;  //뱀 머리의 y좌표 이동

    //뱀과 음식을 화면에 표시
    //뱀 표시
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');  //뱀의 머리
        }else{
            snakeElement.classList.add('snake'); //뱀의 몸통
        }
        board.appendChild(snakeElement);
    });

    //음식 표시
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hisore = localStorage.getItem("hiscore");

if(hisore === null){
    hiscoreval = 0;  //최고 점수가 없을 경우 초기화
    localStorage.getItem("hiscore", JSON.stringify(hiscoreval));
}else{
    hiscoreval = JSON.parse(hisore);  //로컬 스토리지에서 최고 점수 가져오기
    hiscoreBox.innerHTML = "HI Score : " + hisore;  //최고 점수 표시 업데이트
}

window.requestAnimationFrame(main);  //메인 게임 함수 호출
window.addEventListener('keydown', e => {
    inputDir = {
        x: 0,
        y: 1
    };  //기본 이동 방향 설정

    switch(e.key){
        case "ArrowUp":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = -1;  //위쪽 방향
            break;
        case "ArrowDown":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = 1;  //아래쪽 방향
            break;
        case "ArrowLeft":
            console.log(e.key);
            inputDir.x =-1;
            inputDir.y = 0;  //왼쪽 방향
            break;
        case "ArrowRight":
            console.log(e.key);
            inputDir.x = 1;
            inputDir.y = 0;  //오른쪽 방향
            break;
        default:
            break;
    }
});

