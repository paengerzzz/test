$(document).ready(function(){	

//	setTimeout();

 $('body').append("<div id='my_dialog'></div>");

				  
	$('.selections').click(function() {
		var	type	=	$(this).html();
		
		$('.mnuoption').slideUp();	
		// if(type=="Alphalist"){
			// var empid= $('#memplid').val();
			// var_win('employeealphalistnew.php?emplid='+empid+'&year=2013&period=24','alphalist',1500,900);			
			
			// return;
		// }else 
		if(type=="Points"){
			var empid= $('#memplid').val();
			var_win('pointsystem.php?emplid='+empid,'PointsSystem',500,400);			
			
			return;
			
		}else if(type=="Scorecard"){
			var emplid= $('#memplid').val();
			var_win('scorecard.php?emplid='+emplid,'Scorecard',1200,600);			
			
			return;	
			
		
		}else if(type=="Plot Schedule"){
			var emplid= $('#memplid').val();
			$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
			
			$.ajax({
					type: "GET",
					url: "plotschedule.php",
					data: "emplid="+emplid,
					success: function(msg){		
						$('#container').html(msg);	
						
				}
			});
		
			return;
		}
		
		
		
		
		
		//if(type != 'DTR IS DISABLED'){
			
		$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
		
		
		
		
		
		if(type=="DTR"){
		
			//alert('DTR for year 2016 period 1 data migration is still on going thus the DTR is not fully updated due to prioritization of payslip reprocessing of period 24 year 2015. Escalation is not necessary, TAT will be 3:00AM Local');
		
			/*
			alert('DTR is temporarily Disabled for reprocessing');
			document.location.reload();									
				return;
			*/
			/*
			$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=checkmigration",
				success: function(msg){
					if(msg != ""){
							alert(msg);
					}								

				}
		
			});		
		
			*/
		}
		
		
		
		// else if(type=="Leave For Employee"){
			
			// var empid= $('#empid').val();
			// var leavtype= $('#leavtype').val();
						
			// $.ajax({
					// type: "GET",
					// url: "specialleavefiling.php",
					// data: "empid="+empid+"&leavtype="+leavtype,
					// success: function(msg){		
						// $('#container').html(msg);	
											
				// }
			// });
		
		// }
		
		
		
		$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=selection&type="+type,
				success: function(msg){
					//console.log(msg);
					// if(type == 'Overtime Applications')
					// 	viewovertime();
					
					$('#container').html(msg);
					
					
					readybtns();

			}
	
		});		
		//}
	});			

	
	
	$('#rpwd').keypress(function(e) {
		if(e.keyCode == 13) {
			updatepwd();
		}				
	});		
});


function addescalationshots(emplid,cdate){
	
	
	var_win('escalationscreenshot.php?emplid='+emplid+'&cdate='+cdate,'escalationshot',900,700);
	
}

function generatealphalist(){
	
	var empid= $('#memplid').val();
	var year= $('#year').val();
	
	
	if(year==2014){
		var_win('employeealphalistview.php?emplid='+empid+'&year=2014&period=24','alphalist',1500,900);			
	}else if(year==2015){
		var_win('employeealphalistview2015.php?emplid='+empid+'&year=2015&period=24','alphalist',1500,900);			
	

	//alert('Alphalist for 2014 is currently being recomputed');
	}else if(year==2013){
		//var_win('employeealphalistnew.php?emplid='+empid+'&year=2013&period=24','alphalist',1500,900);			
		alert('No records found');
	}else{
		alert('No records found');
	}

}	

function checkapprovers(emplid){
	var_win('checkapprovers.php?emplid='+emplid,'checkapprovers',500,400);			
}
function viewctc(emplid,year){
	var_win('ctcotc.php?emplid='+emplid+'&year='+year,'ctcotc',700,650);			
}			
function getctodetails(emplid,cdate){
	var_win('ctodetails.php?emplid='+emplid+'&cdate='+cdate,'ctodetails',900,600);			
}			
			
	
function removeapplication(seq,type){
	
	
	var reason ='';
	var reason=prompt("This application can no longer be approved since it is already past deadline for approval, this will be considered cancelled and Please provide reason for the late response of the " + type +" application. If there are special cases that needs to be approved, please send email to compben ","");
	$('.removecheck').attr('checked', false);	
	if (reason!=null && reason!='' ){
	
					
		$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=removeapplication&seq="+seq+"&type="+type+"&reason="+reason,
			success: function(msg){	
				 $('#'+seq).hide();
				//alert(msq);
			}
		});
		
		
	}
	
}	
	
function getfiledleaves(emplid,key,leavcode,date){
	
	$('#leavecontainer').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');	
			
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=getfiledleaves&emplid="+emplid+"&key="+key+"&leavcode="+leavcode+"&date="+date,
			success: function(msg){		
				
				$('#leavecontainer').html(msg);	
				
				
				
		}
	});

}


function verifydtr(seq){

	$('tr#check'+seq).attr("bgcolor","#D3D3D3");
	$('#btn'+seq).hide();
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=verifydtr&seq="+seq,
			success: function(msg){		
			
		}
	});		

}



function refreshParent() {
  window.opener.location.href = window.opener.location.href;

  if (window.opener.progressWindow)
		
 {
    window.opener.progressWindow.close()
  }
  window.close();
}




function myteam(){

	
	var emplid= $('#memplid').val();
	var cdate= $('#mdtrdate').val();
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');	
	
	/*
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=myteam",
			success: function(msg){		
				$('#container').html(msg);						
				readybtns();									
		}
	});
	
	*/
	$.ajax({
			type: "GET",
			url: "dtrlisting.php",
			data: "emplid="+emplid+"&cdate="+cdate,
			success: function(msg){		
				$('#container').html(msg);	
				
		}
	});
	

}


function getdirect(emplid){
	//$('.mnuoption').slideUp();		
	//$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
	$('#emp'+emplid).html('<table align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');

	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=getdirect&emplid="+emplid,
			success: function(msg){		
			
					var arrdata= JSON.parse(msg);
					if(arrdata[1]=== null){
					
						alert('no member/s found');
						
					}
						$('#emp'+arrdata[0]).html(arrdata[1]);
						readybtns();	
					
		}	
	});		

}


