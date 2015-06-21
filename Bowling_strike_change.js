
var statusAfterHit = {
	usual : 0,
	strike : 1,
	spare : 2
};

var GameStatus = {
	totalBalls : 10,
	throwsLeft : 10,
	totalPoints : 0,
	throwNumber : 0,
	statusAfterHit :0,
	hitsRecord : []
};

function ThrowStatus(firstResult, secondResult, statusAfterHit){
	this.firstResult = firstResult;
	this.secondResult = secondResult;
	this.statusAfterHit = statusAfterHit;
}
var throwBallFirstTime = function(){
	var ballsHit = Math.floor(Math.random() * (GameStatus.totalBalls+1));
	return ballsHit;
};

var throwBallSecondTime = function(ballsHit){
	var ballsLeft = GameStatus.totalBalls - ballsHit;
		this.ballsHit = Math.floor(Math.random() * (ballsLeft+1));
	return this.ballsHit;
};

var throwBalls = function(){
	var firstHitResult,
		secondHitResult;

	for (var i = 1; i <= GameStatus.totalBalls; i++) {
		firstHitResult = throwBallFirstTime();
		if(firstHitResult!==GameStatus.totalBalls && GameStatus.throwsLeft !== 0) {
			secondHitResult = throwBallSecondTime(firstHitResult);
		}
		GameStatus.hitsRecord.push( new ThrowStatus(firstHitResult, secondHitResult,checkStatus(firstHitResult,secondHitResult)));
	}
};

var doLastThrow = function(){

}

var checkStatus = function(firstResult, secondResult){
	var status;
	if(firstResult===GameStatus.totalBalls) {
		status = statusAfterHit.strike;
	}else if(firstResult +secondResult === GameStatus.totalBalls){
		status = statusAfterHit.spare;
	}else{
		status = statusAfterHit.usual;
	}
	return status;
};


var countPoints = function(){
	GameStatus.hitsRecord.map(function(throwInformation){
		if (throwInformation.statusAfterHit === statusAfterHit.strike) {
			countPointsForStrikes(throwInformation, GameStatus.throwNumber + 1);
		} else if (throwInformation.statusAfterHit === statusAfterHit.spare) {
			countPointsForSpare(throwInformation, GameStatus.throwNumber);
		} else {
			countPointsForUsualHit(throwInformation);
		}
		GameStatus.throwNumber += 1;
	});

};

var countPointsForStrikes = function(throwInformation, nextThrowNumber){
		if(GameStatus.hitsRecord[nextThrowNumber].statusAfterHit === statusAfterHit.strike){
			GameStatus.totalPoints += GameStatus.totalBalls*2 + GameStatus.hitsRecord[nextThrowNumber+1].firstResult;
		}else{
			GameStatus.totalPoints += GameStatus.totalBalls + GameStatus.hitsRecord[nextThrowNumber].firstResult
			+ GameStatus.hitsRecord[nextThrowNumber].secondResult;
		}
};

var countPointsForSpare = function(throwInformation, nextThrowNumber){
		GameStatus.totalPoints += GameStatus.totalBalls + GameStatus.hitsRecord[nextThrowNumber].firstResult;
};

var countPointsForUsualHit = function(throwInformation){
	GameStatus.totalPoints += throwInformation.firstResult + throwInformation.secondResult;
};

var playBowling = function() {
	throwBalls();
	countPoints();
	console.log(GameStatus.totalPoints);
};

playBowling();