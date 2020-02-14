var Naratteu = Naratteu || {};

Naratteu.GetCharXY = function(id) {
	if(id == -1)
		return {x: $gamePlayer.x, y: $gamePlayer.y};
	return {x: $gameMap.event(id).x, y: $gameMap.event(id).y};
};
Naratteu.GetCharDist = function(id1,id2) {
	return Naratteu.GetDist(Naratteu.GetCharXY(id1),Naratteu.GetCharXY(id2));
};
Naratteu.GetDist = function(xy1,xy2) {
	return Math.sqrt(Math.pow(xy1.x - xy2.x,2) + Math.pow(xy1.y - xy2.y,2));
};

Naratteu.PROJ_Boss1StompP = function(sid) {
	//보스가 점프해 내려찍기 공격 하고나서 파티클 튀기는거
	Naratteu.PROJdir8(sid,5,6,'s_red(3,2)',1,'c(3)|',[1],[],null,200,null);
}
Naratteu.PROJdir8 = function(sid, speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	Galv.PROJ.dir(sid,1,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,2,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,3,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,4,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,6,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,7,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,8,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
	Galv.PROJ.dir(sid,9,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
};

Naratteu.PROJRelative = function(sid,tgt, speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	var ev = $gameMap.event(sid);
	Galv.PROJ.atTarget(sid,{x: ev.x + tgt[0], y: ev.y + tgt[1]},speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
};

Naratteu.FrontCheck = function(eid) {
	//특정이벤트의 바로앞에 주인공이 있는지 체크
	var ev = $gameMap.event(eid);
	switch(ev.direction())
	{
		case 4: return $gamePlayer.pos(ev.x-1,ev.y);
		case 8: return $gamePlayer.pos(ev.x,ev.y-1);
		case 6: return $gamePlayer.pos(ev.x+1,ev.y); 
		case 2: return $gamePlayer.pos(ev.x,ev.y+1);
	}
	return false;
}

Naratteu.JumpToAvg2 = function(jumperId,eid) {
	var jumper = (jumperId == -1) ? $gamePlayer : $gameMap.event(jumperId);
	var tgt = (eid == -1) ? $gamePlayer : $gameMap.event(eid);
	
	tgt = Naratteu.AvgXY(jumper, tgt);
	tgt = Naratteu.AvgXY(jumper, tgt);
	jumper.jumpToPoint(tgt.x,tgt.y);
}
Naratteu.JumpToAvg = function(jumperId,eid) {
	var jumper = (jumperId == -1) ? $gamePlayer : $gameMap.event(jumperId);
	var tgt = (eid == -1) ? $gamePlayer : $gameMap.event(eid);
	
	tgt = Naratteu.AvgXY(jumper, tgt);
	jumper.jumpToPoint(tgt.x,tgt.y);
}
Naratteu.AvgXY = function(xy1,xy2) {
	return {
		x: Naratteu.Avg(xy1.x, xy2.x),
		y: Naratteu.Avg(xy1.y, xy2.y)
	};
}
Naratteu.Avg = function(a,b) {
	return (a+b)/2;
}

Naratteu.PROJboss1Spin0to7 = function(sid, count) {
	var shooter = $gameMap.event(sid);
	dirArr = [
		[[-2,0],[2,0]],
		[[-2,-1],[2,1]],
		[[-2,-2],[2,2]],
		[[-1,-2],[1,2]],
		[[0,-2],[0,2]],
		[[1,-2],[-1,2]],
		[[2,-2],[-2,2]],
		[[2,-1],[-2,1]]
	];
	var curr = dirArr[count];
	var xy1 = {x: shooter.x + curr[0][0], y: shooter.y + curr[0][1]};
	var xy2 = {x: shooter.x + curr[1][0], y: shooter.y + curr[1][1]};
	Galv.PROJ.atTarget(sid,xy1,5,4,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
	Galv.PROJ.atTarget(sid,xy2,5,4,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
}
Naratteu.PROJenemyRandSlow = function(sid) {
	var aim = Naratteu.PROJAimShake3x3($gameMap.event(sid), $gamePlayer);
	if (aim != null)
	{
		var speed = 5 - Math.randomInt(3);
		Galv.PROJ.atTarget(sid,aim,speed,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
	}
}
Naratteu.PROJenemyRandLineShort = function(sid) {
	var aim = Naratteu.PROJAimShake3x3($gameMap.event(sid), $gamePlayer);
	if (aim != null)
	{
		Galv.PROJ.atTarget(sid,aim,8,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,7,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,6,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
	}
}
Naratteu.PROJenemyRandLine = function(sid) {
	var aim = Naratteu.PROJAimShake3x3($gameMap.event(sid), $gamePlayer);
	if (aim != null)
	{
		Galv.PROJ.atTarget(sid,aim,8,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,7,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,6,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,5,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
		Galv.PROJ.atTarget(sid,aim,4,6,'s_yellow(3,2)',1,'c(3)|',[1],[],null,200,null);
	}
}
Naratteu.PROJAimShake3x3 = function(xyShooter, xyTarget) {
	//조준된 내용을 일부러 부정확하게 바꿈
	var tgt = {x: xyTarget.x, y: xyTarget.y}; //값이 수정되기때문에 값복제
	var tgt_r = {x: tgt.x - xyShooter.x, y: tgt.y - xyShooter.y};//타겟 릴레이티브 상대 좌표
	var taxi_dist = Math.abs(tgt_r.x) + Math.abs(tgt_r.y);//택시기하거리
	if(taxi_dist != 0) {
		if(taxi_dist <= 2) {
			tgt.x += tgt_r.x;
			tgt.y += tgt_r.y;
		}
		tgt.x += Math.randomInt(3)-1;
		tgt.y += Math.randomInt(3)-1;
		return tgt;
	}
	return null;//자기자신을 조준하면 이상하게 날아가서 쏘지말라고 null
}

Naratteu.PROJshotgun = function() {
	var tgt = {x: $gameMap.canvasToMapX(TouchInput.x), y: $gameMap.canvasToMapY(TouchInput.y)};//마우스타겟좌표
	var tgt_r = {x: tgt.x - $gamePlayer.x, y: tgt.y - $gamePlayer.y};//타겟 릴레이티브 상대 좌표
	var taxi_dist = Math.abs(tgt_r.x) + Math.abs(tgt_r.y);//택시기하거리
	if(taxi_dist != 0) {
		if(taxi_dist <= 2) {
			tgt.x += tgt_r.x; tgt.y += tgt_r.y;
		}
		tgt.x += Math.randomInt(3)-1;
		tgt.y += Math.randomInt(3)-1;
		var speed = 16 - Math.randomInt(5);
		Galv.PROJ.atTarget(-1,tgt,speed,4,'s_yellow(3,2)',1,'|s(A:on)',[1],[],null,200,null);
	}
};

Naratteu.PROJRand = function(xyCenter) {
	var evC = (centerId == -1) ? $gamePlayer : $gameMap.event(centerId);
	var tgt = {x: x, y: $gameMap.canvasToMapY(TouchInput.y)};//마우스타겟좌표
	var tgt_r = {x: tgt.x - $gamePlayer.x, y: tgt.y - $gamePlayer.y};//타겟 릴레이티브 상대 좌표
	var taxi_dist = Math.abs(tgt_r.x) + Math.abs(tgt_r.y);//택시기하거리
	if(taxi_dist != 0) {
		if(taxi_dist <= 2) {
			tgt.x += tgt_r.x; tgt.y += tgt_r.y;
		}
		tgt.x += Math.randomInt(3)-1;
		tgt.y += Math.randomInt(3)-1;
		var speed = 16 - Math.randomInt(5);
		Galv.PROJ.atTarget(-1,tgt,speed,6,'s_yellow(3,2)',1,'|s(A:on)',[1],[],null,200,null);
	}
};

Naratteu.CharTargetArrowNum = function(centerId, targetId) {
	var evC = (centerId == -1) ? $gamePlayer : $gameMap.event(centerId);
	var evT = (targetId == -1) ? $gamePlayer : $gameMap.event(targetId);

	var angle = Naratteu.GetCharAngle(evC,evT);
	return Naratteu.angleToArrowNum(angle);
}
Naratteu.angleToArrowNum = function(angle) {
	switch(Naratteu.AngleDivide16(angle))
	{
		//num키 기준으로 번호에 방향 대응
		case 1:		case 2:		return 3;//'↘';
		case 3:		case 4:		return 2;//'↓';
		case 5:		case 6:		return 1;//'↙';
		case 7:		case 8:		return 4;//'←';
		case 9:		case 10:	return 7;//'↖';
		case 11:	case 12:	return 8;//'↑';
		case 13:	case 14:	return 9;//'↗';
		case 15:	case 0:		return 6;//'→';
	}
	return 0;//'?';
}
Naratteu.AngleDivide16 = function(angle) {
	//360분위로 나눠진 각도를 16분위로 나눕니다.
	angle = (angle + 360) % 360; //모두 양수가 되도록 변경
	return parseInt(angle*16/360);
}
Naratteu.GetCharAngle = function(center, target) {
	return Naratteu.calcAngleDegrees(target.y - center.y, target.x - center.x);
}
Naratteu.calcAngleDegrees = function(x, y) {
	return Math.atan2(y, x) * 180 / Math.PI;
	//console.log(calcAngleDegrees(1, 0));//→0
	//console.log(calcAngleDegrees(1, 1));//↘45
	//console.log(calcAngleDegrees(0, 1));//↓90
	//console.log(calcAngleDegrees(-1, 1));//↙135
	//console.log(calcAngleDegrees(-1, 0));//←180
	//console.log(calcAngleDegrees(-1, -1));//↖-135
	//console.log(calcAngleDegrees(0, -1));//↑-90
	//console.log(calcAngleDegrees(1, -1));//↗-45
}
  
  