function changeesctype(){

	esctype = $('#esctype').val();

	
	$.ajax({
			type: "POST",
			url: "escalation.php",
			data: "view=chngleavtype&leavtype="+leavtype+"&memberid="+memberid,
			success: function(msg){		
				document.location.reload();									
		}
	});		


}

function updatewithdraw(stat,seq){

	var r= confirm("Are you sure you want to cancel or withdraw your leave? Once it is cancelled it cannot be revert back. You need to refile another application for the same date");
	if(r==false)	return;


	$.ajax({
			type: "POST",
			url: "application.php",
			data: "view=updatewithdraw&stat="+stat+"&seq="+seq,
			success: function(msg){							
				//$('#container').html(msg);						
									
				$('#widthraw'+seq).hide();
				$('#stat'+seq).html('Widtrawn');
				readybtns();	
		}			
	});		
}
function removeLeavapp(seq){
	$.ajax({
			type: "POST",
			url: "application.php",
			data: "removeLeav=1&seq="+seq,
			success: function(msg){								
			document.location.reload();				
		}			
	});	
}




function sendmails(){
	$.ajax({
			type: "POST",
			url: "application.php",
			data: "view=sendmails",
			success: function(msg){							
										
		}			
	});		

}



function logout(){
	//alert('test');	

	$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=logout",
		success: function(msg){
			document.location="index.php";
			
		}				
	});	

}

function removeappindb(type,seq){
		$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=removeappindb&type="+type+"&seq="+seq,
		success: function(msg){
			$('#container').html(msg);	
			readybtns();			
		}				
	});

}


function help(){
	//alert('test');
	$('.mnuoption').slideUp();
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
		
	$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=help",
		success: function(msg){
			$('#container').html(msg);	
			readybtns();
		}				
	});	

}



function home(){
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
		
	
	$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=home",
		success: function(msg){
			$('#container').html(msg);						
			 $('#date-input-3').calendar({
				parentElement: '#date-input-3-container',
				dateFormat: '%d.%m.%Y'							
			});	
			
			
		}				
	});		
	//sendmails();
}

function apply(){
	$('.mnuoption').slideUp();		
	if($('#viewapply').is(':visible')){
		$('#viewapply').slideUp();	
	}else{
		$('#viewapply').slideDown();
	}
	
}

function view(){	
	$('.mnuoption').slideUp();
	if($('#viewmenu').is(':visible')){
		$('#viewmenu').slideUp();	
	}else{
		$('#viewmenu').slideDown();
	}				
}

function chngpwd(){
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
		
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=chngpwd",
			success: function(msg){							
				$('#container').html(msg);							
		}			
	});					
}

function updatepwd(){
	//var nemail 	= $('#nemail').val();
	//var remail 	= $('#remail').val();
	var npwd 	= $('#npwd').val();
	var rpwd 	= $('#rpwd').val();
	
	if( npwd == '' || rpwd == ''){
	//|| nemail=='' || remail ==''
		alert('please supply all informations');
	
	//}else if(nemail != remail){
	//	alert('email address did not match');
	}else if(npwd != rpwd){
		alert('password did not match');
	}else{				
		$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=updatepwd&npwd="+npwd,
				success: function(msg){		
					
					alert('Successfully Updated');
					home();							
				}			
		});	
	}	
}


function viewsliplist(){
	var pyear	= $('#pyear').val();
	var ptype	= $('#ptype').val();
	var memplid = $('#memplid').val();
	
	var cyear	= $('#cyear').val();
	var cmonth 	= $('#cmonth').val();
	var cday 	= $('#cday').val();
	
	//$('.mnuoption').slideUp();		
	$('#loader').html('<img src="images/preloader1.gif" height="18px;">');
	
	if(ptype ==4 && pyear==cyear && cmonth==12 && cday>=3 && cday<=10 && memplid=='13630'){
	
		$.ajax({
				type: "GET",
				url: "13thmonthcurrentdeconfi.php",
				data: "confi=0&notlist=1&emplid="+memplid,
				success: function(msg){							
				$('#sliplist').html(msg);		
				$('#loader').html('');
			}

		});	
	
	
	
	
	}else if(ptype ==4 && pyear==cyear && cmonth==7 && cday>=2 && cday<=10 ){
		
		$.ajax({
				type: "GET",
				url: "13thmonthjune.php",
				data: "confi=0&notlist=1&emplid="+memplid,
				success: function(msg){							
				$('#sliplist').html(msg);		
				$('#loader').html('');
			}

		});	
	
	
		/*
		$.ajax({
				type: "GET",
				url: "13thmonthcurrentdeconfi.php",
				data: "confi=0&emplid="+memplid,
				success: function(msg){							
				$('#sliplist').html(msg);		
				$('#loader').html('');
			}

		});	
		*/
	//}else if(pyear<=2016){
	}else{
		$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=viewsliplist&pyear="+pyear+"&ptype="+ptype,
				success: function(msg){							
				$('#sliplist').html(msg);		
				$('#loader').html('');
			}

		});		
	}


}

function changecutoff(type){
	var pyear	= $('#pyear').val();
	var pperiod	= $('#pperiod').val();
	
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
	
	
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=changecutoff&type="+type+"&pyear="+pyear+"&pperiod="+pperiod,
			success: function(msg){							
				$('#container').html(msg);							
		}

	});		


}


function updatestatesc(seq,stat){

	if(stat=='not valid'){
		var description = prompt("Provide Details of invalid Escalation");		
		if (description==null || description==""){			
			window.confirm("Please type in the reason.");
			return false;
		}
		var bgcolor = "#E5EECC";
	}else if(stat=='checking'){
		var description = "Your escalation is now being checked, <br> please consider within 24 hours <br>for the feedback of resolution";
		var bgcolor = "#9933CC";
	}else if(stat=='resolved'){
		var description = "Your escalation is now resolved,<br> please check again. If it is still not resolved,<br> click on the unresolved button.";
		var bgcolor = "#99FF66";
		showMyDialog(seq);
		//alert('test');
	}else if(stat=='void'){
		var description = "This is escalation is void due to system issues and was previously resolved.,<br>  please consider current cut.off for new escalations.";

	}
	
	$.ajax({
		type: "POST",
		url: "escalation.php",
		data: "view=updatestatesc&seq="+seq+"&description="+description+"&stat="+stat,
		success: function(msg){		
			$("tr#tr_"+seq).attr('bgcolor',bgcolor);
			$("td#stat_"+seq).html(stat);
			if(stat == 'not valid')
				$("td#rem_"+description).html(description);
			//alert("successfully updated");
			
			readybtns();
		}	

	});
	
	
	
}


