$(function() {
	mo.hidebtns = ".answered, .passed, .nextround, .choosenParticipant";
	mo.question = 1;
	$(mo.hidebtns).hide();
	mo.page = $("body");
	mo.page.on("click","#startgame",function() {
		mo.utils.ax({queryout:9,querycolumns:mo.utils.pta()},function(t){});
		mo.utils.ax({queryout:1,querycolumns:mo.utils.pta()},function(t){
			var participants = [];
			for(var i in t) {
				participants.push({id:t[i].id,name:t[i].name});
			}
			$("#startgame").hide();
			mo.noOfParticipants = t.length;
			mo.random = (Math.floor(Math.random() * mo.noOfParticipants));
			$(".question .noValue").text(mo.question);
			$(".round1 .choosenParticipant").text(participants[mo.random].name);
			mo.choose = [];
			mo.choose.push({id:participants[mo.random].id,name:participants[mo.random].name});
			$(".round1 .answered,.round1 .passed,.round1 .nextround, .round1 .choosenParticipant").show();
			mo.page.on("click",".round1 .answered",function() {
				$(".scoreboard .scorebody").append('<tr><td>'+mo.question+'</td><td>'+mo.choose[0].name+'</td><td>100</td></tr>');
				mo.utils.ax({queryout:4,querycolumns:mo.utils.pta(mo.choose[0].id,mo.choose[0].name,100)},function(t){
					mo.random = (Math.floor(Math.random() * mo.noOfParticipants));
					$(".question .noValue").text(++mo.question);
					$(".round1 .choosenParticipant").text(participants[mo.random].name);
					mo.choose.length = 0;
					mo.choose.push({id:participants[mo.random].id,name:participants[mo.random].name});
				});
			});
			mo.page.on("click",".nextround",function(){
				$(mo.hidebtns).hide();
				mo.temp = parseInt($(this).parent().attr("class").split('round')[1]);
				mo.temp == 1?mo.temp=2:mo.temp==2?mo.temp=3:mo.temp=10;
				if(mo.temp!==10) {
					$(".round"+mo.temp+" .answered,.round"+mo.temp+" .passed,.round"+mo.temp+" .nextround").show();
				}
				mo.utils.ax({queryout:mo.temp,querycolumns:mo.utils.pta()},function(t) {
					if(mo.temp!==10) {
						mo.utils.ax({queryout:8,querycolumns:mo.utils.pta(mo.temp)},function(t){
							mo.noOfParticipants = t.length;
							var participants = [];
							for(var i in t) { 
								$(".round1top .round1topbody").append('<tr><td>'+i+'</td><td>'+t[i].name+'</td><td>'+t[i].points+'</td>');
								participants.push({id:t[i].id,name:t[i].name}); 
							}
							mo.random = (Math.floor(Math.random() * mo.noOfParticipants));
							// $(".question .noValue").text(++mo.question);
							$(".round"+mo.temp+" .choosenParticipant").text(participants[mo.random].name);
							mo.choose = [];
							mo.choose.push({id:participants[mo.random].id,name:participants[mo.random].name});
							$(".round"+mo.temp+" .answered,.round"+mo.temp+" .passed,.round"+mo.temp+" .nextround, .round"+mo.temp+" .choosenParticipant").show();
							mo.page.on("click",".round"+mo.temp+" .answered",function() {
								$(".scoreboard .scorebody").append('<tr><td>'+mo.question+'</td><td>'+mo.choose[0].name+'</td><td>100</td></tr>');
								mo.utils.ax({queryout:mo.temp+3,querycolumns:mo.utils.pta(mo.choose[0].id,mo.choose[0].name,100)},function(t){
									mo.random = (Math.floor(Math.random() * mo.noOfParticipants));
									$(".question .noValue").text(++mo.question);
									$(".round"+mo.temp+" .choosenParticipant").text(participants[mo.random].name);
									mo.choose.length = 0;
									mo.choose.push({id:participants[mo.random].id,name:participants[mo.random].name});
								});
							});
						});
					}
					else {
						$(".winner .chosenone").text(t[0].name);
					}
				});
			});
		});
	});
});