function updatelog(seq){
	
	var reason = prompt("Please specify reason for change of time log");
	
	
	
	
	if (reason!=null && reason!=""){
	//$('.mnuoption').slideUp();		
	//$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
	

		$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=updatelog&reason="+reason+"&seq="+seq,
				success: function(msg){			
					
					var arrdata= JSON.parse(msg);
					$('#seq'+arrdata[0]).css('color','blue');
					$('#seq'+arrdata[1]).css('color','black');					
					
					//$('#container').html(msg);							
			}
	
		});
				
				
	}else{
		alert("Cannot Proceed change without reason");
	
	}

}

function changefield(){
	
	var fieldtype=$('#esctype').val();
	
	if(fieldtype=='Mispelled Name' || fieldtype=='Incorrect Position Title' || fieldtype=='No Approver' || fieldtype=='Incorrect Approver' || fieldtype=='Incorrect Team Composition' || fieldtype=='ATM'){
		//$('#fields').html('Details <textarea size=5  onkeypress="return imposeMaxLength(event, this, 50);" style="width:90%;" id="details"> </textarea>');
		$("#fields").hide();
	}else{
		//$('#fields').html('Date From <input type="text" class="date" id="fdate">Date To <input type="text" class="date" id="tdate">');
		$("#fields").show();
		//$('#fields').html('Affected Date <input type="text" class="date" id="fdate">');
	}
	
	
	
	if(fieldtype=='Incorrect Schedule' || fieldtype=='No Schedule'){
		alert("This concern will be validated by the schedulers, please provide the affected dates on the textbox and submit your escalation");
	
	
	}else if(fieldtype=='Mispelled Name'){
		alert("This concern will be validated by Central Docs, please provide your correct spelled name on the details box and submit your escalation");
	}else if(fieldtype=='Leave not posted'){
		alert("Please make sure first that you have filed a leave in hrisonline and it has been approved already before submitting this escalation or else it will be considered invalid");
	}else if(fieldtype=='Interchanged Logs'){
		alert("This happens when you forgot to login, this will be check by admin for verification and adjustment, so that succeding dates will not be affected");
	}else if(fieldtype=='Uncredited Holiday'){
		alert("Please make sure first that you are not absent the day of holiday and the day before holiday");				
	}else if(fieldtype=='Incorrect Position Title'){
		alert("This concern will be validated by Central Docs, provide your correct position on the details box and make sure that it is your valid position based on your job contract signed"); 
	}else if(fieldtype=='No Approver' || fieldtype=='Incorrect Approver'){
		alert("This will be validated by workforce for operations and central docs for support groups, please provide your correct approver on the details box"); 
	}else if(fieldtype=='Time In Time Out'){
		alert("If your time logs did not reflect or incorrect, this will be validated by WORKFORCE and Webdev Department, please specify the affected dates"); 
	}else if(fieldtype=='Incorrect Team Composition'){
		alert("This will be validate by workforce, supply info on the details text box");
	}
	
		
	readybtns();
}


function sumbitdtr(seq){
	
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=sumbitdtr&seq="+seq,
			success: function(msg){		
				if(msg=='1'){
					alert('You cannot submit, You must verify first all the dates');
				}else{
					$('#container').html(msg);						
					readybtns();									
				}
		}

	});		

}

function changeteamid(){
	var teamid = $('#teamid').val();
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');

	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=selection&type=MyTeam&teamid="+teamid,
			success: function(msg){		
				$('#container').html(msg);						
				readybtns();											
		}

	});		


}
function viewslip(num){
	//console.log(num);
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=slip&num="+num,
			success: function(msg){		
				
				if(msg==1){								
					var_win('slip.php','slip',860,650);	
				}else {							
					//var_win('slip.php','slip'+num,720,430);	
					var_win('slip.php','slip',700,500);	
				}
				
				
										
		}

	});		
	
}

function viewslip2(num){
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=slip&num="+num,
			success: function(msg){		
				
				if(msg==1){								
					var_win('slip2.php','slip'+num,860,560);	
				}else {							
					var_win('slip2.php','slip'+num,720,430);	
				}
				
				
										
		}

	});		
	
}



function updateaccepted(){
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=updateaccepted",
			success: function(msg){		
				
				document.location.reload();
				//document.location="index.php";						
										
		}

	});		
	
}

function withpay(){
	if($('#balance').html()==0 || $('#balance').html()==''){
	   alert('You should have available balance');
	   $('#withpay').attr('checked', false);		
	}
}

function changeleavetypemember(){
	leavtype = $('#leavetype').val();
	memberid = $('#memberid').val();
	
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=chngleavtype&leavtype="+leavtype+"&memberid="+memberid,
			success: function(msg){		
				$('#container').html(msg);						
				readybtns();										
		}
	});		
	
}



function changeleavetype(){
	var leavtype = $('#leavetype').val();
	
	var ptoleavetype = $('#ptoleavetype').val();
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
	
	
	
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=chngleavtype&leavtype="+leavtype+"&ptoleavetype="+ptoleavetype,
			success: function(msg){		
				$('#container').html(msg);						
				readybtns();										
		}
	});		
	
}

function appcheck(stat){
	if(stat==1){
		$('.appcheck').attr('checked', true);
	}else{
		$('.appcheck').attr('checked', false);
	}

}

function markesc(stat){
	if(stat==1){
		$('.markesc').attr('checked', true);
	}else{
		$('.markesc').attr('checked', false);
	}

}

function escresponse(stat,seq){
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
		
		$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=escresponse&stat="+stat+"&seq="+seq,
				success: function(msg){
					$('#container').html(msg);					
					readybtns();

			}
	
		});	

}



function empsubmitesc(seq){

	var remarks = $('#remark'+seq).val();
	 $.ajax({
			type: "POST",
			url: "escalation.php",
			data: "view=empsubmitesc&seq="+seq+"&remarks="+remarks,
			success: function(msg){		
			//alert(msg);
			
				document.location.reload();									
			
			}

	});
}

function updateholpaid(seq,chkbox) {

// alert(seq);	
	if(chkbox.checked){
		
		var checked=1;
	}else{	
		
		var checked=0;
	}
	
	
	
	 $.ajax({
			type: "POST",
			url: "index.php",
			data: "view=updateholpaid&seq="+seq+"&checked="+checked,
			success: function(msg){		
					
			
			}

	});
	

}

function markescsubmit(){	
	 
	 var arr = new Array();
	 var arrremark = new Array();
	
	 var x=0;
	
	 var stop=0;
	 $('.markesc').each(function(){ 			 
		
		if (this.checked) {
			var seq =	$(this).val();
			var str = 	$('#remark'+seq).val();
		//	str = str.replace(/,/g,' ');	
		//	str = str.replace(/-/g,' ');	
		//	str = str.replace(/'/g,' ');	
		//	if(action=="0" && str==""){
		//		alert("Please provide all with remarks when it is disapproved");
		//		stop =1;
		//		return false;
		//	}	
			arr[x]	=	seq +'-'+str; 
			
			x = x+1;
			
		}	
	 });
	 
	
	
	if(arr.length > 0){
	 
		 $.ajax({
				type: "POST",
				url: "escalation.php",
				data: "view=marksubmit&seq="+arr,
				success: function(msg){		
				//alert(msg);
				
					document.location.reload();									
				
				}
	
		});	
	}else if(stop == 0){
		alert('Please select some applications');
	}	
	
	
}



function openhrisonline(emplid,cdate){

	
	var_win('viewdtr_withupdate.php?emplid='+emplid+'&cdate='+cdate,'DTR','max','max');		
	//var_win('viewdtr_withupdate.php?emplid='+emplid,'DTR',1100,800);		

}


function openhrisonlinemgr(emplid,cdate){

	
	var_win('viewdtr_withupdate.php?mngr=1&emplid='+emplid+'&cdate='+cdate,'DTR','max','max');		
	//var_win('viewdtr_withupdate.php?emplid='+emplid,'DTR',1100,800);		

}

function openviewdtr(emplid,cdate){

	
	var_win('viewdtr.php?mngr=1&emplid='+emplid+'&cdate='+cdate,'DTR','max','max');		
	//var_win('viewdtr_withupdate.php?emplid='+emplid,'DTR',1100,800);		

}

function opendtr(emplid,year,period){

	
	var_win('viewdtr2.php?emplid='+emplid+'&year='+year+'&period='+period,'DTR','max','max');		
	

}




/*
function openhrisonline(seq){
	 	
	var_win('login.php?action=login&escseq='+seq,'hrisonline',1100,800);		
	

}
*/

function exportescalation(){	
	
	 var type = $('#esctype').val();
	
	 document.location.href="exportescalation.php?type="+type;

}


function viewforsanctions(){
	var_win('pointsystemissued.php','forsanction',1800,1300);
}


function viewapplication(type,apptype){
	
	if(type=='approving'){
		var_win('application.php?type='+type+'&apptype='+apptype,'application',1500,1300);	
	
	}else if(type=='cancelling'){
		var_win('application.php?type='+type+'&apptype='+apptype,'application',1500,1300);	
	}else{
		var_win('application.php?type='+type,'application',1500,1300);	
	}
	
}
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}


function appsubmit(){
	var viewingapptype = $('#viewingapptype').val();
	var actionapp = $('#actionapp').val();
	if(viewingapptype=="cancelling" && actionapp=="1"){	
		var r= confirm("Are you sure you want to cancel the selected approved applications?");			
		if(r==false){
			return;
		}	
	}	
	
	
	var tab = $(".ui-tabs-active").children().attr('href');
	if(tab == '#leave' || tab == '#leaveDisapproved'){
		var typeq='leave';
	}else if(tab == '#overtime'){

		var typeq='overtime';
	}else{
		var typeq=$('#apptype').val();
	}

	 var arr = new Array();
	 var arrremark = new Array();
	
	 var x=0;

	 var action = $('#actionapp').val();
	 var apptype = typeq;
	 var stop=0;
	 $('.appcheck').each(function(){ 			 
		
		if (this.checked) {
			var seq =	$(this).val();
			var str = 	$('#remark'+seq).val();
			str = str.replace(/,/g,' ');	
			str = str.replace(/-/g,' ');	
			str = str.replace(/'/g,' ');	
			if(action=="0" && str=="" && viewingapptype=="approving" ){
				alert("Please provide all with remarks when it is disapproved");
				stop =1;
				return false;
			}	
			if(viewingapptype=="cancelling" && action=="1"  && myTrim(str)==""){
				alert("Please provide reason of cancelling the selected approved leave application");
				stop =1;
				return false;
			}
			
			
			arr[x]	=	seq +'-'+str; 
			
			x = x+1;
			
		}	
	 });
	 
		

	if(arr.length > 0){
	 
		 $.ajax({
				type: "POST",
				url: "application.php",
				data: "view=appsubmit&actionapp="+action+"&seq="+arr+"&apptype="+apptype,
				success: function(msg){		
					location.reload();
				//alert(msg);					
					
					//if(msg > 0){
				//	document.location.reload();									
				//	}else{
					//	if(window.opener != null && !window.opener.closed && typeof opener.document.forms['reload'] != 'undefined'){opener.document.forms['reload'].submit();}window.close();
					//if(tab != '#leave'){
						refreshParent();
					//}
						//home();
					//}					
			}
	
		});	
	}else if(stop == 0){
		alert('Please select some applications');
	}	
	
	
}

function changeleavdate(){
		var leavdate = $('#leavdate').val();
		$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=selection&type=Leave Application&leavdate="+leavdate,
				success: function(msg){
					$('#container').html(msg);
					$('.mnuoption').slideUp();
					
					if ($('#dtfrom').is(':visible')) {  
						var dtfrom  = $('#dtfrom').val();						
						var dtto	= $('#dtto').val();
						var d1 = new Date(dtfrom);
						var d2 = new Date(dtto);	
						if($('#dtto').is(':visible')){
							if(dtfrom!='' && dtto!=''){
								var numdays = DateDiff.inDays(d1, d2);							
								if(numdays > 0 ){											
									$('#numdays').val(numdays);
								}else{
									alert('Select Appropriate Date Range');
									$(this).val('');
									$('#numdays').val('');
								}
							}else{
								$('#numdays').val("1");
					
							}	
						}
						$('#tmfrom').val('');						
						$('#tmto').val('');
					}else{
						$('#numdays').val("1");
					
					}
					
					readybtns();
			}	
		});			

}

function exportleave(){
		var month =  $('#pmonth').val();
		var year =  $('#pyear').val();
		document.location.href="export.php?month="+month+"&year="+year;		
			
		
}

function exportpendingleave(){
		var month =  $('#pmonth').val();
		var year =  $('#pyear').val();
		document.location.href="exportpendingleave.php?month="+month+"&year="+year;		
			
		
}

function exportovertime(){
		var dfrom =  $('#dfrom').val();
		var dto =  $('#dto').val();
			document.location.href="exportovertime.php?dfrom="+dfrom+"&dto="+dto;		
		
}


function generalexport(action){
	var type = $('#transtype').val();
	document.location.href="generalexport.php?action="+action+"&type="+type;

}

function settranstype(type){
	$('#transtype').val(type);
	
}

function submitapp(apptype){

	if(apptype=="trip"){
		var dtfrom = $('#dtfrom').val();
		var dtto = $('#dtto').val();
		var numdays = $('#numdays').val();
		var reason = $('#reason').val();
		var fields="&dtfrom="+dtfrom+"&dtto="+dtto+"&numdays="+numdays+"&reason="+reason;
	
	
	}else if(apptype=="leave"){
		var leavetype = $('#leavetype').val();
		var alloc = $('#alloc').html();
		var used = $('#used').html();
		
		if($("#ptoleavetype").is(':visible')){
			var leavetype = $('#ptoleavetype').val();
			if(leavetype==''){
				alert('Please Select leave Type');
				return;
			}
		}
		
		
		
		if ($('#leavdate').is(':visible')) {  
			var dtfrom = $('#leavdate').val();
			var dtto = $('#leavdate').val();	
			var numdays = 1;						
		}else{
			var dtfrom = $('#dtfrom').val();
			if($("#dtto").is(':visible'))
				var dtto = $('#dtto').val();
			else
				var dtto = $('#dtfrom').val();
			var numdays = $('#numdays').val();
		}		
		
											
		var withpay = $('#withpay').attr('checked')?1:0;					
		var reason = $('#reason').val();	

		if(dtfrom=='' || dtto=='' || reason==''){					
			alert('Fill in mandated fields');
			return;

		}	
		
		
		if(withpay == 0 && leavetype!='174'){		
			var r= confirm("Are you sure you want to submit without pay leave? If your regularization is not yet updated please approach central docs. If it is updated, Please double check your leave balance and try to check if you have pending leave applications that are not approved due to cut-off deadline then have it cancelled/widthraw.");			
			if(r==false){
				return;
			}		
		}		
		
		
		if ($('#memberid').is(':visible')) {  
			var memberid = $('#memberid').val();
			
			var fields="&leavetype="+leavetype+"&alloc="+alloc+"&used="+used+"&dtfrom="+dtfrom+"&dtto="+dtto+"&numdays="+numdays+"&withpay="+withpay+"&reason="+reason+"&memberid="+memberid;
		}else{
			var fields="&leavetype="+leavetype+"&alloc="+alloc+"&used="+used+"&dtfrom="+dtfrom+"&dtto="+dtto+"&numdays="+numdays+"&withpay="+withpay+"&reason="+reason;
		}
	}else if(apptype=="overtime"){
		
		var ottype 		= $('#ptype').val();
		var date 		= $('#ddate').val();
		//var tmfrom 		= $('#tmfrom').val();
		//var tmto 		= $('#tmto').val();
		var numhours 	= $('#numhours').val();
		var purpose 	= $('#purpose').val();			

		/*
		if (numhours==''){
			alert('Incorrect Time from Time to Range');
			return;
		
		}
		*/
		if(date=='' ){					
			
			alert('Fill in mandated fields');
			return;

		}	
		if(numhours==0 ){	 
			alert('Please make sure that DTR for the specified date is already available or overtime should be filed after rendering');
			return;
		}
		//var fields="&ottype="+ottype+"&date="+date+"&tmfrom="+tmfrom+"&tmto="+tmto+"&numhours="+numhours+"&purpose="+purpose;
		var fields="&ottype="+ottype+"&date="+date+"&numhours="+numhours+"&purpose="+purpose;
	
	
	}
	
	$.ajax({
			type: "POST",
			url: "index.php",
			data: "view=submitapp&apptype="+apptype+fields,
			success: function(msg){							
			
				if(msg=='1'){
					alert('No more remaining allowable leave for that week, Operation Manager had reached the maximum allowable approve leave');
					changeleavdate();
				}else if(msg=='2'){	
					alert('Vacation leave or Birthday leave should be filed for the next month only');
					changeleavdate();
				}else if(msg=='8'){	
					alert('Vacation leave or Birthday leave should be filed 15 days ahead');
					changeleavdate();
				
				}else if(msg=='10'){	
					alert('Solo Parent leave should be filed 15 days ahead');
					changeleavdate();
				}else if(msg=='11'){	
					alert('Birthday leave should be filed on the same month of birthdate.');
					changeleavdate();
				}else if(msg=='3'){	
					alert('Deadline for scheduled leave application is every 15th of the current month.');
					changeleavdate();
				}else if(msg=='4'){	
					alert('Leave date can no longer be applied because it is beyond the cut-off deadline');
					changeleavdate();								
				}else if(msg=='5'){	
					alert('You have applied already on the specific dates');
					changeleavdate();						
				}else if(msg=='6'){	
					alert('You have applied already on the specific dates');										
					changeleavetypemember();
				}else if(msg=='7'){	
					alert('Specified leave date is already closed for application, 2 days after cut-off');										
					changeleavetypemember();					
				}else{							
					alert(msg);					
					home();
				}						
		}

	});	


}




var DateDiff = {
	inDays: function(d1, d2) {
		var t2 = d2.getTime();
		var t1 = d1.getTime();

		return parseInt((t2-t1)/(24*3600*1000)+1);
	},

	inWeeks: function(d1, d2) {
		var t2 = d2.getTime();
		var t1 = d1.getTime();

		return parseInt((t2-t1)/(24*3600*1000*7));
	},

	inMonths: function(d1, d2) {
		var d1Y = d1.getFullYear();
		var d2Y = d2.getFullYear();
		var d1M = d1.getMonth();
		var d2M = d2.getMonth();

		return (d2M+12*d2Y)-(d1M+12*d1Y);
	},
	
	inHours: function(d1, d2) {
		var t2 = d2.getTime();
		var t1 = d1.getTime();

		return parseFloat((t2-t1)/(3600*1000));
	},
	
	inYears: function(d1, d2) {
		return d2.getFullYear()-d1.getFullYear();
	}	
	
}		

		
function showDialog( Dialog ){
   $dialog = $('<div id="causediv"></div>');
   $dialog.html(Dialog.msg);
   $dialog.dialog({
   autoOpen: Dialog.autoOpen,
   title:Dialog.title ,
   modal:Dialog.modal,
   width:Dialog.width,
   height:Dialog.height,
   open:Dialog.open,
   complete:Dialog.complete,
   buttons:Dialog.buttons
   });
   $dialog.dialog('open');
  // return false;
}




function showMyDialog( seqid ){
 var cause_str ='<option>Delayed forwarding of schedule</option>';
  cause_str ='<option>Incorrect forwarded schedule</option>';
  cause_str +='<option>Delayed Biometrics Registration</option>';
  cause_str +='<option>Failure to log in Biometrics</option>';
  cause_str +='<option>Failure to log in Livestat</option>';
  cause_str +='<option>Failure to log in Both Bio and Livestat</option>';
  cause_str +='<option>Not Logged on Loggers</option>';
  cause_str +='<option>Incorrect Logged on Loggers</option>';
  cause_str +='<option>Incorrect System Timelog Capture';
  cause_str +='<option>Uncapture Timelog in the System';
  cause_str +='<option>Delayed Avaya Logs Uploading';
  cause_str +='<option>Incorrect System Computation</option>';
  cause_str +='<option>Incorrect System Plotting</option>';
  cause_str +='<option>On special training</option>';
  cause_str +='<option>Cancelled special training</option>';
  cause_str +='<option>Nesting</option>';
  cause_str +='<option>No Available Seat</option>';
  cause_str +='<option>Immediate Coaching</option>';
  cause_str +='<option>Avaya Max Call</option>';
  cause_str +='<option>Avaya System Issue</option>';
  cause_str +='<option>Off the Phone Reactivation Concerns</option>';
  cause_str +='<option>Off the Phone - (from Maternity/LOA)</option>';
  cause_str +='<option>Livestat Error</option>';
   $("#my_dialog").html("<select id='cause' >"+cause_str+"</select>");
   $("#my_dialog").dialog({
		title:"Provide Cause of Issue",
		modal:true,
		width:300,
		height:100,
		buttons:{ 'Submit':function(){
			var description = $('#cause').val();
			$("#causediv").empty();
			$.ajax({
				type: "POST",
				url: "escalation.php",
				data: "view=setcause&seqid="+seqid+"&description="+description,
				success: function(msg){
										
											
				}				
			});	
			//alert('Successuflly Submitted');
			//str='';
			
			// $(this).empty();
			// $(this).remove();									
			$(this).dialog('close');
			//$(this).dialog('destroy');
		
			//$('.ui-resizable-handle').remove();
			//$(this).hide();
		}}
}).dialog('open');		
								
   //$dialog.dialog('open');
  // return false;
}


function checkothours(){
	var ptype	= $('#ptype').val();
	var ddate =$('#ddate').val();
	$('#otsubmit').hide();
	$("#preloader").html('<img src="images/preloader1.gif" height="20px">');			
				
				
	$.ajax({
	type: "POST",
	url: "index.php",
	data: "view=checkothours&ddate="+ddate+"&ptype="+ptype,
	success: function(msg){
		$('#numhours').val(msg);
		$("#preloader").html('');
		$('#otsubmit').show();
	}		
	});

}

function submitspecial(){
	var empid= $('#empid').val();
	var leavtype= $('#leavtype').val();
	var leavdate= $('#leavdate').val();
	var num= $('#num').val();
	var balance= $('#balance').val();
	
	if(num==0 || empid=='' || leavdate==''){
		alert('please fill in mandatory entries');
	
	}else{
		$.ajax({
			type: "POST",
			url: "specialleavefiling.php",
			data: "view=specialfile&empid="+empid+"&leavtype="+leavtype+"&leavdate="+leavdate+"&num="+num+"&balance="+balance,
			success: function(msg){		
				if(msg!=''){
					alert(msg);
				}else{
					alert ("successfully submitted");
					document.location.reload();
				}
									
			}
		});
	
	}

}

function changetrans(){			

	var empid= $('#empid').val();
	var leavtype= $('#leavtype').val();
				


	$.ajax({
			type: "POST",
			url: "specialleavefiling.php",
			data: "view=viewspecialfileleave&empid="+empid+"&leavtype="+leavtype,
			success: function(msg){		
				$('#container').html(msg);	
				readybtns();					
		}
	});
						
	

}


function changeasofdate(){
	var asofdate = $('#asofdate').val();	
	var emplid=$("#emplid").val();
	
	
	$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=changeasofdate&asofdate="+asofdate+"&emplid="+emplid,
		success: function(msg){
			$('#container').html(msg);	
			readybtns();					
		
		}		
	});
	
}

  
function readybtns(){
// alert('sdfsdfsd');

	$('.btnhelp').click(function() {
		var	rel	=	$(this).attr("rel"); 
		
		if ($('#faq'+rel).is(':visible')) {  
			$('#faq'+rel).slideUp();
		}else{
			$('#faq'+rel).slideDown();
		
		}
		
	});	
	
	$('.normaldate').datepicker({			
		changeMonth: true,
		changeYear: true,
		
		onSelect: function(){	
				
				var leavtype	= $('#leavtype').val();
				var leavdate =$('#leavdate').val();
				var empid =$('#empid').val();
				
				
				
				$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=changedatespecialleave&leavdate="+leavdate+"&leavtype="+leavtype+"&empid="+empid,
				success: function(msg){
					$('#balance').val(msg);					
					$('#leavdate').val(leavdate)
				}		
				});
		}		
	});	
	
	$('.date').datepicker({			
		changeMonth: true,
		changeYear: true,
		
		onSelect: function(){										
			
			if ($('#asofdate').is(':visible')) {  
				
				changeasofdate();
				
				return;
			}
			
			
			if ($('#leavdate').is(':visible')) {  
				
				changeleavdate();
				return;
			}
	
			if ($("#emplid").is(":visible")) {  
				
				var ptype	= $('#ptype').val();
				var ddate =$('#ddate').val();
				var emplid =$('#emplid').val();
							
				$.ajax({
				type: "POST",
				url: "viewdtr_withupdate.php",
				data: "view=checkothours&ddate="+ddate+"&ptype="+ptype+"&emplid="+emplid,
				success: function(msg){
					$('#numhours').val(msg);					
					
				}		
				});
							
			}else if ($('#ptype').is(':visible')) {  
				
				checkothours();					
				
				
			} 
			
			
			if ($('#dtfrom').is(':visible')) {  
				var dtfrom  = $('#dtfrom').val();						
				var dtto	= $('#dtto').val();
				var d1 = new Date(dtfrom);
				var d2 = new Date(dtto);	
				if($('#dtto').is(':visible')){

					if(dtfrom!='' && dtto!=''){
						var numdays = DateDiff.inDays(d1, d2);							
						if(numdays > 0 ){											
							$('#numdays').val(numdays);
						}else{
							alert('Select Appropriate Date Range');
							$(this).val('');
							$('#numdays').val('');
						}
					}else{
						$('#numdays').val("1");
			
					}	
				}
				$('#tmfrom').val('');						
				$('#tmto').val('');
			}else{
				$('#numdays').val("1");
			
			}
		
		}
	
	});		
	
	
	
	
	$('.dtime').datetimepicker({
	
		ampm: true,
		
		onSelect: function(){	
			
			var tmfrom 	= 	$('#tmfrom').val();						
			var tmto   	= 	$('#tmto').val();
			var ptype 	= 	$('#ptype').val();
			var ddate	= 	$('#ddate').val();
			var purpose =	$('#purpose').val();
			
			var d1 = new Date(tmfrom);
			var d2 = new Date(tmto);
			
			var numhours = DateDiff.inHours(d1, d2);
		
			if(numhours >=0){											
				$('#numhours').html(numhours);
			}else{
				//alert('Select Appropriate Time Range');
				$(this).html('');
				$('#numhours').html('');
				numhours=0;
			}
			
			
			/*
			$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=selection&type=Overtime Application&ptype="+ptype+"&numhours="+numhours+"&ddate="+ddate+"&tmto="+tmto+"&tmfrom="+tmfrom+"&purpose="+purpose,
				success: function(msg){
					$('#container').html(msg);
					//$('.mnuoption').slideUp();
					readybtns();
				}		
			});	
			*/
		
			
		}
		
	});
				
	// return false;
	
}

function setagentid(agentid){
	$('.mnuoption').slideUp();		
	$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');

	$.ajax({
		type: "POST",
		url: "index.php",
		data: "view=setagentid&agentid="+agentid,
		success: function(msg){
			$('#container').html(msg);						
									
		}				
	});		
}

function submitesc(){

	var desc='';
	var fdate='';
	var tdate='';
	
	var type = $('#esctype').val();
	if($('#fdate').is(':visible')) {  	
		//var desc = $('#details').val();
		var fdate = $('#fdate').val();
	}else{
		var fdate = 0;
	}

	var desc = $('#details').val();
	
	if(type=="0" || (fdate=='' && $('#fdate').is(':visible'))){
	
		alert('Please Provid Mandatory Fields');
	}else{
		var r= confirm("Are you sure you want to submit the escalation?");

		if(r==true){
		
			
			$('.mnuoption').slideUp();		
			$('#container').html('<table style="margin-top:20%;" align="center"><tr><td><img src="images/preloader.gif"></td></tr></table>');
			
			
			
			$.ajax({
				type: "POST",
				url: "index.php",
				data: "view=sumbitescalation&type="+type+"&fdate="+fdate+"&desc="+desc,
				//data: "view=sumbitescalation&type="+type+"&fdate="+fdate+"&tdate="+tdate+"&desc="+desc,
				success: function(msg){
					
					if(msg=='1'){
						alert('You have already filed an escalation for the specified date');
						document.location.reload();
					}else if(msg=='2'){
						alert('Not successfully submitted! since DTR information is not yet available on the specified date');
						document.location.reload();
					}else if(msg=='3'){
						alert('Not successfully submitted! Application date is beyond 3 days deadline of affected Date.');
						document.location.reload();	
						
					}else{	
						alert("Successfully Submitted");
			
						$('#container').html(msg);						
					}						
				}				
			});		
		}
	}
		
}






function imposeMaxLength(Event, Object, MaxLen)
{
    return (Object.value.length <= MaxLen)||(Event.keyCode == 8 ||Event.keyCode==46||(Event.keyCode>=35&&Event.keyCode<=40))
}


function setlog(logdate,empid,log,trans,source){
	
	$.ajax({
		type: "POST",
		url: "exceptionlogs.php",
		data: "view=setlog&empid="+empid+"&log="+log+"&trans="+trans+"&source="+source+"&logdate="+logdate,
		success: function(msg){														
		
			alert('done updating');
		}

	});
	
	
	
}

function addshift(){
	var ctr= $("#hidden_id").val();
	var logdate= $("#date_manual"+ctr).html();
	var log= $("#shift_input"+ctr).val();
	var empid = $("#hidden_emp").val();
	log = log.toString();
	// var trans = $("#trans_manual").val();
	var myarr = log.split("-");
	var reason=prompt("Please provide reason for audit"," ");
	
	//alert (myarr[0]);
	if(reason!=" "){
		$.ajax({
			type: "POST",
			url: "uploadsched/myajax.php",
			data: "execute=updateWorkSched&reason="+reason+"&empid="+empid+"&endtime="+myarr[1]+"&starttime="+myarr[0]+"&xdate="+logdate+"&log="+log,
			success: function(msg){														
			
				alert(msg);
			}

		});
	}else{
	
		alert('update failed');
	}
}
function addlog(){
	var logdate= $("#date_manual").val();
	var log= $("#hidden_time").val();
	var empid = $("#hidden_emp").val();
	var trans = $("#trans_manual").val();
	// alert(2);
	$.ajax({
		type: "POST",
		url: "uploadsched/myajax.php",
		data: "execute=addlog&empid="+empid+"&log="+log+"&trans="+trans+"&source=manual&logdate="+logdate,
		success: function(msg){														
		
			alert('done updating');
		}

	});
}
function addlog2(){
	// alert(2);
	var ctr= $("#hidden_id").val();
	var kind = $("#hidden_kind").val();
	var logdate= $("#date_manual"+ctr).html();
	var log= $("#inputa"+ctr).val();
	var empid = $("#hidden_emp").val();
	var select_db = $("#select_db").val();
	if(kind==1)
	{
		log= $("#input"+ctr).val();
	}
	// alert("execute=addlog&empid="+empid+"&log="+log+"&trans="+kind+"&source=manual&logdate="+logdate);
	var reason=prompt("Please provide reason for audit"," ");
	
	
	if(ctr!='' &&  logdate!='' && empid!='' && reason!=" "){
		$.ajax({
			type: "POST",
			url: "uploadsched/myajax.php",
			data: "execute=addlog2&empid="+empid+"&log="+log+"&trans="+kind+"&source=manual&logdate="+logdate+"&reason="+reason+"&select_db="+select_db,
			success: function(msg){														
			
				alert('done updating, please reprocess');
			}

		});
	}else{
		alert('Update Failed');
	}
}
function cancel_in()
{
	var ctr= $("#hidden_id").val();
	var kind = $("#hidden_kind").val();
	if(kind==1)
	{
		$("#in"+ctr).html($("#hidden_time").val());
	}
	if(kind==8)
	{
		$("#out"+ctr).html($("#hidden_time").val());
	}
	if(kind==9)
	{
		$("#shift"+ctr).html($("#hidden_time").val());
	}
	clean();
	
}
function editshift(ctr,date){
	var lockperiod = $("#lockperiod").val();
	var schededit = $("#schededit").val();
	if(lockperiod==0 && schededit==1){
		cancel_in();
		var val = $("#shift"+ctr).html();
		val = val.replace(/\s+/g, ' ');
		if(val.substr(0,2)!='<i'){
		$("#hidden_time").val(val);
		$("#hidden_id").val(ctr);
		$("#hidden_kind").val(9);
		$("#shift"+ctr).html('<input type="text" id="shift_input'+ctr+'" class="dtime" style="width:150px" value="'+val+'"/>');
		// $(document).ready(function(){	
				
				// $('.dtime').datetimepicker({
		
					// ampm: true,
					
					// onSelect: function(){	

						
					// }
					
				// });	
			// });
		}
	}	
}
function clean()
{
	$("#hidden_time").val('');
	$("#hidden_id").val('');
	$("#hidden_kind").val('');
}
function editin(ctr,datein){
	var mngr = $("#mngr").val();
	var lockperiod = $("#lockperiod").val();
	var logedit = $("#logedit").val();
	if((mngr==0 && lockperiod==0) || (lockperiod==0 && logedit==1) ){
		cancel_in();
		var val = $("#in"+ctr).html();
		val = val.replace(/\s+/g, ' ');
		if(val.substr(0,2)!='<i'){
			$("#hidden_time").val(val);
			$("#hidden_id").val(ctr);
			$("#hidden_kind").val(1);
			$("#in"+ctr).html('<input type="text" id="input'+ctr+'" class="dtime" style="width:150px" value="'+datein+' '+val+'"/>');
			// $(document).ready(function(){	
					
					// $('.dtime').datetimepicker({
			
						// ampm: true,
						
						// onSelect: function(){	

							
						// }
						
					// });	
				// });
		}
	}	
}
function editout(ctr,dateout){
	var mngr = $("#mngr").val();
	var lockperiod = $("#lockperiod").val();
	var logedit = $("#logedit").val();
	if((mngr==0 && lockperiod==0) || (lockperiod==0 && logedit==1) ){
		cancel_in();
		var val = $("#out"+ctr).html();
		val = val.replace(/\s+/g, ' ');
		// alert(val.length);
		if(val.length<10){
		$("#hidden_time").val(val);
		$("#hidden_id").val(ctr);
		$("#hidden_kind").val(8);
		$("#out"+ctr).html('<input type="text" id="inputa'+ctr+'" class="dtime" style="width:150px" value="'+dateout+' '+val+'"/>');
		}
		else{
		
		// $("#out"+ctr).html($("#inputa"+ctr).val());
		}
	}	
}


/*	
$(window).unload( function () 
{ 
	refreshParent();
	//alert("Bye now!");

} );
*/


// setTimeout(function(){
    
        
			// $.ajax({
				// type: "POST",
				// url: "index.php",
				// data: "view=endsession",
				// success: function(msg){
												

				// }
		
			// });		
// }, 170000);
	
	
// function CheckBrowser(){

	// if(window.event.clientX < 0 && window.event.clientY <0){
		// alert('test');
	// }

// }