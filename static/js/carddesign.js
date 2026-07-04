function getCardDesign(result){

 var studentsPerPageTxt=($("#studentsPerPageTxt").val()?$("#studentsPerPageTxt").val() :10);
    var cardProfile = result["cardProfile"];
    var data=result["stdData"];

    var CardColor = "#E5097F";
    if(cardProfile["textColor"] && cardProfile["textColor"])	CardColor=cardProfile["textColor"];

    var str = "";

    if(data &&data[0])
    {
        str +='<table class="tblprint" dir='+dir+' ><tr>';

        for (var i =0;i<data.length;i++)
        {

            var deanSign="/static/images/deans/"+data[i].ScopeID.replace(/\./g,"_")+".jpg";
            if($("#oneCardCheck").is(":checked")){
                str+=((i==0)?"":"</tr></table><table class='tblprint' dir='"+dir+"'><tr>");
            }else{
                if (i%studentsPerPageTxt==0 && i>0){
                    str+="</tr></table><table class='tblprint' dir='"+dir+"'><tr>";
                }else{
                    str+=(i%2==0 && i>0?'</tr><tr>':'');
                }
            }
            dictColors = {"1": "أسود|Black", "2": "رصاصي|Gray", "3": "أزرق|Blue", "4": "أحمر|Red", "5": "أخضر|Green",
                      "6": "برتقالي|Orange","7":"بني|Brown"}
            dictColors={"1":"#000000","2":"#999999","3":"#0000b3","4":"#cc0000","5":"#248f24","6":"#ff6600","7":"#392613"}
            var stuProg=getName(data[i]['progName']);
             var stuProgEn=getName(data[i]['progName'],'E');
            var univEmail=data[i]['univEmail']
            var stuNationalNum=data[i]['stuNationalNum']
            var PrintColor=cardProfile['default_print_color']//"#248f24";//"#E5097F";
            var textColor=cardProfile['textColor']//"#248f24";//"#E5097F";
            DaysNames="";
            if ("PrintColor" in data[i] &&data[i]['PrintColor']!="" ){
                PrintColor=dictColors[data[i]['PrintColor']];
                DaysNames=data[i]["DaysNames"];
            }
            var isOpen=String(stuProg).indexOf('(');
            var progtitle=(isOpen>0? String(stuProg).substring(isOpen,stuProg.length).replace(/\(/g," ").replace(/\)/g," "):getName(stuProg))
            var progN=(isOpen>0? String(stuProg).substring(0,isOpen):getName(stuProg));
            var EnterYear=data[i]["EnterYear"]
            var imgPath=data[i]["imgPath"]
            var AddLevelStd=false;
            // if ("AddLevelStd" in result){
            //      AddLevelStd=result['AddLevelStd']
            // }

            var stuData = {
                "studentCode":data[i]['studentCode'],
                "ScopeName":getName(data[i]['ScopeName']),
                "universityName":getName(data[i]['universityName']),
                "ScopeNameEn":getName(data[i]['ScopeName'],'E'),
                "ScopeID":data[i]['ScopeID'],
                "StuCode":data[i]['StuCode'],
                "stuName":getName(data[i]['name']),
                "stuNameEn":getName(data[i]['name'],'E'),
                "Level":((data[i]['ScopeID'].indexOf("1300.1.")==0 || data[i]['ScopeID'].indexOf("168.")==0)?"":getName('المستوى:|Level:')+'&nbsp;&nbsp;'+getName(data[i]['Level'])),
                "AcademicYearName":AcademicYearName,
                "AcademicSemesterNameDb":cardProfile['AcademicSemesterNameDb'],
                "stu_code_id":data[i]['stu_code_id'],
                "stuProg":stuProg,
                "stuProgEn":stuProgEn,
                "deanSign":deanSign,
                "univEmail":univEmail,
                "stuNationalNum":stuNationalNum,
                "EnterYear":EnterYear,
                "PrintColor":PrintColor,
                "textColor":textColor,
                "imgPath":imgPath,
                "stu_NID":data[i]['idNum'],
                "stu_NID_Type":data[i]['IDtype'],
                "stdStatus":getName(data[i]['stdStatus']),
                "LevelName":getName(data[i]['Level']),
                "LevelNameEn":getName(data[i]['Level'],'E'),
                "email":data[i]['email'],
                "show_nid":cardProfile['show_nid'],
                "show_code_id":cardProfile['show_code_id'],
                 "showStEmail":cardProfile['showStEmail'],
                "AddLevelStd":cardProfile['show_level'],
                "background_path":cardProfile['background_path'],
                "image_logo_path":cardProfile['image_logo_path'],
                "background_level":data[i]['background_level'],
                "background_color_faculty":cardProfile['background_color_faculty'],
                "color_content":cardProfile['color_content'],
                "color_faculty":cardProfile['color_faculty'],
                "color_enroll_year":cardProfile['color_enroll_year'],
                "color_signature_name":cardProfile['color_signature_name'],
                "show_program_flag":cardProfile['show_program_flag'],
                "show_bar_code":cardProfile['show_bar_code'],
                "dean_sign_exist":cardProfile['dean_sign_exist'],
                "width_card":cardProfile['width_card'],
                "height_card":cardProfile['height_card'],
                "width_student_image":cardProfile['width_student_image'],
                "height_student_image":cardProfile['height_student_image'],
                "spaces_between_lines":cardProfile['spaces_between_lines'],
                "logo_foundation":cardProfile['logo_foundation'],
                "show_level":cardProfile['show_level']

            };
            var horizontalDistance='';
            if ("horizontalDistance" in result) {
                horizontalDistance=result['horizontalDistance'];
            }
            if(horizontalDistance){
                var stylePadding='';
                if(i%2)
                    stylePadding=" padding-right:"+horizontalDistance+"mm";
                else
                    stylePadding=" padding-left:"+horizontalDistance+"mm";
            str +='<td class="" align="right" dir="rtl" style="'+stylePadding+';padding-bottom: 2.8mm">';

            }

            else if(ScopeID.indexOf("1300.74.")==0){
            str +='<td   style="padding: 0">';
                    }

            else if(ScopeID.indexOf("1.")==0|| ScopeID.indexOf("1300.")==0 ){
                str +='<td class="" align="right" dir="rtl" style=" padding-left: 4.5mm;padding-right: 1.5mm;'+(ScopeID.indexOf("1300.1.")==0 ?"":"padding-bottom: 2.8mm")+'">';
            }else{
                str +='<td class="tblprinttd" align="right" dir="rtl" >';
            }
            str+="<input type='checkbox' id='chooseID_"+stuData.StuCode+"'  data='"+stuData.StuCode+"' class='choosed' style='display:none;' >";
            if("print_function" in cardProfile && cardProfile['print_function'])
                str +=eval(cardProfile['print_function'])(stuData)
            else{
                if(ScopeID.indexOf("179.")==0)  str += MiniaCard(stuData);
                else if(ScopeID.indexOf("165.")==0)  str += AlexCard(stuData);
                else if(ScopeID.indexOf("166.")==0)  str += ScuCard(stuData);
                else if(ScopeID.indexOf("112.")==0)  str += ThebesCard(stuData);
                else if(ScopeID.indexOf("1.")==0)  str += MansCard(stuData);
                else if(ScopeID.indexOf("1605.")==0)  str += BanhaNU(stuData);
                else if(ScopeID.indexOf("1531.")==0)  str += MasnsNU(stuData);
                else if(ScopeID.indexOf("1300.13.")==0 ||  ScopeID.indexOf("1300.14.")==0 || ScopeID.indexOf("1300.16.")==0)  str += BadrCard(stuData);
                else if(ScopeID.indexOf("1300.1.")==0 )  str += MHietCard(stuData);
                else if(ScopeID.indexOf("1300.15.")==0 )  str += BadrMCICard(stuData);
                else if(ScopeID.indexOf("1300.18.")==0 )  str += MahlaCard(stuData);
                else if(ScopeID.indexOf("1300.12.")==0 )  str += AMICard(stuData);
                else if(ScopeID.indexOf("1300.22.")==0 )  str += IHICard(stuData);
                else if(ScopeID.indexOf("1400.")==0 )  str += EeluCard(stuData);
                else if(ScopeID.indexOf("861.")==0 )  str += MCICards(stuData);
                else if(ScopeID.indexOf("168.")==0 )  str += Helwan(stuData);
                else if(ScopeID.indexOf("250.")==0 )  str += NewValleyCard(stuData);
                else if(ScopeID.indexOf("170.")==0 )  str += Banha(stuData);
                else if(ScopeID.indexOf("162.5.")==0 )  str += cairoLaw(stuData);
                else if(ScopeID.indexOf("238.")==0 )  str += Sadat(stuData);
                else if(ScopeID.indexOf("944.")==0 )  str += Iaems(stuData);
                else if(ScopeID.indexOf("237.")==0 )  str += DamanhourCards(stuData);
                else str += DefaultCard(stuData);//continue width,height
            }


            str+='</td>';
            if(cardProfile["cardsPadding"]!="" &&parseInt(cardProfile["cardsPadding"]) && i%2==0)    str += "<td style='width:"+cardProfile["cardsPadding"]+"px;padding:0;'></td>";
        }
        str+="</tr></table>";
    }

    return str;
}


function getBusCardDesign(result){
    var cardProfile = result["cardProfile"];
    var data=result["stdData"];

    var CardColor = "#E5097F";
    if(cardProfile["textColor"] && cardProfile["textColor"])	CardColor=cardProfile["textColor"];

    var str = "";

    if(data &&data[0])
    {
        str +='<table class="tblprint" dir='+dir+' ><tr>';

        for (var i =0;i<data.length;i++)
        {

            var deanSign="/static/images/deans/"+data[i].ScopeID.replace(/\./g,"_")+".jpg";
            if($("#oneCardCheck").is(":checked")){
                str+=((i==0)?"":"</tr></table><table class='tblprint' dir='"+dir+"'><tr>");
            }else{
                if (i%10==0 && i>0){
                    str+="</tr></table><table class='tblprint' dir='"+dir+"'><tr>";
                }else{
                    str+=(i%2==0 && i>0?'</tr><tr>':'');
                }
            }
            dictColors = {"1": "أسود|Black", "2": "رصاصي|Gray", "3": "أزرق|Blue", "4": "أحمر|Red", "5": "أخضر|Green",
                      "6": "برتقالي|Orange","7":"بني|Brown"}
            dictColors={"1":"#000000","2":"#999999","3":"#0000b3","4":"#cc0000","5":"#248f24","6":"#ff6600","7":"#392613"}
            var stuProg=getName(data[i]['progName']);
            var univEmail=data[i]['univEmail']
            var stuNationalNum=data[i]['stuNationalNum']
            var subscriptionNo=data[i]['subscriptionNo'];
            var Itenerary=data[i].Itenerary;
            var PrintColor=cardProfile['default_print_color']//"#248f24";//"#E5097F";
            var textColor=cardProfile['textColor']//"#248f24";//"#E5097F";
            DaysNames="";
            if ("PrintColor" in data[i] &&data[i]['PrintColor']!="" ){
                PrintColor=dictColors[data[i]['PrintColor']];
                DaysNames=data[i]["DaysNames"];
            }
            var isOpen=String(stuProg).indexOf('(');
            var progtitle=(isOpen>0? String(stuProg).substring(isOpen,stuProg.length).replace(/\(/g," ").replace(/\)/g," "):getName(stuProg))
            var progN=(isOpen>0? String(stuProg).substring(0,isOpen):getName(stuProg));
            var EnterYear=data[i]["EnterYear"]
            var imgPath=data[i]["imgPath"]

            var stuData = {
                "ScopeName":getName(data[i]['ScopeName']),
                "ScopeID":data[i]['ScopeID'],
                "StuCode":data[i]['StuCode'],
                "studentCode":data[i]['studentCode'],
                "stuName":getName(data[i]['name']),
                "Level":(ScopeProgType == "Credit" ?getName('المستوى:|Level:'):"")+'&nbsp;&nbsp;'+getName(data[i]['Level']),
                "AcademicYearName":AcademicYearName,
                "stu_code_id":data[i]['stu_code_id'],
                "stuProg":stuProg,
                "deanSign":deanSign,
                "univEmail":univEmail,
                "stuNationalNum":stuNationalNum,
                "EnterYear":EnterYear,
                "PrintColor":PrintColor,
                "textColor":textColor,
                "imgPath":imgPath,
                "stu_NID":data[i]['idNum'],
                "stdStatus":getName(data[i]['stdStatus']),
                "LevelName":getName(data[i]['Level']),
                "subscriptionNo":data[i]['subscriptionNo'],
                "Itenerary":data[i]['Itenerary']}


            if(ScopeID.indexOf("1.")==0|| ScopeID.indexOf("1300.")==0){
                str +='<td class="" align="right" dir="rtl" style="padding-left: 4.5mm;padding-right: 1.5mm;padding-bottom: 2.8mm">';
            }else{
                str +='<td class="tblprinttd" align="right" dir="rtl" >';
            }


            str += BusCard(stuData);


            str+='</td>';
            if(cardProfile["cardsPadding"]!="" &&parseInt(cardProfile["cardsPadding"]) && i%2==0)    str += "<td style='width:"+cardProfile["cardsPadding"]+"px;padding:0;'></td>";
        }
        str+="</tr></table>";
    }

    return str;
}

function NewValleyCard(stuData){
      var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var show_bar_code=stuData.show_bar_code;
     var background_path=stuData.background_path;
        var width_card=(stuData.width_card?stuData.width_card:"325");
   var height_card=(stuData.height_card?stuData.height_card:"202");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"62");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    bgcolor="";
    color=((textColor )?textColor:"white" );
   // deanStyle='style="max-width:80%;max-height:80%;height:auto;width:auto"'
       deanStyle='style="max-width:80%;max-height:80%; width:52px;height: 22px;"'

    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
    }


    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%" :"")+'">';
if(!background_path){
   str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:40px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+color+'" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
}


    str+='              <TR>';
    str+='                  <TD width="1%"> </TD>';

    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="text-align: right;" > <br><br><br><FONT style="FONT: bold 11pt arabic transparent;padding-right: 10px" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    if(showNid)     str+='				<FONT style="FONT: bold 9pt arabic transparent" color=#000>'+stu_NID+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent" color=#000>'+ProgramName+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR>&nbsp;&nbsp;';

      if (stuData["showStEmail"]=="1" && stuData['email']) {
                str+='				<FONT style="FONT: bold 9pt arabic transparent" color=#000>'+stuData['email']+'</FONT><BR>&nbsp;&nbsp;'
            }

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    var colorYear=color;
    if(stuData.color_enroll_year) colorYear=stuData.color_enroll_year;
    if(ScopeID.indexOf("70.")==0)
        colorYear='#000';
    str+='                      <SPAN style="float:right;color: '+colorYear+';font-weight:bold;padding: 8px 11px 6px 30px;FONT-size: 11pt" dir=ltr>' +getName(AcademicYearName)+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
        str+='                  <TD width="26%" align=center style="vertical-align: middle;padding-top:36px;">';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        //margin-top:46px
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;margin-right:15px;margin-left: 15px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';
    str+='              <TR style="height:35px;">';
      var signatureCard='يعتمد عميد الكلية';
    var signatureFont='9px';
    var codeFont='8px';
    var dateFont='9px'

    var colorSignature=color;
    if(stuData.color_signature_name)  colorSignature=stuData.color_signature_name;

    str+='                  <TD dir=rtl colSpan=4>&nbsp;&nbsp;&nbsp;&nbsp;'+(show_bar_code?'<FONT  style="FONT-SIZE:18px" color=black class="barcode">':'')+studentCode+'</FONT><BR><FONT style="FONT:'+codeFont+' times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+stu_code_id+"</B></FONT></TD>";

    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+colorSignature+'"><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" '+deanStyle+' alt="" ></B><BR><FONT style="FONT-SIZE:'+dateFont+'">'+GetDate()+'</FONT></TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;

}
function MahlaCard(stuData){
    var ScopeName = '';
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.LevelName;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_bar_code=stuData.show_bar_code;
       var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var ProgramName=(stuProg ?stuProg:"");
     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:15px;margin-right:15px;margin-top:39px" '


    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%;" :"")+'">';

    str+='              <TR>';
    str+='                  <TD style="height:30px;background-color:' + background_color_faculty+ ';" vAlign=bottom colSpan=3 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+(stuData.color_faculty?stuData.color_faculty:'white')+'" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'

    str+='              </TR>';


    str+='              <TR>';

    str += '<TD height="2px" colSpan=3  style="background-color:' + PrintColor+ ';"></TD>';

    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%"></TD>';


    str+='                  <TD style="HEIGHT: 20mm;text-align: right;padding-top:10px;padding-right: 5px;" vAlign=top><div style="padding-right: 5px;FONT: bold 10pt arabic transparent;line-height: 21px"><FONT color='+(color_content?color_content:'#000')+'>'+'<b style="color: #e2774e">'+getName("الاسم:|Name:")+'</b> '+'  '+stuName+'</FONT><BR>';


    str+='				<FONT color='+(color_content?color_content:'#000')+'>'+'<b style="color: #e2774e">'+getName("المستوى:|level:")+'</b> '+Level+'</FONT><BR>';
    if(show_program_flag){
    str+='				<FONT color='+(color_content?color_content:'#000')+'>'+'<b style="color: #e2774e">'+getName("البرنامج:|program:")+'</b> '+ProgramName+'</FONT><BR>'
   }
     var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
        str+='				<FONT color='+(color_content?color_content:'#000')+'>'+'<b style="color: #e2774e">'+getName("الكود:|code:")+'</b> '+stu_code_id+'</FONT><BR>'

        }

    if(showNid =='1')
         str+='				<FONT style="margin-right: -5px" color='+(color_content?color_content:'#000')+'>'+getName("الرقم القومى:|national id")+stu_NID+'   </FONT><BR>&nbsp;&nbsp;';
 var yearFull = AcademicYearName.split("-")[1] + "-" + AcademicYearName.split("-")[0];
  str+='<br/><FONT style="FONT-SIZE:12px;display: block;margin-top: -5px" color="black">'+yearFull+'</font>';

    str+=' </div>';
    str+='                  </TD>';
      str+='                  <TD vAlign=top style="float: left;">';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="border: 1px solid;width:'+width_student_image+'px;height:'+height_student_image+'px;border-radius:5px;margin-top:12px;margin-left: 9px" src='+srcImage+' > ';
        str +='<br /> <IMG src="'+deanSign+'" '+deanStyle+' alt="" > ';
      //  str +=    ' <br />'<FONT style="FONT-SIZE:12px;font-weight: bold" color="black">هشام محمد البطش</font>'
    }
    //signatureCard="عميد المعهد"
    signatureCard=""
    str+='                  </TD>';
    str+='              </TR>';
    str+="<tr style='height:15px'>"
    str+='                  <TD colSpan=2 style="vertical-align: top" >' ;
    if(show_bar_code)
      str+=' <FONT  style="FONT-SIZE:18px;padding-right:12px" color=black class="barcode">'+studentCode+'</FONT>'
   str+=' </td>'
    // str+="<td style=\"vertical-align: top\">" ;
    //         str+='<span style="margin-right:27px;"><FONT style="FONT-SIZE:10px;" color="black">'+AcademicYearName+'</font></span><br><span style="margin-right:35px;"><FONT style="FONT-SIZE:10px;" color="black" weight="bold"><B>'+signatureCard+'</b></FONT></span><br>'+(dean_sign_exist?"<IMG src="+deanSign+"  "+deanStyle+" >":"")+'    </B>'
    //
    //     "</td>"
   str+=    "</tr>"
   //  str+='              <TR style="height:25px;">';
   //  var codeFont='8px';
   //  var dateFont='9px'
   // str+='                  <TD vAlign=middle align=center style="vertical-align: top"> </TD>';
   //
   //  str+='              </TD></TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function DamanhourCards(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
    var color_content=stuData.color_content;
    var show_program_flag=stuData.show_program_flag;
    var show_bar_code=stuData.show_bar_code;
    var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var ProgramName=(stuProg ?stuProg:"");
    bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '

    // if(!ScopeID.indexOf("1163.")==0){
    //     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
    //     bgcolor="background-color: "+PrintColor+";"
    // }
    // }


    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px;" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size: cover" :"")+'">';

    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'

    str+='              </TR>';


    str+='              <TR>';
//#398f41
    //style="background-color:' + PrintColor+ ';"
    str += '<TD height="20px" colSpan=5  ></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px;line-height:18px;float: right" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color='+(color_content?color_content:'#000')+'>'+stuName+'</FONT><BR>&nbsp;';
    str+='			<FONT style="FONT: bold '+((ScopeName.length > 30)?"7pt":"11pt")+' arabic transparent" color='+(color_content?color_content:'#000')+'>'+getName("الكلية:|Faculty:")+ScopeName+'</FONT><BR>&nbsp;'

    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
   // if(show_program_flag){
   //  str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent" color='+(color_content?color_content:'#000')+'>'+ProgramName+'</FONT><BR>&nbsp;'
   // }

if(stuData.AddLevelStd=="1") {
    str += '				<FONT style="FONT: bold 11pt arabic transparent" color=' + (color_content ? color_content : '#000') + '>' + Level + '</FONT><BR>&nbsp;&nbsp;';
}
    if(showNid =='1')
         str+='				&nbsp;<FONT style="FONT: bold 10pt arabic transparent;margin-right: -5px" color='+(color_content?color_content:'#000')+'>'+getName("الرقم القومى:|national id")+stu_NID+'   </FONT><BR>&nbsp;&nbsp;';

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    var colorYear=stuData.color_enroll_year;

    str+='                      <SPAN style="float:right;color: '+(colorYear?colorYear:'white')+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +getName(AcademicYearName)+'</SPAN>';

    str+='                  </TD>';
       str+='                  <TD width="1%"></TD>';
        str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="margin-top:-2px;margin-left:35px;width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
      str += '<TD height="2" colSpan=5 ></TD>';
   // str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    signatureCard=""

    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */
    var signatureFont='9px';
    var codeFont='8px';
    var dateFont='9px'
    if (ScopeID.indexOf('167.')==0)    deanStyle='style="height:20px;width:40px;" '

    if(ScopeID.indexOf('1533.')==0 || ScopeID.indexOf('167.')==0 ){
        signatureFont='9pt';
        codeFont='10pt'
        dateFont='8pt'
    }
    var colorSignature=stuData.color_signature_name;
       if (show_bar_code) {
           str += '                  <TD dir=ltr colSpan=2 align=right >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">' + studentCode + '</FONT><BR><FONT style="FONT:' + codeFont + ' times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>' + stu_code_id + "</B></FONT></TD>";
       }
       else{
            str += '                  <TD dir=ltr colSpan=2 align=right ></TD>'
       }
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+(colorSignature?colorSignature:'white')+'"><B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B><BR><FONT style="FONT-SIZE:'+dateFont+'"></FONT></TD>';

    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}


function NuscCard(stuData) {
     var universityName=stuData.universityName;
 var ScopeName = stuData.ScopeName;

    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.LevelName;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist = stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode = stuData.studentCode;
    var email = stuData.email;
    var stu_NID = stuData.stu_NID;
    var background_path = stuData.background_path;  // الكارت اللي رفعتيه
    var show_program_flag = stuData.show_program_flag;
    var show_bar_code = stuData.show_bar_code;
    var showNid = stuData.show_nid;
  var background_color_faculty = stuData.background_color_faculty;
   var  spaces_between_lines=stuData.spaces_between_lines;
    // أبعاد الكارت الثابتة

        var width_card=(stuData.width_card?stuData.width_card:"330");
   var height_card=(stuData.height_card?stuData.height_card:"208");

    // أبعاد الصورة الشخصية

    var width_student_image = (stuData.width_student_image ? stuData.width_student_image : 63);
    var height_student_image  = (stuData.height_student_image ? stuData.width_student_image : 87);


var nameFontSize = '14px';
//  if (stuName.length > 30 && stuName.length <= 35  ) {
//     nameFontSize = '12px';
// }
    // تجهيز لينك الصورة
    var srcImage = "";
    if (StuCode || StuCode === 0) {
        srcImage = (imgPath ? imgPath : "") + "/getJCI?param0=stuImages.Images&param1=download&param2=" + StuCode;
    }

    var ProgramName = (stuProg ? stuProg : "");

    // بناء الكارت
    var str = "";
    str += `
  <style>
@media print 
{   
 @page {
    size: 85.6mm 54mm; /* Real PVC card size */
    margin: 0 !important;
    padding: 0 !important;
  }
  body {
      margin: 0 !important;
      padding: 0 !important;
        width: 85.6mm;
    height: 54mm;
  }
  .tblprinttd{
  border-bottom: none !important;
  padding:0px !important;
  }

   .cardtbl{
        width: 85.6mm;
        height: 54mm;
              margin:0;
      padding:0;
      page-break-after: avoid;    /* منع قطع الصفحة */
        /*transform: scale(1.1);    !* Adjust as needed *!*/
        /*transform-origin: center center;  !* Center scaling *!*/

    }

  
    
}
  

  
</style>  

<div class="print-wrapper">
    <div    class="cardtbl" style="
    width:${width_card}px;
    height:${height_card}px;
    position:relative;
    direction:rtl;
    font-family:damietta_font_bold;
  
">
    <img src="${background_path}" 
         style="width:100%; height:100%; object-fit:fill; position:absolute; top:0; left:0; z-index:-1;">
<div style="text-align:center; font-size:13px; font-weight:bold;line-height: 15px; color: ${background_color_faculty ? background_color_faculty : white};margin-left: 104px">
${universityName} <br/>${getName('كلية|faculty')} ${ScopeName}<br/>${AcademicYearName}
</div>
    
        <!-- صورة الطالب -->
        <img src="${srcImage}" style="
            position:absolute;
            top:76px;
            left:20px;
            width:${width_student_image}px;
            height:${height_student_image}px;
            border-radius:6px;
            object-fit:cover;
            border:2px solid #5c491c
        ">

        <!-- بيانات الطالب -->
        <div style="position:absolute;margin-top:27px ;margin-right:7px ; font-size:11px;font-family:damietta_font_bold; line-height:${spaces_between_lines?spaces_between_lines:18}px; color:#000;">
            
            <span style="color:#5c491c; font-weight:bold;font-size: 11px; font-family:damietta_font_bold">الاسم:</span><b style="color: #002b5c"> ${stuName}</b><br>
            
            ${show_program_flag ? `
            <span style="color:#5c491c; font-weight:bold;font-size: 11px;">البرنامج:</span> <b style="color: #002b5c">${ProgramName}</b><br>
            ` : ''}

            <span style="color:#5c491c; font-weight:bold;font-size: 11px;">المستوى:</span><b style="color: #002b5c"> ${Level}<br>
            
                 <span style="color:#5c491c; font-weight:bold;font-size: 11px;">الكود:</span><b style="color: #002b5c"> ${stu_code_id}<br>

            ${showNid == "1" ? `
            <span style="color:#5c491c; font-weight:bold;font-size: 11px;">الرقم القومى:</span><b style="color: #002b5c">  ${stu_NID}</b><br>
            ` : ''}
             ${show_bar_code == "1" ? `
          <span class="barcode" style="font-size:14px;margin-top: 5px;margin-right: 23px;position: absolute">${studentCode}</span><br>
            ` : ''}

        </div>
        <div style="position:absolute; bottom:-4px; margin-bottom:6px;left:10px; text-align:center; font-size:10px; color:#000;">
        <span style="color:white; font-weight:bold;font-size: 10px;">عميد القطاع</span><br/>${deanSign?"<IMG src="+deanSign+" style='height:16px;width:40px;'>":""}
        </div>
        

        

                  </div>
                  </div>
                  `
    return str;
}
function KNUCards(stuData) {

    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.LevelName;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist = stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode = stuData.studentCode;
    var email = stuData.email;
    var stu_NID = stuData.stu_NID;
    var background_path = stuData.background_path;  // الكارت اللي رفعتيه
    var show_program_flag = stuData.show_program_flag;
    var show_bar_code = stuData.show_bar_code;
    var showNid = stuData.show_nid;
  var background_color_faculty = stuData.background_color_faculty;
   var  spaces_between_lines=stuData.spaces_between_lines;
    // أبعاد الكارت الثابتة

        var width_card=(stuData.width_card?stuData.width_card:"328");
   var height_card=(stuData.height_card?stuData.height_card:"200");

    // أبعاد الصورة الشخصية

    var width_student_image = (stuData.width_student_image ? stuData.width_student_image : 63);
    var height_student_image  = (stuData.height_student_image ? stuData.width_student_image : 84);


var nameFontSize = '14px';
//  if (stuName.length > 30 && stuName.length <= 35  ) {
//     nameFontSize = '12px';
// }
    // تجهيز لينك الصورة
    var srcImage = "";
    if (StuCode || StuCode === 0) {
        srcImage = (imgPath ? imgPath : "") + "/getJCI?param0=stuImages.Images&param1=download&param2=" + StuCode;
    }

    var ProgramName = (stuProg ? stuProg : "");

    // بناء الكارت
    var str = "";
    str += `
    

    <div    class="cardtbl" style="
    width:${width_card}px;
    height:${height_card}px;
    border-radius:6px;
    position:relative;
    overflow:hidden;
    direction:rtl;
  
">
    <img src="${background_path}" 
         style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1;">
<div style="text-align:center; font-size:19px; font-weight:bold;font-family:knu_font_bold; color: ${background_color_faculty ? background_color_faculty : '#006d9e'}; margin-top:35px;">
  ${ScopeName}
</div>
    
        <!-- صورة الطالب -->
        <img src="${srcImage}" style="
            position:absolute;
            top:54px;
            left:12px;
            width:${width_student_image}px;
            height:${height_student_image}px;
            border-radius:6px;
            object-fit:cover;
        ">

        <!-- بيانات الطالب -->
        <div style="position:absolute; right:32px; top:58px; font-size:12px; line-height:${spaces_between_lines?spaces_between_lines:14}px; color:#000;">
            
            <span style="color:#19a987; font-weight:bold; font-family: knu_font_bold;font-size: 15px;">الاسم:</span><b style="font-size: ${nameFontSize}; font-family: knu_font_bold"> ${stuName}</b><br>
            
            ${show_program_flag ? `
            <span style="color:#19a987; font-weight:bold;font-family: knu_font_bold;font-size: 15px;">البرنامج:</span> <b style="font-size: 14px; font-family: knu_font_bold">${ProgramName}</b><br>
            ` : ''}

            <span style="color:#19a987; font-weight:bold;;font-family: knu_font_bold;font-size: 15px;">المستوى:</span><b  style="font-size: 14px; font-family: knu_font_bold"> ${Level}</b> -
            <b style="color:red;">${AcademicYearName.replace("-", "/")}</b><br>

            ${showNid == "1" ? `
            <span style="color:#19a987; font-weight:bold;;font-family: knu_font_bold;font-size: 15px;">الرقم القومى:</span><b  style="font-size: 10px;">  ${stu_NID}</b><br>
            ` : ''}

          <span style="margin-right: 6px;">  <b  style="font-size: 10px; "> ${email}</b></span>
        </div>

        

      
        
        <!-- باركود -->
                  ${show_bar_code ? `
              <div style="
                  position:absolute;
                  left:12%;
                  top:76%;
                  text-align:center;
                  width:120px;
              ">
                <b style="font-size:10px; color:#19a987;transform: translateX(-32px);display: inline-block">ID: ${stu_code_id}</b><br>
                <span class="barcode" style="font-size:14px;">${studentCode}</span>
              </div>
            ` : `
              <div style="
                  position:absolute;
                   left:12%;
                   top:76%;
                  text-align:center;
                  width:120px;
              ">
                <b style="font-size:10px; color:#19a987;">ID: ${stu_code_id}</b>
              </div>
            `}
                  </div>
                  `
    return str;
}


function RasSdrCards(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
    var color_content=stuData.color_content;
    var show_program_flag=stuData.show_program_flag;
    var show_bar_code=stuData.show_bar_code;
    var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
   var  spaces_between_lines=stuData.spaces_between_lines;
    var ProgramName=(stuProg ?stuProg:"");
    bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:30px;padding-left:23px" '

    // if(!ScopeID.indexOf("1163.")==0){
    //     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
    //     bgcolor="background-color: "+PrintColor+";"
    // }
    // }


    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px;" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size: cover" :"")+'">';

    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:29px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
        str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px;line-height:18px;float: right" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color='+(color_content?color_content:'#000')+'>'+getName("الاسم:|Name:")+stuName+'</FONT><BR>&nbsp;';
   //str+='			<FONT style="FONT: bold '+((ScopeName.length > 30)?"7pt":"11pt")+' arabic transparent" color='+(color_content?color_content:'#000')+'>'+getName("الكلية:|Faculty:")+ScopeName+'</FONT><BR>&nbsp;'
   str+='				<FONT color='+color_content+' style="FONT: bold 11pt arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'">'+getName("اللائحة:|studyplan:")+getName('ساعات معتمدة|Credit')+'</FONT><BR>&nbsp;'

    var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
   if(show_program_flag){
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color='+(color_content?color_content:'#000')+'>'+getName('البرنامج:|program:')+ProgramName+'</FONT><BR>&nbsp;'
   }
   if(stuData.AddLevelStd=="1") {
    str += '				<FONT style="FONT: bold 11pt arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color=' + (color_content ? color_content : '#000') + '>' + Level + '</FONT><BR>&nbsp;';
}
    var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
        str+='				<FONT color='+color_content+' style="FONT: bold 11pt arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'">'+getName("الكود:|code:")+ConvertNumberToArabic(stu_code_id)+'</FONT><BR>&nbsp;'

        }
    if(showNid =='1')
         str+='				&nbsp;<FONT style="FONT: bold 11pt arabic transparent;margin-right: -5px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color='+(color_content?color_content:'#000')+'>'+getName("الرقم القومى:|national id")+ConvertNumberToArabic(stu_NID)+'   </FONT><BR>&nbsp;&nbsp;';

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    var colorYear=stuData.color_enroll_year;

    str+='                      <SPAN style="float:right;color: '+(colorYear?colorYear:'white')+';font-weight:bold;padding: 2px 77px 0 30px;FONT-size: 21px" dir=ltr>' +ConvertNumberToArabic(getName(AcademicYearName))+'</SPAN>';

    str+='                  </TD>';
       str+='                  <TD width="1%"></TD>';
        str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="margin-top:-2px;margin-left:16px;width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
         signatureCard="رئيس مجلس الادارة"
    //
    // /*
    // if(ScopeID=='1.3.')
    //    signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    // */
     var signatureFont='13px';
    var codeFont='8px';
    var dateFont='9px'
    //
    var colorSignature=stuData.color_signature_name;
    str +='<br/><FONT style="vertical-align:middle;padding-left:28px;FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+(colorSignature?colorSignature:'white')+'"><B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B><BR><FONT style="FONT-SIZE:'+dateFont+'"></FONT>'
   str+='                  </TD>';
     str+='                  <TD></TD>';
    str+='              </TR>';

  //  str+='              <TR style="height:35px;">';
    // str+='                  <TD>';

    // str += '                  <TD dir=ltr colSpan=3 align=right ></TD>'
    //    if (show_bar_code) {
    //        str += '                  <TD dir=ltr colSpan=2 align=right >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">' + stu_code_id + '</FONT><BR><FONT style="FONT:' + codeFont + ' times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>' + stu_code_id + "</B></FONT></TD>";
    //    }
    //    else{
    //         str += '                  <TD dir=ltr colSpan=2 align=right ></TD>'
    //    }
    //str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+(colorSignature?colorSignature:'white')+'"><B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B><BR><FONT style="FONT-SIZE:'+dateFont+'"></FONT></TD>';

        str+='          </TBODY>';
    str+='      </TABLE>';

    return str;

 }
function AlbourUniversityCards(stuData){

     var ScopeName = stuData.ScopeNameEn;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuNameEn;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var AcademicYearName = stuData.AcademicYearName;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_code_id=stuData.show_code_id;
        var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var  spaces_between_lines=stuData.spaces_between_lines;
    var ProgramName=(stuProg ?stuProg:"");
        var logo_foundation=stuData.logo_foundation;
       var LevelName=stuData.LevelNameEn;

     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '
      var background_level=stuData.background_level;
    if (background_level)
        background_path=background_level;
     //var show_bar_code=stuData.show_bar_code;

    //linear-gradient(#006666, #004d4d)
// var width_card = 350;
// var height_card = 550;
// نحدد حجم الخط حسب طول الاسم
var nameFontSize = '13px';
 if (stuName.length > 40) {
    nameFontSize = '11px';
}
 var facultyFontSize = '13px';
  if (ScopeName.length > 34) {
    facultyFontSize = '12px';
}

var str = '' +
'<div dir="ltr" style="width:' + width_card + 'px;height:' + height_card + 'px;' +
            (background_path
                ? 'background:url(' + background_path + ') no-repeat center/100% 100%;'
                : 'background-image:linear-gradient(#0000, black);') +
            'position:relative;margin:auto;' +
            'font-family:albour_font_bold" class="cardtbl">' +

    // صورة الطالب
    '<div style="height: 166px;display:flex;align-items:flex-end;justify-content:center;">'+
    '<img src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '"' +
    ' style="width:' + width_student_image + 'px;height:' + height_student_image + 'px;' +
    'background:white;display:block;margin:20px auto 15px;">' +
    '</div>' +

    // الاسم
    '<div style="color:#2f4c4a;font-size:' + nameFontSize + ';font-weight:bold;' +
    'word-wrap:break-word;margin:0 auto 10px;text-align:center;line-height:1.3;">' +
    stuName + '</div>' +

    // الكلية
    '<div style="color:#bd9732;font-size:13px;font-weight:bold;margin-bottom:8px;text-align:center;">Faculty: ' +
        '<span style="color:#2f4c4a;font-size:'+facultyFontSize+'">' + ScopeName + '</span></div>';

if (show_code_id == "1") {
    str += '<div style="color:#bd9732;font-size:13px;font-weight:bold;margin-bottom:8px;text-align:center;">UID: ' +
           '<span style="color:#2f4c4a;">' + stu_code_id + '</span></div>';
}

if (stuData.AddLevelStd == "1") {
    str += '<div style="color:#bd9732;font-size:13px;font-weight:bold;margin-bottom:8px;text-align:center;">Grade: ' +
           '<span style="color:#2f4c4a;">' + LevelName + '</span></div>';
}

// السنة الدراسية
str += '<div style="color:#bd9732;font-size:13px;font-weight:bold;margin-bottom:8px;text-align:center;">Year: ' +
       '<span style="color:#2f4c4a;font-size:14px;">' + getName(AcademicYearName) + '</span></div>';

// اللوجو (كبير في الأسفل - بالمقاسات المطلوبة)
if (logo_foundation) {
    str += '<img src="/static/images/' + logo_foundation + '?num=' + Math.floor(Math.random() * 100000) + '"' +
           ' style="width:229px;height:204px;position:absolute;bottom:-19px;left:50%;transform:translateX(-50%);">';
}

str += '</div>';

return str;

}


function  DamiettaNUCards____(stuData){
       var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProgEn = (stuData.stuProgEn ? stuData.stuProgEn : "")
    var imgPath = stuData.imgPath;
    var AcademicYearName = stuData.AcademicYearName;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var background_path=stuData.background_path;
    var image_logo_path=stuData.image_logo_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_code_id=stuData.show_code_id;
        var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var  spaces_between_lines=stuData.spaces_between_lines;
        var logo_foundation=stuData.logo_foundation;
       var LevelName=stuData.LevelName;
      var AcademicSemesterNameDb=stuData.AcademicSemesterNameDb;

     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '
      var background_level=stuData.background_level;
    if (background_level)
        background_path=background_level;
     //var show_bar_code=stuData.show_bar_code;

    //linear-gradient(#006666, #004d4d)
// var width_card = 350;
// var height_card = 550;
// نحدد حجم الخط حسب طول الاسم
var nameFontSize = '14px';
 if (stuName.length > 30 && stuName.length <= 35  ) {
    nameFontSize = '13px';
}
 if (stuName.length > 35) {
    nameFontSize = '12px';
}
 var programFontSize = '14px';
 if (stuProgEn.length > 21 && stuProgEn.length <23) {
    programFontSize = '12px';
}
  else if (stuProgEn.length >= 23 && stuProgEn.length <38) {
    programFontSize = '11px';
}
  else if (stuProgEn.length >= 27) {
    programFontSize = '10px';
}





  var str = '' ;
//     '<style>'
//     +'.level-banner {\n' +
//     '  /* الخصائص الأساسية */\n' +
//     '  background-color: #007bff; /* اللون الأزرق للخلفية */\n' +
//     '  color: white;\n' +
//     '  padding: 10px 20px;\n' +
//     '  display: inline-block; /* لكي يأخذ العرض المناسب */\n' +
//     '  font-size: 24px;\n' +
//     '  font-weight: bold;\n' +
//     '  \n' +
//     '  /* **الخاصية الرئيسية لعمل الشكل** */\n' +
//     '  /* نحدد نقاط المضلع (4 زوايا علوية مستقيمة، ونقطتين سفليتين مائلتين) */\n' +
//     '  /*\n' +
//     '    1. 0% 0% (أعلى اليسار)\n' +
//     '    2. 100% 0% (أعلى اليمين)\n' +
//     '    3. 100% 85% (الزاوية اليمنى السفلية الداخلية)\n' +
//     '    4. 50% 100% (النقطة السفلية الوسطى - لا نحتاجها هنا إذا كنا نعمل ميلان جانبي)\n' +
//     '    5. 0% 85% (الزاوية اليسرى السفلية الداخلية)\n' +
//     '    \n' +
//     '    لعمل الشكل الذي به "سهمان" من الجانبين:\n' +
//     '  */\n' +
//     '  clip-path: polygon(\n' +
//     '    0% 0%,       /* أعلى اليسار */\n' +
//     '    100% 0%,      /* أعلى اليمين */\n' +
//     '    100% 100%,    /* الزاوية السفلية اليمنى */\n' +
//     '    85% 100%,     /* نقطة الميل اليمنى */\n' +
//     '    50% 85%,      /* النقطة المركزية المنخفضة */\n' +
//     '    15% 100%,     /* نقطة الميل اليسرى */\n' +
//     '    0% 100%       /* الزاوية السفلية اليسرى */\n' +
//     '  );\n' +
//     '  \n' +
//     '  /* ملحوظة: الإحداثيات تحتاج إلى ضبط دقيق للوصول للشكل المثالي */\n' +
//     '}'
//     str+='</style>'
 str+='<div dir="ltr"  class="cardtbl" style="width:' + width_card + 'px;height:' + height_card + 'px;' +
        'background:url(' + background_path + ') no-repeat center/100% 100%;' +
        'position:relative;margin:auto;' +
        'font-family:damietta_font_bold;'+
        '">' +
     // '<div><label style="color: white;margin: 9px;font-family:damietta_font_bold;">'+getName("جامعة دمياط الاهلية")+'</label></div>'+
      '<div style="position: absolute;top:57px;right:15px ;font-size: 14px">'+
       // صورة الطالب
    '<div style="width:' + width_student_image + 'px;height:' + height_student_image + 'px;' +
    'bottom: 60px;right:198px;position: absolute;overflow:hidden;background:white;' +
    ';">' +
        '<img src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '"' +
        ' style="width:100%;height:100%;object-fit:cover;display: block">' +
    '</div>' +

    // بيانات الطالب
    '<div style="flex:1;color:#2f4c4a;line-height:1.4;display: flex;flex-direction: column;padding-left: 4px;font-size: 12px">' +
        // الاسم
        '<div style="font-weight:bold;word-wrap:break-word;color:black;display:flex;align-items:flex-start;">'
             + '<span style="font-size:' + nameFontSize + ';white-space: normal;word-break:break-word;max-width:200px;">' + stuName + '</span></div>' ;






// if (stuData.AddLevelStd == "1") {
//     str += '<div style="font-weight:bold;color:#383c59;">'+getName('المستوى |Level')+' ' +
//            '<span style="font-size:12px" >' + LevelName + '</span></div>';
// }


str += '<div style="font-weight:bold;color:black;">' +
       '<span style="font-size:'+programFontSize+';">' +getName('برنامج |Program')+ stuData.stuProg + '</span></div>';


  str += '<div style="font-weight:bold;color:black;"> '+
       '<span >'+ (ScopeName.startsWith('كلية') ? ScopeName : getName('كلية |faculty') + ScopeName) + '</span></div>';
 if (stuData.AddLevelStd == "1") {
    str += '<div >'  +
          '<span  style="background-color: #18488a;border-radius: 4px;line-height:24px;vertical-align: middle;color: white;margin-top: 5px;padding-bottom: 2px;">'+getName('المستوى |Level') + LevelName + '</span></div>';
 }




str += '</div>';


 str +='  <div style="display:flex;align-items:flex-start;font-weight:bold;color:black;direction: rtl;font-size: 14px;">';
    var yearFull = AcademicYearName.split("-")[0] + " / " + AcademicYearName.split("-")[1];
    str +='  <div style="display: flex; flex-direction: column; align-items: center;">'
         str+='<div>' + yearFull + '</div>' ;
       if (show_code_id == "1") {
           str += '<div style="font-size: 12px; ">' + stu_code_id + '</div>';
       }
    str +='</div>'
          if(stuData.dean_sign_exist ){
              str +=' <div style="display:flex;flex-direction:column;align-items:center;color:black;font-weight:bold;margin: 3px;font-size: 12px;padding-right:15px;">'
         str += getName('يعتمد عميد الكلية |The Dean of the College approves') ;
         str+='<IMG src='+stuData.deanSign+' style="height:16px;margin-top:2px;padding-left:0;"></div>'

 }
 str += '</div>';
//           if (show_code_id == "1") {
//     str += '<div style="font-weight:bold;color:black;margin-top: -12px"> ' +
//            '<span >' + stu_code_id + '</span></div>';
// }

return str;


}

function  HeliopolisCards(stuData){
       var ScopeName = stuData.ScopeNameEn;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuNameEn;
    var stuProgEn = (stuData.stuProgEn ? stuData.stuProgEn : "")
    var imgPath = stuData.imgPath;
    var AcademicYearName = stuData.AcademicYearName;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var background_path=stuData.background_path;
    var image_logo_path=stuData.image_logo_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_code_id=stuData.show_code_id;
        var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var  spaces_between_lines=stuData.spaces_between_lines;
        var logo_foundation=stuData.logo_foundation;
       var LevelName=stuData.LevelNameEn;
      var AcademicSemesterNameDb=stuData.AcademicSemesterNameDb;

     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '
      var background_level=stuData.background_level;
    if (background_level)
        background_path=background_level;
     //var show_bar_code=stuData.show_bar_code;

    //linear-gradient(#006666, #004d4d)
// var width_card = 350;
// var height_card = 550;
// نحدد حجم الخط حسب طول الاسم
var nameFontSize = '12px';
 if (stuName.length > 40) {
    nameFontSize = '11px';
}
 var programFontSize = '12px';
 if (stuProgEn.length > 21 && stuProgEn.length <23) {
    programFontSize = '11px';
}
  else if (stuProgEn.length >= 23 && stuProgEn.length <27) {
    programFontSize = '10px';
}
  else if (stuProgEn.length >= 27) {
    programFontSize = '8px';
}






var str = '' +
'<div dir="ltr" class="cardtbl" style="width:' + width_card + 'px;height:' + height_card + 'px;' +
        'background:url(' + background_path + ') no-repeat center/100% 100%;' +
        'position:relative;margin:auto;' +
        '">' +
      '<div style="position: absolute;top:69px;left:18px ;">'+
       // صورة الطالب
    '<div style="width:' + width_student_image + 'px;height:' + height_student_image + 'px;' +
    'border:2px solid #383c59;overflow:hidden;background:white;border-radius:8px;' +
    'display:flex;float: left;">' +
        '<img src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '"' +
        ' style="width:100%;height:100%;object-fit:cover;">' +
    '</div>' +

    // بيانات الطالب
    '<div style="flex:1;color:#2f4c4a;line-height:1.4;display: flex;flex-direction: column;text-align: left;padding-left: 4px;font-size: 12px">' +
        // الاسم
        '<div style="font-weight:bold;word-wrap:break-word;color:#383c59;display:flex;align-items:flex-start;">Name:'
             + '<span style="font-size:' + nameFontSize + ';white-space: normal;word-break:break-word;max-width:200px;">' + stuName + '</span></div>' ;



if (show_code_id == "1") {
    str += '<div style="font-weight:bold;color:#383c59;">ID: ' +
           '<span style="font-size:12px">' + stu_code_id + '</span></div>';
}
 str += '<div style="font-weight:bold;color:#383c59;">Cohort ' +
           '<span style="font-size:12px">' + getName(AcademicSemesterNameDb,'E')+" "+AcademicYearName.split("-")[1] + '</span></div>';

if (stuData.AddLevelStd == "1") {
    str += '<div style="font-weight:bold;color:#383c59;">Level: ' +
           '<span style="font-size:12px" >' + LevelName + '</span></div>';
}


str += '<div style="font-weight:bold;color:#383c59;">Major: ' +
       '<span style="font-size:'+programFontSize+';">' + stuProgEn + '</span></div>';

str += '</div>'
str += '</div>'
    var yearFull = AcademicYearName.split("-")[0] + " / " + AcademicYearName.split("-")[1];
    str += '<div style="position:absolute;right:0px;top:90px;text-align:center;">' +
         '<img src='+image_logo_path+' style="width:61px;height:56px;display: block">' + // غير المسار حسب مكان الصورة
         '<div style="font-size:9px;font-weight:bold;color:#383c59;line-height: 6px;text-align: center;">' + yearFull + '</div>' +
       '</div>';


str += '</div>';

return str;


}
function OsimCards(stuData){
     var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var AcademicYearName = stuData.AcademicYearName;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_code_id=stuData.show_code_id;
        var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var  spaces_between_lines=stuData.spaces_between_lines;
    var ProgramName=(stuProg ?stuProg:"");
        var logo_foundation=stuData.logo_foundation;
       var LevelName=stuData.LevelName;

     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '
      var background_level=stuData.background_level;
    if (background_level)
        background_path=background_level;
     //var show_bar_code=stuData.show_bar_code;

    //linear-gradient(#006666, #004d4d)
// var width_card = 350;
// var height_card = 550;
var str =`
<style>
@media print 
{   
 @page {   size: 204.4px  326.4px;      margin: 0;    } 
   body {
      margin: 0;
      padding: 0;
   }
   .cardtbl {     
    width: 204.4px;   
       height: 326.4px;  
          overflow: hidden;  
     margin: 0;  
    padding: 0; 
      page-break-after: avoid;  /* امنع عمل صفحة جديدة بعد كل كارت */
      page-break-before: avoid;
      page-break-inside: avoid;
     
     }  
    
}
  

  
</style>

`
       str += '      <TABLE border=0 cellSpacing=0 cellPadding=0 style="margin:0;padding:0;border-collapse:collapse;width:204.4px;height:326.4px;table-layout: fixed"  nowrap dir="rtl" class="cardtbl">' +
'        <TR>' +
'          <TD style="'+(background_path ?'background-image: url('+background_path+');background-repeat:no-repeat;background-position:center;background-size:100% 100%':'background-image:linear-gradient(#0000, black)')+';">' ;
// '            <div style="text-align:center; padding-top: 10px;">' +
// '              <img src="/static/images/'+ logo_foundation + '" style="height: 60px;">' + // شعار المعهد
// '            </div>' +
     str +="<div style='position: absolute' class='QRCodeSmall' >"
    str +="<IMG style='width:20%;margin-right: 5px;margin-top:1px;' src='/getJCI?param0=stuImages.Images&param1=downloadQR&param2="+stu_code_id + "'>"
      str +="</div>"
     str+='            <div style="width: 100%; text-align: center; padding: 10px 0;margin-top: 67px;">' +
          // border: 4px solid #f6b529;
'              <img src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" style="width: '+width_student_image+'px; height: '+height_student_image+'px; background: white;display: block;margin: 0 auto">' + // صورة الطالب
'            </div>' +
'<table style="width:100%;  color: white; margin-right: 2px; table-layout: fixed;' +
(spaces_between_lines ? ' line-height:' + spaces_between_lines + 'px;' : '') +'">' +
'              <tr>' +
'                <td ><label style="font-size: 13px;font-family: osim_font_bold">'+getName("الإسم|Name")+'<span>:</span></label>' +
        '  <label style="white-space: nowrap;font-family: osim_font_bold;font-size: ' + (stuName.length > 25? '10px' : '13px') + ';">' + stuName + '</label>' +
    '             </td> </tr>' +
'             ' + (show_program_flag ?'       <tr><td>          <label style="font-size: 13px;font-family: osim_font_bold">'+getName("الشعبة|The branch")+'</label><span>:</span>' +
'                <label style="font-size: 13px;font-family: osim_font_bold">' + stuProg + '</label>' +
'             </td> </tr>' :'');
    if(stuData.AddLevelStd=="1") {
        str += '              <tr><td>' +
            '                <label style="font-size: 13px;text-align:right;font-family: osim_font_bold">' + getName('المستوى|level') + '</label><span>:</span>' +
            '                <label style="font-size:13px;text-align:right;font-family: osim_font_bold">' + LevelName + '</label>' +
            '             </td> </tr>';
    }
      if(show_code_id=="1")
      {
          str +='               <tr><td>   <label style="font-size: 13px;font-family: osim_font_bold">'+getName('كود|code')+'</label> <span>:</span>' +
'                <label style="font-size: 13px;font-family: osim_font_bold">' + stu_code_id + '</label>' +
'             </td> </tr>' ;
      }


str +='            <tr><td style="text-align: center">' +
          '                <label style="font-size: 14px;font-family: osim_font_bold">' +getName(AcademicYearName)+'</label>'+
    '                  </td></tr>'+
'            </table>' +
'          </TD>' +
'        </TR>' +
'      </TABLE>';




    return str;
}
function DefaultCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_bar_code=stuData.show_bar_code;
        var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    var  spaces_between_lines=stuData.spaces_between_lines;
    var ProgramName=(stuProg ?stuProg:"");
        var logo_foundation=stuData.logo_foundation;
        var image_logo_path=stuData.image_logo_path;
     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '

    // if(!ScopeID.indexOf("1163.")==0){
    //     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
    //     bgcolor="background-color: "+PrintColor+";"
    // }
    // }

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px;" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%" :"")+'">';

    str+='              <TR>';

    // if (ScopeID.indexOf('167.')==0 ) {
    //     str+='                  <TD style="height:40px;background-color:' + background_color_faculty+ ';"  colSpan=4 align=center>'; //+' - '+progtitle+'
    //    if (logo_foundation)
    //        str += "<td style='background-color:"+background_color_faculty+";'><img src='/static/images/" + logo_foundation + "' style='width: 84%;vertical-align: bottom'></td>";
    // }
    // else
        str+='                  <TD style="height:40px;background-color:' + background_color_faculty+ ';" vAlign=bottom colSpan=5 align=center>' ;
       if (ScopeID.indexOf('1163.')==0 ) {
           str += '<div style="display:flex; align-items:center; justify-content:center; gap:0px;">'
                str += '<span style="font-size:15px;margin-right: 3px; color:'+(stuData.color_faculty?stuData.color_faculty:'white')+'; font-weight:bold;" class="Card_collage_Name">'
                str += ScopeName
                str += '</span>'
                         if(image_logo_path)
                               str += '<img src="'+image_logo_path+'" style="width:64px; height:auto;">'
                str += '</div>'

       }
       else{
                      str+='  <FONT style="FONT-SIZE: 18px;" class="Card_collage_Name" color="'+(stuData.color_faculty?stuData.color_faculty:'white')+'" ><B>'+ScopeName+'</B></FONT>' ;
                      if (ScopeID.indexOf('167.')==0 ) {
                             if (logo_foundation)
                                   str += "<img src='/static/images/" + logo_foundation + "' style='width:27px;height: 27px;margin-right: 4px;vertical-align: bottom'>";

                      }

       }

      str+='</TD>'; //+' - '+progtitle+'



    str+='              </TR>';


    str+='              <TR>';
//#398f41
    //style="background-color:' + PrintColor+ ';"
    str += '<TD height="2px" colSpan=5  style="background-color:' + PrintColor+ ';"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px;line-height:18px;float: right" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color='+(color_content?color_content:'#000')+'>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
   if(show_program_flag){
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color='+(color_content?color_content:'#000')+'>'+ProgramName+'</FONT><BR>&nbsp;'
   }

if(stuData.AddLevelStd=="1") {
    str += '				<FONT style="FONT: bold 11pt arabic transparent;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color=' + (color_content ? color_content : '#000') + '>' + Level + '</FONT><BR>&nbsp;&nbsp;';
}
    if(showNid =='1')
         str+='				<FONT style="FONT: bold 10pt arabic transparent;margin-right: -5px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" color='+(color_content?color_content:'#000')+'>'+getName("الرقم القومى:|national id")+stu_NID+'   </FONT><BR>&nbsp;&nbsp;';

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    var colorYear=stuData.color_enroll_year;

    str+='                      <SPAN style="float:right;color: '+(colorYear?colorYear:'white')+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +getName(AcademicYearName)+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
      str += '<TD height="2" colSpan=5 style="background-color:' + PrintColor + ';"></TD>';
   // str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';

    var signatureCard=''
     if(ScopeID.indexOf("1163.")==0){
          signatureCard='العميد' ;
     }
     else {
         if(ScopeID.indexOf("1300.")==0){
          signatureCard='يعتمد عميد المعهد';
        }else{
             signatureCard='يعتمد عميد الكلية';
        }
     }


    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */
    var signatureFont='9px';
    var codeFont='8px';
    var dateFont='9px'
    if (ScopeID.indexOf('167.')==0)    deanStyle='style="height:20px;width:40px;" '

    if(ScopeID.indexOf('1533.')==0 || ScopeID.indexOf('167.')==0 ){
        signatureFont='9pt';
        codeFont='10pt'
        dateFont='8pt'
    }
    var colorSignature=stuData.color_signature_name;

    str+='                  <TD dir=ltr vAlign=middle align=center>'

    if(ScopeID.indexOf("1163.")==0){
        //   str+= ' <span style="background-image: url('+deanSign+');FONT-SIZE:'+signatureFont+';line-height:2.5mm" ' +
        // 'color="'+(colorSignature?colorSignature:'white')+'">' ;
        //  str+=   '<B>'+signatureCard+'<br/>أ.د سالى الغمراوى</span> ' ;
//         str += '<span style="'
//     + 'display:inline-block;'
//     + 'background-image:url(' + deanSign + ');'
//     + 'background-size:100% auto;'
//     + 'background-repeat:no-repeat;'
//     + 'background-position:center center;'
//     + 'font-size:' + signatureFont + ';'
//     + 'padding:5px 10px 25px 10px;'
//     + 'color:' + (colorSignature ? colorSignature : 'white') + ';">';
//
// str += '<b>' + signatureCard + '<br/>أ.د سالى الغمراوى</b></span>';
                str += '<div style="'
            + 'display:inline-block;'
            + 'text-align:center;'
            + 'font-size:' + signatureFont + ';'
            + 'color:' + (colorSignature ? colorSignature : 'white') + ';">';
     var signatureName='ا.د احمد حبيب البسيوني'
        if(ScopeID.indexOf("1163.2.")==0)
            signatureName='ا.د. سالي الغمراوي'
        str += '<b>' + signatureCard + '<br/>'+signatureName+'</b><br/>';

        str += '<img src="' + deanSign + '" style="width:100px;" />';

        str += '</div>';
             //'&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B>' ;
    }
    else{
         str+= ' <FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" ' +
        'color="'+(colorSignature?colorSignature:'white')+'">' ;
      str+=   '<B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B>' ;
    }

     if(ScopeID.indexOf("1163.")!=0) {
         str += '    <BR><FONT style="FONT-SIZE:' + dateFont + '">' + GetDate() + '</FONT></TD>';
     }
       if (show_bar_code) {
           str += '                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">' + studentCode + '</FONT><BR><FONT style="FONT:' + codeFont + ' times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>' + stu_code_id + "</B></FONT></TD>";
       }
       else{
            str += '                  <TD dir=ltr colSpan=2 align=left ></TD>'
       }
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function Sadat(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
     var show_bar_code=stuData.show_bar_code;
     var show_code_id=stuData.show_code_id;
    var ProgramName=(stuProg ?stuProg:"");
     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:25px;" '

    // if(!ScopeID.indexOf("1163.")==0){
    //     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
    //     bgcolor="background-color: "+PrintColor+";"
    // }
    // }

   var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"80");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"92");
   var colorYear=stuData.color_enroll_year;

   var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px;background-color: white" align=center nowrap  dir="rtl" class="cardtbl" >';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%;" :"")+'">';

    str+='              <TR>';
    str+='                  <TD style="height:30px;background-color:' + background_color_faculty+ ';" vAlign=bottom colSpan=3 align=center>'

     str+='<FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+(stuData.color_faculty?stuData.color_faculty:'white')+'" ><B>'+ScopeName+'</B></FONT>'; //+' - '+progtitle+'
    var AcademicYearName=getName(AcademicYearName)
    AcademicYearNamePart1=AcademicYearName.split("-")[0]
        AcademicYearNamePart2=AcademicYearName.split("-")[1]
        str+='               <SPAN style="color: '+(colorYear?colorYear:'white')+';font-weight:bold;float: left;padding-left: 40px;padding-top:10px;FONT-size: 16px" dir=ltr>' +AcademicYearNamePart2+" - "+AcademicYearNamePart1+'</SPAN></TD>';

    str+='              </TR>';


    str+='              <TR>';

    str += '<TD height="2px" colSpan=3  style="background-color:' + PrintColor+ ';"></TD>';

    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%"></TD>';

 nameFontSize = ((stuName.length > 40)?"9pt":"11pt")
    str+='                  <TD style="HEIGHT: 0px;text-align: right;padding-top:10px;" ><div style="padding-right: 5px;FONT: bold '+nameFontSize+' arabic transparent;line-height: 26px;"><FONT  color='+(color_content?color_content:'#000000')+'> '+'<b >'+getName("الاسم:|Name:")+'</b> '+'  '+stuName+'</FONT><BR>';
     if(show_program_flag){
        str+='				<FONT color='+(color_content?color_content:'#000000')+'>'+'<b >'+getName("البرنامج:|program:")+'</b> '+ProgramName+'</FONT><BR>'
       }

        if(show_code_id =="1"){
            str+='				<FONT style="margin-left: 9px" color='+(color_content?color_content:'#000000')+' >'+'<b>'+getName("الكود:|code:")+'</b> '+stu_code_id+'</FONT>'

        }


    str+='				<FONT color='+(color_content?color_content:'#000000')+'>'+Level+'</FONT><BR>';


    if(showNid =='1')
         str+='				<FONT style="margin-bottom:-55px;display:block;" color='+(color_content?color_content:'#000000')+'>'+getName("الرقم القومى:|national id")+stu_NID+'   </FONT><BR>&nbsp;&nbsp;';


    str+=' </div>';
    str+='                  </TD>';


    str+='                  <TD  style="float: left;padding-left: 20px">';

    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="border: 1px solid;width:'+width_student_image+'px;height:'+height_student_image+'px;margin-top:10px" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='              </TR>';
      str+='              <TR>';
      str += '<TD height="2" colSpan=5 style="background-color:' + PrintColor + ';"></TD>';

    str+='              </TR>';

      var signatureCard='يعتمد عميد الكلية';
    str+='              <TR style="height:35px;">';

    var signatureFont='9px';
    var codeFont='8px';
    var dateFont='9px'

    var colorSignature=stuData.color_signature_name;
        str+='                  <TD  colSpan=2 >&nbsp;&nbsp;&nbsp;&nbsp;'+(show_bar_code?'<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT>':'')+'</TD>';

        str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+(colorSignature?colorSignature:'white')+'"><B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B></TD>';
  //str+='                  <TD></TD>';


    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function Iaems(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var dean_sign_exist=stuData.dean_sign_exist;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var textColor=stuData.textColor;
    var ScopeID=stuData.ScopeID;
    var showNid=stuData.show_nid;
    var stu_NID=stuData.stu_NID;
    var background_path=stuData.background_path;
    var background_color_faculty=stuData.background_color_faculty;
     var color_content=stuData.color_content;
     var show_program_flag=stuData.show_program_flag;
    var show_bar_code=stuData.show_bar_code;
    var ProgramName=(stuProg ?stuProg:"");
       var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"69");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"89");
     bgcolor="background-color: "+PrintColor+";"
    color=((textColor )?textColor:"white" );
    deanStyle='style="height:12px;" '

    // if(!ScopeID.indexOf("1163.")==0){
    //     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
    //     bgcolor="background-color: "+PrintColor+";"
    // }
    // }

   var colorYear=stuData.color_enroll_year;

   var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl" >';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%;" :"")+'">';

    // str+='              <TR>';
    // str+='                  <TD style="height:30px;background-color:' + background_color_faculty+ ';" vAlign=bottom colSpan=3 align=center>'
    //
    //  str+='<FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+(stuData.color_faculty?stuData.color_faculty:'white')+'" ><B>'+ScopeName+'</B></FONT>'; //+' - '+progtitle+'
    //     str+='               <SPAN style="color: '+(colorYear?colorYear:'white')+';font-weight:bold;float: left;padding-left: 40px;FONT-size: 16px" dir=ltr>' +getName(AcademicYearName)+'</SPAN></TD>';
    //
    // str+='              </TR>';


    // str+='              <TR>';
    //
    // str += '<TD height="2px" colSpan=3  style="background-color:' + PrintColor+ ';"></TD>';
    //
    // str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%"></TD>';


    str+='                  <TD style="HEIGHT: 20mm;text-align: right;padding-top:95px;padding-right: 5px;text-align: center" vAlign=top>' +
        '<div style="padding-right: 5px;FONT: bold 10pt arabic transparent;line-height: 21px">'
     str+='				<FONT color='+(color_content?color_content:'#000000')+'>'+stu_code_id+'</FONT><BR>'
        str+= '<FONT color='+(color_content?color_content:'#000000')+'>   '+stuName+'</FONT><BR>';
     if(show_program_flag){
        str+='				<FONT color='+(color_content?color_content:'#000000')+'> '+ProgramName+'</FONT><BR>'
       }


   if(stuData.AddLevelStd=="1") {
       str += '				<FONT color=' + (color_content ? color_content : '#000000') + '>' + Level + '</FONT><BR>';
   }


    if(showNid =='1')
         str+='				<FONT style="margin-right: -5px" color='+(color_content?color_content:'#000000')+'>'+stu_NID+'   </FONT><BR>&nbsp;&nbsp;';


    str+=' </div>';
    str+='                  </TD>';


    str+='                  <TD  style="padding-left:16px;height: 0px;float: left">';
//border: 1px solid;
    if (StuCode || StuCode===0) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;margin-top: 73px;margin-right: 41px" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='              </TR>';
    //   str+='              <TR>';
    //   str += '<TD height="2" colSpan=5 style="background-color:' + PrintColor + ';"></TD>';
    //
    // str+='              </TR>';

    //  var signatureCard='يعتمد عميد الكلية';
    str+='              <TR style="height:35px;">';

    // var signatureFont='9px';
    // var codeFont='8px';
    // var dateFont='9px'
    //
    // var colorSignature=stuData.color_signature_name;

    if (show_bar_code){
                str+='                  <TD  colSpan=2 style="position: relative">   <div style="margin-top:-28px;position: absolute"><FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT></div></TD>';
    }
    else{
         str+='                  <TD  colSpan=2 ></TD>  '
    }
 //str+='                  <TD  colSpan=2 ></TD>'
  //      str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color="'+(colorSignature?colorSignature:'white')+'"><B>'+signatureCard+'</FONT><BR>&nbsp;  '+(dean_sign_exist?"<IMG src="+deanSign+" "+deanStyle+" >":"")+'    </B></TD>';
  str+='                  <TD></TD>';


    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;

}
function EeluCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    bgcolor="";
    color=PrintColor;

   var width_card=(stuData.width_card?stuData.width_card:"325");
   var height_card=(stuData.height_card?stuData.height_card:"210");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"70");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"85");
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }

    // var str='      <TABLE style="background-image: url(/static/images/cards/eelu.jpg);background-repeat: no-repeat;background-color: white;background-position-x: center;background-position-y:center;width:325px;height:210px;" cellSpacing=0 cellPadding=0  align=center nowrap  dir="rtl" class="cardtbl">';
    var str='      <TABLE style="width:'+width_card+'px;height:'+height_card+'px !important;" cellSpacing=0 cellPadding=0  align=center nowrap  dir="rtl" class="cardtbl">';

    str+='         <TBODY>';

    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:60px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
    // str+='              <TR>';
    // str+='                  <TD height="20px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
    //
    // str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="5%"></TD>';


    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px;line-height:19px;" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>الرقم الجامعي: '+stu_code_id+'<br>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>الاسم: '+stuName+'</FONT><BR>&nbsp;&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000></FONT><FONT style="FONT: bold '+((ScopeName.length > 38)?"8pt":"11pt")+' arabic transparent" color=#000> '+ScopeName+'</FONT><BR>&nbsp;&nbsp;'

    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="FONT: bold 10pt arabic transparent" color=#000>'+Level+'</FONT><BR>&nbsp;&nbsp;';


    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"5pt":"8pt")+' arabic transparent" color=#000>'+ProgramName+'</FONT>'
    str+='<br>&nbsp;&nbsp;<span ><FONT style="FONT: bold 11pt arabic transparent" color=#000>'+AcademicYearName+'</FONT></span>'



    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    // str+='                      <SPAN style="float:right;color: '+PrintColor+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD colspan=2 width="1%"></TD>';
    str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;margin-left:10px;" src='+srcImage+' > ';

    }
    var signatureCard='يعتمد عميد الكلية';
    var signatureFont='8px';
    var codeFont='8px';
    var dateFont='9px'
    str+='<br><span style="margin-left:15px;"><FONT style="FONT-SIZE:'+signatureFont+';line-height:2.5mm" color=black><B>'+signatureCard+'</FONT></span>'
    str+='<br><IMG style="margin-left: 20px;margin-bottom:10px;" src="'+deanSign+'" height=20 alt="">'
    str+='                  </TD>';
    str+='              </TR>';

    // str+='              <TR style="height:35px;">';
    // str+='                  <TD width="5%"></TD>';
    //
    // /*
    // if(ScopeID=='1.3.')
    //    signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    // */
    //
    //
    //
    // str+='				<td valign="top">&nbsp;&nbsp;</td>';
    //
    // str+='                  <TD dir=ltr colSpan=2 align=left ></TD>';
    // str+='                  <TD dir=ltr vAlign=top align=center><IMG style="margin-left: 20px" src="'+deanSign+'" height=20 alt=""></B><BR></TD>';
    //
    // str+='              </TR>';
    // str+='              <TR>';
    // // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    // str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';
    //
    // str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function IHICard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
      var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"80");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"95");
    bgcolor="";
    color=PrintColor;

    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="black";
    }

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY>';

    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='<td style="height:20px;" valign="top" colspan="5" align="center"></td>'
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;'
     var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
      str+='      <FONT style="FONT: bold 11pt arabic transparent" color=#000>الكود: '+stu_code_id+'</FONT>'

        }
       str+=    '<BR>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>الاسم: '+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent" color=#000>القسم: '+ProgramName+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR>';

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';

    var signatureFont='9px';
    var codeFont='8px';
    var dateFont='9px'

    str+='                  <TD dir=ltr vAlign=middle align=center></TD>';


    str+='                  <TD dir=ltr colSpan=2 align=left >'
    str+='                      <SPAN style="margin-left:50px;margin-bottom:30px;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 18px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='</TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function AMICard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var stu_NID=stuData.stu_NID;
    var ScopeID=stuData.ScopeID;
    var stdStatus=stuData.stdStatus;
    var width_card=(stuData.width_card?stuData.width_card:"325");
    var height_card=(stuData.height_card?stuData.height_card:"202");
    var width_student_image=(stuData.width_student_image?stuData.width_student_image:"55");
    var height_student_image=(stuData.height_student_image?stuData.height_student_image:"75");
    LevelName=stuData.LevelName;
    bgcolor="";
    PrintColor="black";
    color=PrintColor;

    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    color="black";
    bgcolor=""

    var str='      <TABLE style="width:'+width_card+'px;height: '+height_card+'px" cellSpacing=0 cellPadding=0  align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="background-image: url(/static/images/cards/1300_12_n.jpg);background-size:100% 100%">';
    // str+='              <TR>';
    // str+='                  <TD style="height:3px;" colSpan=5></TD>';
    // str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:50px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+color+'" ></FONT><br></TD>'; //+' - '+progtitle+'

    str+='              </TR>';


    str+='              <TR>';
    str+='                  <TD width="1%">';

    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="text-align: right;padding-top:15px;padding-left:30px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 12pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"9pt":"11pt")+' arabic transparent" color=#000>'+LevelName+" ("+stdStatus+") "+ProgramName+'</FONT><BR>&nbsp;'
 var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+getName("الكود|Code")+" : "+stu_code_id+'</FONT>';

        }


    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    // str+='                    <BR>&nbsp;&nbsp;  <SPAN style="float:left;padding: 2px 9px 0 20px;FONT-size: 12px" dir=ltr><b>' +AcademicYearName+'</b><br><hr style="float:left;width:20px"/></SPAN>';

    str+='                  </TD>';
    str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';

    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    var signatureCard='عميد الكلية';
    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */


    str+='                  <TD dir=ltr colSpan=2 align=left ></TD>';
    str+='                  <TD dir=ltr  align=center><FONT style="FONT-SIZE: 9px;line-height:2.5mm" color=black><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=10></B><BR><FONT style="FONT-SIZE: 9px"><b>ا.د/غاده اليماني</b></FONT></TD>';

    str+='              </TR><tr><td height="17px" colspan="5"></td></tr>';

    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function BadrCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var stu_NID=stuData.stu_NID;
    var ScopeID=stuData.ScopeID;
    var stdStatus=stuData.stdStatus;
    var show_bar_code=stuData.show_bar_code;
    LevelName=stuData.LevelName;
     var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");
    bgcolor="";
    PrintColor="black";
    color=PrintColor;

    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    color="black";
    bgcolor=""

    var str='      <TABLE style="background-image: url(/static/images/cards/1300_.png);background-repeat: no-repeat;background-color: white;background-position-x: center;background-position-y:center;width:'+width_card+'px;height: '+height_card+'px;;background-size:100% 100%" cellSpacing=0 cellPadding=0  align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY >';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:40px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+color+'" ><B>'+ScopeName+'</B></FONT><br><hr style="float:left;width:100px"/></TD>'; //+' - '+progtitle+'

    str+='              </TR>';


    str+='              <TR>';
    str+='                  <TD width="1%">';

    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 19mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 12pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"9pt":"11pt")+' arabic transparent" color=#000>'+LevelName+" ("+stdStatus+") "+ProgramName+'</FONT><BR>&nbsp;'
     var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+getName("الكود|Code")+" : "+stu_code_id+'</FONT>';

        }


    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    str+='               <BR>&nbsp;&nbsp;       <SPAN style="float:left;padding: 2px 9px 0 20px;FONT-size: 12px" dir=ltr><b>' +AcademicYearName+'</b><br><hr style="float:left;width:20px"/></SPAN>';

    str+='                  </TD>';
    str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';
    }
    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';

    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    var signatureCard='يعتمد عميد الكلية';
    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */
    str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;'
    if(show_bar_code)
        str+='       <FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR>'
   str+='   <FONT style="FONT: 12px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<B>NID: '+stu_NID+"</B></FONT></TD>";
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px;line-height:2.5mm" color=black><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate().split(" ")[0]+'</FONT></TD>';

    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function BadrMCICard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var stu_NID=stuData.stu_NID;
    var ScopeID=stuData.ScopeID;
    var stdStatus=stuData.stdStatus;
    var show_bar_code=stuData.show_bar_code;
       var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"96");
var background_path=stuData.background_path;

    LevelName=stuData.LevelName;
    bgcolor="";
    PrintColor="black";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    color="black";
    bgcolor=""

    var str='      <TABLE style=width:'+width_card+'px;height: '+height_card+'px"  align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%\";" :"")+'">';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='                  <TD style="height:40px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 16px;white-space: nowrap;‎" class="Card_collage_Name" color="'+color+'" ><B>'+ScopeName+'</B></FONT><br><hr /></TD>'; //+' - '+progtitle+'

    str+='              </TR>';


    str+='              <TR>';
    str+='                  <TD width="1%">';

    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 19mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+((stuName.length > 25)?"12pt":"13pt")+' arabic transparent" color=#000>'+getName("الاسم|Name")+':&nbsp;'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="FONT: bold '+((LevelName.length > 30)?"9" +
        "10pt":"12pt")+' arabic transparent" color=#000>'+getName("المستوي|Level")+':&nbsp;'+LevelName+'('+stdStatus+')</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"10pt":"12pt")+' arabic transparent" color=#000>'+getName("البرنامج|Programe")+':&nbsp;'+ProgramName+'</FONT><BR>&nbsp;'
 var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
    str+='				<FONT style="FONT: bold 12pt arabic transparent" color=#000>'+getName("الكود|Code")+" : "+stu_code_id+'</FONT><BR>&nbsp;&nbsp;';

        }

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    str+='                      <SPAN style="float:left;padding: 2px 9px 0 20px;FONT-size: 15px" dir=ltr><b>' +AcademicYearName+'</b></SPAN>';

    str+='                  </TD>';
    str+='                  <TD vAlign=top width="26%" align=center>';

    if (StuCode) {
        if (imgPath)
           srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        else
            srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src='+srcImage+' > ';

    }

    str+='                  </TD>'
    str+='                  <TD></TD>';
    str+='              </TR>';

    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    var signatureCard='يعتمد عميد المعهد';
    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */


    str+='                  <TD dir=ltr colSpan=2 align=left >'
    if( show_bar_code)
          str+='    &nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT>';

    str+='   <BR><FONT style="FONT: 12px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<B>'+stu_NID+"</B></FONT></TD>";
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px;line-height:2.5mm" color=black><B>'+signatureCard+'<br>أ.د/ ناصر خليفه</B></FONT>' +
        // '<BR><FONT style="FONT-SIZE: 9px">'+GetDate().split(" ")[0]+'</FONT>' +
        '</TD>';

    str+='              </TR>';
    // str+="<tr><td  style='height:10px;'colspan='5'></td></tr>"
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
// function MHietCard(stuData){
//     var ScopeName = stuData.ScopeName;
//     var StuCode = stuData.StuCode;
//     var stuName = stuData.stuName;
//     var stuProg = stuData.stuProg;
//     var imgPath = stuData.imgPath;
//     var Level = stuData.Level;
//     var AcademicYearName = stuData.AcademicYearName;
//     var deanSign = stuData.deanSign;
//     var stu_code_id = stuData.stu_code_id;
//     var PrintColor=stuData.PrintColor;
//     var stu_NID=stuData.stu_NID;
//     var ScopeID=stuData.ScopeID;
//     var stdStatus=stuData.stdStatus;
//     LevelName=stuData.LevelName;
//     bgcolor="";
//     PrintColor="black";
//     color=PrintColor;
//     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
//         bgcolor="background-color: "+PrintColor+";"
//         color="white";
//     }
//     color="black";
//     bgcolor=""
//
//     var str='      <TABLE style="width:310px;height: 200px;"  style="background-image: url(/static/images/cards/1300_1_.jpg);background-repeat: no-repeat;background-color: white;background-position-x: center;background-position-y:center;width:310px;" align=center nowrap  dir="rtl">';
//     str+='         <TBODY width="310px;">';
//     str+='              <TR>';
//     str+='                  <TD style="height:3px;" colSpan=5></TD>';
//     str+='              </TR>';
//     str+='              <TR>';
//     // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
//     str+='                  <TD style="height:40px;'+bgcolor+'" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
//
//     str+='              </TR>';
//
//
//     str+='              <TR>';
//
//     str+='                  <TD width="1%"></TD>';
//     str+='                  <TD vAlign=top width="26%" align=center>';
//
//     if (StuCode) {
//         if (imgPath)
//            srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
//         else
//             srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
//         str += ' <IMG style="width:76px;height:96px;" src='+srcImage+' > ';
//
//     }
//
//     str+='                  </TD>'
//     str+='                  <TD style="HEIGHT: 19mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+((stuName.length > 25)?"10pt":"12pt")+' arabic transparent" color=#000>'+getName("الاسم|Name")+':&nbsp;'+stuName+'</FONT><BR>&nbsp;';
//     //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
//     var ProgramName=(stuProg ?stuProg:"");
//     str+='				<FONT style="FONT: bold '+((LevelName.length > 30)?"9pt":"11pt")+' arabic transparent" color=#000>'+getName("المستوي|Level")+':&nbsp;'+LevelName+'('+stdStatus+')</FONT><BR>&nbsp;'
//     str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"9pt":"11pt")+' arabic transparent" color=#000>'+getName("البرنامج|Programe")+':&nbsp;'+ProgramName+'</FONT><BR>&nbsp;'
//
//     str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+getName("الكود|Code")+" : "+stu_code_id+'</FONT><BR>&nbsp;&nbsp;';
//
//     //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
//     //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
//     // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
//     str+='                      <SPAN style="float:left;padding: 2px 9px 0 20px;FONT-size: 15px" dir=ltr><b>' +AcademicYearName+'</b></SPAN>';
//
//     str+='                  </TD>';
//
//     str+='                  <TD></TD>';
//     str+='              </TR>';
//
//     str+='              <TR style="height:35px;">';
//     str+='                  <TD>';
//     var signatureCard='يعتمد عميد المعهد';
//     /*
//     if(ScopeID=='1.3.')
//        signatureCard='يعتمد القائم بعمل عميد الكلية' ;
//     */
//
//
//     str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+StuCode+'</FONT><BR><FONT style="FONT: 12px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<B>NID: '+stu_NID+"</B></FONT></TD>";
//     str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px;line-height:2.5mm" color=black><B>'+signatureCard+'<br>أ.د/ ناصر خليفه</B></FONT>' +
//         // '<BR><FONT style="FONT-SIZE: 9px">'+GetDate().split(" ")[0]+'</FONT>' +
//         '</TD>';
//
//     str+='              </TR>';
//     // str+="<tr><td  style='height:10px;'colspan='5'></td></tr>"
//     str+='          </TBODY>';
//     str+='      </TABLE>';
//
//     return str;
// }
function    MHietCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.LevelName;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var show_bar_code=stuData.show_bar_code;
    var width_card=(stuData.width_card?stuData.width_card:"325");
   var height_card=(stuData.height_card?stuData.height_card:"203");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"50");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"60");
   var backGround=stuData.background_level?stuData.background_level:stuData.background_path

    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';
    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    // str+='         <TBODY style="background-image: url(/static/images/cards/card_1300_1.png);background-repeat: no-repeat;background-size: 325px 203px;">';//
    str+='         <TBODY style="background-image: url('+backGround+');background-repeat: no-repeat;background-size: 100% 100% ">';//

    str+='              <TR>';
    scopeFontSize = ((ScopeName.length > 25)?"18px":"22px")
    str+='                  <TD style="height:61px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR style="height: 70px">';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        style= 'margin-top: -15px;display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;border: 2px solid '+color+';';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
      str+='          <div style="margin-top:-5px;" dir=ltr vAlign=top align=center>';

    var signatureCard='يعتمد أ.د عميد المعهد';
    var fontSize='9px';

    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" color=black><B style="white-space: nowrap">'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B>';
    str+='</div>';
    str+='<div style="text-align:center;"><FONT style="FONT: 8px times"><B >'+GetDate()+'</B></FONT></div>'

    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    nameFontSize = ((stuName.length > 40)?"9pt":"11pt")
    str+='                  <TD style="text-wrap: nowrap;line-height: 1.1;height: 120px;text-align: right;" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+nameFontSize+' arabic transparent" color=darkblue>اسم الطالب:'+'&nbsp;&nbsp;'+stuName+'</FONT><BR>&nbsp;';
    str+='				<FONT style="line-height: 1.1;FONT: bold 11pt arabic transparent" color=darkblue>كود الطالب:'+'&nbsp;&nbsp;'+stu_code_id+'</FONT><BR>&nbsp;'

    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="line-height: 1.1;FONT: bold '+((ProgramName.length > 30)?"7pt":"9pt")+' arabic transparent" color=darkblue>القسم:<span style="margin-right:27px;">'+ProgramName+'</span></FONT><BR>&nbsp;'
    str+='				<FONT style="line-height: 1.1;FONT: bold 11pt arabic transparent" color=darkblue>المستوى:<span style="margin-right:15px;">'+Level+'</span></FONT><BR>';//<BR>&nbsp;&nbsp;
    str+='<div style="margin-left:5px;float:right;width:72%;background-color: white;">' ;
    if(show_bar_code)
        str+=    '<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT>'
    str+= '  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:darkblue;font-weight:bold;text-align:center;font-size:8pt;vertical-align: top;'+(!show_bar_code?"float:left;margin-left:-56px":"")+'">العام الدراسي</span></div>'
    str+='<br><span style="color:darkblue;font-size:11pt;margin-left: 5px;float: left;vertical-align: top;">'+AcademicYearName+'</span>'
    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}


// function MHietCard(stuData){
//     var ScopeName = stuData.ScopeName;
//     var StuCode = stuData.StuCode;
//     var stuName = stuData.stuName;
//     var stuProg = stuData.stuProg;
//     var imgPath = stuData.imgPath;
//     var Level = stuData.Level;
//     var AcademicYearName = stuData.AcademicYearName;
//     var deanSign = stuData.deanSign;
//     var stu_code_id = stuData.stu_code_id;
//     var PrintColor=stuData.PrintColor;
//     var ScopeID=stuData.ScopeID;
//     bgcolor="";
//     color=PrintColor;
//
//     if(PrintColor!="#248f24" && PrintColor!="#002bff"){
//         bgcolor="background-color: "+PrintColor+";"
//         color="black";
//     }
//
//     var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;background-image: url(/static/images/cards/1300_1_.jpg)" align=center nowrap  dir="rtl" class="cardtbl" >';
//     str+='         <TBODY>';
//
//     str+='              <TR>';
//     // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
//     str+='<td style="height:20px;" valign="top" colspan="5" align="center"></td>'
//     str+='              </TR>';
//     str+='              <TR>';
//     str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
//     // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
//
//     str+='              </TR>';
//     str+='              <TR>';
//     str+='                  <TD width="1%">';
//     str+='                  <TD vAlign=top width="26%" align=center>';
//
//     if (StuCode) {
//         if (imgPath)
//            srcImage=imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
//         else
//             srcImage='/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode
//         str += ' <IMG style="width:80px;height:95px;" src='+srcImage+' > ';
//     }
//     str+='                  </TD>';
//     str+='                  <TD width="1%"></TD>';
//     str+='                  <TD style="text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>الكود: '+stu_code_id+'</FONT><BR>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>الاسم: '+stuName+'</FONT><BR>&nbsp;';
//     //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
//     var ProgramName=(stuProg ?stuProg:"");
//     str+='				<FONT style="FONT: bold '+((ProgramName.length > 30)?"7pt":"11pt")+' arabic transparent" color=#000>القسم: '+ProgramName+'</FONT><BR>&nbsp;'
//     str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR>';
//
//     //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
//     //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
//     // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
//
//     str+='                  </TD>';
//     str+='                  <TD></TD>';
//     str+='              </TR>';
//     str+='              <TR>';
//     // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
//     str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';
//
//     str+='              </TR>';
//     str+='              <TR style="height:35px;">';
//     str+='                  <TD>';
//
//     var signatureFont='9px';
//     var codeFont='8px';
//     var dateFont='9px'
//
//     str+='                  <TD dir=ltr vAlign=middle align=center></TD>';
//
//
//     str+='                  <TD dir=ltr colSpan=2 align=left >'
//     str+='                      <SPAN style="margin-left:50px;margin-bottom:30px;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 18px" dir=ltr>' +AcademicYearName+'</SPAN>';
//
//     str+='</TD>';
//     str+='              </TR>';
//     str+='          </TBODY>';
//     str+='      </TABLE>';
//
//     return str;
// }

function MCICards(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var stu_NID=stuData.stu_NID;
    var LevelName=stuData.LevelName;
    var show_bar_code=stuData.show_bar_code;

   var width_card=(stuData.width_card?stuData.width_card:"150");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");
    str ='<TABLE  dir=ltr style="width:'+width_card+'px;height: '+height_card+'px" cellSpacing=0 cellPadding=0 class="cardtbl">'+
        '<TBODY>'+
        '<TR>'+
        '<TD style="BACKGROUND-IMAGE: url(); BACKGROUND-REPEAT: no-repeat">'+
        //'<DIV style="BACKGROUND-IMAGE: url(); FILTER: alpha(opacity=30); WIDTH: 328px; BACKGROUND-REPEAT: no-repeat; BACKGROUND-POSITION: center center; HEIGHT: 100%;">'+///static/images/alexLogo.jpg
        //'<DIV style="POSITION: relative; WIDTH: 100%; HEIGHT: 100%">'+
        '<TABLE border=0 style="HEIGHT: 100%" cellSpacing=0 cellPadding=0 width="100%">'+
        '<TBODY>'+
        '<TR  class="title">'+
        '<TD align=center style="border-bottom:thin solid #000;padding-left:12px;" class="title" ><img src="/static/images/MC PSD copy_.JPG" class="logo"></TD>'+
        '<TD dir="'+dir+'" class="title" align='+align+' style="border-bottom:thin solid #000;width:100px;font-size:10pt;font-weight :bold;">&nbsp;&nbsp;&nbsp;&nbsp;وزارة التعليم العالى<br>&nbsp;&nbsp;&nbsp;'+(String(ScopeName).indexOf('-')>=0?ScopeName.split('-')[1]:ScopeName)+'</TD></TR>'+
        '<TR dir='+dir+' style="border-bottom:thin solid #000;" class="title">'+
        '<TD class="title" style="border-bottom:thin solid #000;width:80px;COLOR: #3d5aa8; MARGIN-LEFT: 0px; FONT-SIZE: 8pt; MARGIN-RIGHT: 0px; WORD-SPACING: 0px"  vAlign=top  align=center>'+
            '<IMG style="BORDER-BOTTOM: green 2px solid; BORDER-LEFT: green 2px solid; BORDER-RIGHT: green 2px solid;width:'+width_student_image+'px;height:'+height_student_image+'px;" src="/getJCI?param0=stuImages.Images&param1=download&param2='+StuCode+'" >'+
        '</TD>'+
        '<TD dir='+dir+' height=80 vAlign=top align=right class="title" style="border-bottom:thin solid #000;">'+
        '<DIV style="WIDTH: 100px; PADDING-'+align+': 10pt">'+
            '<TABLE border=0 cellSpacing=0 cellPadding=0 dir='+dir+' style="padding-'+align+':5px;" >'+
            '<TBODY>'+
            '<TR>'+
            '<TD dir='+dir+' style="WIDTH: 120px; "> '+
            '<SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:40px;padding-top:5px;">الاسم</label>&nbsp;'+getName(stuName)+'</SPAN></td></tr>'+
            '<tr><td ><SPAN style="FONT-SIZE: 8pt"><label style="display:inline-block;width:40px;">الرقم</label>&nbsp;'+StuCode+'</SPAN></td></tr>'+
            '<tr><td ><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:40px;">البرنامج</label>&nbsp;'+stuProg+'</SPAN></td></tr>'+
            '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:40px;">المستوى</label>&nbsp;'+LevelName+'</SPAN></td></tr>'+
            //'<tr><td><SPAN style=" FONT-SIZE: 9pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;'+getName(data[i]['idNum'])+'</SPAN></td></tr>'+
            '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;&nbsp;'+stu_NID+'</SPAN>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;<SPAN style="display: inline-block; FONT-SIZE: 8pt;text-align:'+(Lang=='A'?'left':'right')+'; MARGIN-'+(Lang=='A'?'right':'left')+': -10px;color:#031E6F;" dir="rtl" align=left >'+AcademicYearName+'</SPAN></td></TR>'+
            //padding-'+(Lang=='A'?'left':'right')+':12px;
            '</td></TR></TBODY></TABLE>'+
        '</DIV></TD></TR>'+
        '<TR dir='+dir+' style="vertical-align: top;">'+
        '<TD colspan=2>'+
        '<table border=0><tr style="height:30px;">';
        if(show_bar_code)
             str +='<td>&nbsp;&nbsp;<span style="TEXT-ALIGN: '+align+';padding-'+align+':8px;display:inline-block;width:185px;" class="barcode">'+studentCode+'</span></td>';
        else
            str +="<td colspan='2' style='display: inline-block;width:185px'></td>"
        str +='<td style="width:80px"><span style="WORD-WRAP:normal;FONT-SIZE: 10pt;padding-'+align+':5px; display:inline-block;width:100px;"><span style="MARGIN-TOP: -2px; MARGIN-BOTTOM: -3px;display:inline-block; width:100px;text-align:center;padding-'+align+':9x;">عميد المعهد </span><br><img src="/static/images/deanSign.jpg" width=90 height=15 align='+align+'><br>ا.د / قاسم صلاح الألفي</span></td></tr></table>'+
        '</TD></TR></TBODY></TABLE>'+
        '</TD></TR>'+//</DIV></DIV>
        '</TBODY></TABLE>';
        return str;

}
function MansCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
   var show_bar_code=stuData.show_bar_code;
   var width_card=(stuData.width_card?stuData.width_card:"325");
   var height_card=(stuData.height_card?stuData.height_card:"202");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");

    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="background-image: url(/static/images/cards/1_/card.jpg);background-size:100% 100%" >';
    /*
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    */
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    //'+bgcolor+'
    scopeFontSize = ((ScopeName.length > 18)?"16.5px":"22px")
    let padding= ((ScopeName.length > 21)?"100px":"120px")
    str+='                  <TD style="height:25px;" vAlign=bottom colSpan=5 align=center><FONT style="display: flex;font-size: '+scopeFontSize+';font-family: FontKufiRegular;padding-right: '+padding+';margin-bottom: -15px;" class="Card_collage_Name" color="'+color+'" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
    /*
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    */
    str+='              <TR style="height: 135px">';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'margin-top: -15px;display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;border: 2px solid '+color+';';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    nameFontSize = ((stuName.length > 35)?"10pt":"11pt")
    str+='                  <TD style="line-height: 1.5;HEIGHT: 23mm;text-align: right;padding-top:23px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+nameFontSize+' arabic transparent" color=darkblue>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="line-height: 1.6;FONT: bold '+((ProgramName.length > 30)?"8pt":"11pt")+' arabic transparent" color=darkblue>'+ProgramName+'</FONT><BR>&nbsp;'
    str+='				<FONT style="line-height: 1.6;FONT: bold 11pt arabic transparent" color=darkblue>'+Level+'</FONT><BR>&nbsp;&nbsp;';//<BR>

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    str+='                      <SPAN style="float:right;color: '+PrintColor+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    //<img style="margin-top: -60px;display: flex;width: 60px;border: 2px solid #394162;" src="/getJCI?param0=stuImages.Images&amp;param1=download&amp;param2=800159954">
    //str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B></TD>';
    //<BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT>
    str+='                  <TD dir=ltr vAlign=middle align=center>';
    style= 'margin-top: -60px;margin-right: -5px;display: flex;width: 70px;border: 1px solid '+color+';';
    str += ' <IMG style="'+style+'" src="/getJCI?param0=stuImages.Images&param1=downloadGatesQR&param2=' + stu_code_id + '" > ';
    str += '</TD>';
    str+='                  <TD dir=ltr colSpan=2 align=left style="line-height: 0.5;background: white;padding-bottom: 10px;">' ;
    str+='          <div style="float:right;width:25%" dir=ltr vAlign=top align=center>';

    var signatureCard='يعتمد عميد الكلية';
    var fontSize='9px';
    if(ScopeID=='1.22.'  ) {
        fontSize = '6.7px';
        signatureCard = 'يعتمد عميد الكلية';
    }

   else if(  ScopeID=='1.15.') {
        fontSize = '6.7px';
        signatureCard  ='يعتمد عميد الكلية';
    }else if( ScopeID=='1.61.' ){
       fontSize = '5.2px';
        signatureCard = 'نائب رئيس الجامعةوالمشرف على الكلية';
    }

    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" color=black><B style="white-space: nowrap">'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B>';
    str+='</div>';
     str+='<div style="margin-left:5px;float:right;width:72%;background-color: white;">'
    if(show_bar_code){
           str+='<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR>'
    }
  str+=    '<FONT style="FONT: 8px times;float: left">ID: <B>'+stu_code_id+'</B></FONT>' +
        '<FONT style="FONT: 8px times"><B style="float: right;margin-right: 16px;">'+GetDate()+'</B></FONT></div></TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function DamiettaNUCards(stuData){
    var ScopeName = stuData.ScopeName;
    console.log(ScopeName.length)
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var show_bar_code=stuData.show_bar_code;
    var width_card=(stuData.width_card?stuData.width_card:"325");
    var height_card=(stuData.height_card?stuData.height_card:"202");
    var width_student_image=(stuData.width_student_image?stuData.width_student_image:"75");
    var height_student_image=(stuData.height_student_image?stuData.height_student_image:"92");
    var show_code_id=stuData.show_code_id;
    var show_level=stuData.show_level;
    var show_program_flag=stuData.show_program_flag;
    background_path = (stuData.background_path?stuData.background_path:"/static/images/cards/card_1650.jpeg");
    var univText="جامعة دمياط الأهلية".replace(/أ/g, 'أ');
   str=`
<style>
    @font-face {
      font-family: 'DiodrumArabic-Bold';
      src: url('/static/fonts/DiodrumArabicBold.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Motken noqta';
      src: url('/static/fonts/Motken_Noqta.ttf') format('truetype');
    }
    
    @font-face {
      font-family: 'VIP Hala Bold';
      src: url('/static/fonts/ArbFONTS-VIP-Hala-Bold.otf') format('opentype');
    }
    
    .id-card {
        width: ${width_card}px;
        height: ${height_card}px;
        background: url(${background_path}) no-repeat center center;
        background-size: 325px 202px;
        position: relative;
        margin: 0px auto;
        overflow: hidden;
    }
    
    /* التاريخ */
    .date {
        /*position: absolute;*/
          margin: 0;
        font-size: 6pt;
        /* font-family: DiodrumArabic-Bold; */
        font-weight: bold;
        color: #1f3c88;
    }
    
    .photo {
        position: absolute;
        top: 55px;
        left: 20px;
        margin-top: 8px;
        width: ${width_student_image}px;
        height: ${height_student_image}px;
    }
    
    .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 0;     /* مهم جداً */
    }
    
    /* البيانات */
    .data {
        /* font-family: DiodrumArabic-Bold; */
        position: absolute;
        top: 34px;
        right: 18px;
        width: 210px;
        line-height: 1.2;
    }
    
    .university {
        font-size: 9.92pt;
        font-family: Motken noqta;
        font-weight: bold;
        color: #1d4e8e;
        margin-top: 3px;
    }
    
    .name {
        
        font-family: VIP Hala Bold;
        font-weight: bold;
        margin-top: 7px;
        color:#1d4e8e;
        
    }
    
    .program {
        /* font-family: DiodrumArabic-Bold; */
        margin-top: 4px;
        font-weight: bold;
        color:#1d4e8e;
    }
    
    .faculty {
        /* font-family: DiodrumArabic-Bold; */
        color: #f26522;
        font-weight: bold;
        margin-top: 9px;
    }
    
    /* المستوى */
    .levelText{
        margin-bottom: 6px;
        /* font-family: DiodrumArabic-Bold; */
        font-size: ${Level.length<=40?`9pt`:`8pt`};
        font-weight: bold;
    }
    .level {
        
        position: absolute;
        bottom: 46px;
        right: 22px;
        color: #fff;
        padding: 4px 10px;
        border-radius: 4px;
        margin-right: -5px
    }
    
    /* السنة */
    .year {
        /* font-family: DiodrumArabic-Bold; */
        position: absolute;
        bottom: 24px;
        right: 24px;
        font-size: 14.39pt;
        font-weight: bold;
        color: #f26522;
    }
    
    /* الباركود */
    .barcodex {
        position: absolute;
          top: 154px;
        left: 19px;
        text-align: center;
    }
    
    .barcodel img {
        width: 60pt !important;
        height: 9pt !important;
         margin-left:-16px;
    }
    
    .code {
        /* font-family: DiodrumArabic-Bold; */
        font-size: 6pt;
        font-weight: bold;
        letter-spacing: 1px;
        margin: 0;
    }
    
    /* التوقيع */
    .signature {
        /* font-family: DiodrumArabic-Bold; */
        position: absolute;
        bottom: 30px;
        left: 110px;
        font-size: 7px;
        text-align: center;
    }
      .dateCode{
    display: flex;
    margin-top: -8px;
    }
    
    .signature img {
        width: 45px;
        margin-top: 2px;
    }
    
   
    @media print 
    {   
       .barcodex {
        position: absolute;
        top: 154px;
        left: 19px;
        text-align: center;
    }
     .faculty {
        /* font-family: DiodrumArabic-Bold; */
        
        color: #f26522;
        font-weight: bold;
        margin-top: 9px;
    }
    
    .barcodel img {
        width: 60pt !important;
        height: 9pt !important;
        margin-left:-16px;
    }
    
    .code {
        /* font-family: DiodrumArabic-Bold; */
        font-size: 6pt;
        font-weight: bold;
        letter-spacing: 1px;
        margin: 0;
    }
    .dateCode{
    display: flex;
    margin-top: -3px
    }
   

}

</style>
            <div class="id-card">
           
            
            
                <div class="photo">
                    <img src="${imgPath}/getJCI?param0=stuImages.Images&param1=download&param2=${StuCode}"  alt="student">
                </div>
            
                <!-- البيانات -->
                <div class="data">
                    <div class="university">${univText}</div>
                    <div class="name" style="font-size: ${stuName.length<=40?`8pt`:`7pt`};">${stuName}</div>
                    ${show_program_flag?`<div class="program" style="font-family:'DiodrumArabic-Bold';font-size: ${stuProg.length<=40?`9pt`:`8pt`};">${stuProg}</div>`:''}
                    <div class="faculty" style="font-family:'DiodrumArabic-Bold';font-size: ${ScopeName.length<=40?`9pt`:`8pt`};">${ScopeName}</div>
                </div>
            
                <!-- المستوى -->
                ${show_level?`
                <div class="level" >
                    <span class="levelText" style="font-family:'DiodrumArabic-Bold';display: inline-block">${Level}</span>
                </div>`:``}
            
                <!-- السنة -->
                <div class="year" style="font-family:'DiodrumArabic-Bold';">${AcademicYearName}</div>
            
                <!-- الباركود -->
               
                   <div class="barcodex">
                      ${show_bar_code ? `<font color="black" class="barcodel">${studentCode}</font><br>`:``}
                      <div class="dateCode">
                      <div class="date" style="font-family:'DiodrumArabic-Bold';">${GetDate().split(" ")[0]}</div> &nbsp; &nbsp;

                      ${show_code_id? `<div class="code" style="font-family:'DiodrumArabic-Bold';">${studentCode}</div>`:``}
                       </div>

                   </div>
            
            
                <!-- التوقيع -->
                <div class="signature" style="font-family:'DiodrumArabic-Bold';font-weight: bold">
                    يعتمد رئيس الجامعة
                    <br>
                    <IMG src="${deanSign}" height=12>
                </div>
        </div>`
   return str;
}
function Helwan(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;//+" ( الصيدله الاكلينيكيه) ";
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var stu_NID=stuData.stu_NID;
    var show_bar_code=stuData.show_bar_code;
      var width_card=(stuData.width_card?stuData.width_card:"305");
   var height_card=(stuData.height_card?stuData.height_card:"183");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"65");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"92");
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY >'; //style="background-image: url(/static/images/cards/1_/card.jpg)"
    /*
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    */
    str+='              <TR>';
    str+='                  <TD style="height:22px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    /*
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    */
    str+='              <TR style="height: 90px">';

    str+='                  <TD width="1%"></TD>';
    nameFontSize = ((getName(stuName).length > 25)?"9pt":"11pt")
    progNameFontSize = ((stuProg.length > 25)?(stuProg.length > 50?"7pt":"9pt"):"11pt")
    scopeFontSize = ((ScopeName.length > 25)?"9pt":"11pt")
    str+='<TD dir='+dir+' vAlign=top align=right style="WIDTH: 60%;height:100px;">'+
        '<DIV style=" PADDING-'+align+': 7pt">'+
            '<TABLE border=0 cellSpacing=0 cellPadding=0 dir='+dir+' style="padding-'+align+':5px;" >'+
            '<TBODY>'+
            '<tr style="height:20px;" ><td  dir='+dir+' style="WIDTH: 120px;text-wrap: nowrap;"> <SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:40px;padding-top:5px;">الاسم</label>&nbsp;<span style="font-size: '+nameFontSize+';font-weight:bold;">'+getName(stuName)+'</SPAN></SPAN></td></tr>'+
             '<tr style="height:20px;"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 10pt"><label style="display:inline-block;width:40px;">الكلية</label>&nbsp;<span style="font-size: '+scopeFontSize+'">'+ScopeName+'</SPAN></SPAN></td></tr>'+
            '<tr style="height:20px;"><td style="text-wrap: nowrap;" ><SPAN style=" FONT-SIZE: 10pt"><label style="display:inline-block;width:40px;">البرنامج</label>&nbsp;<span style="font-size: '+progNameFontSize+'">'+stuProg+'</SPAN></SPAN></td></tr>'+
            '<tr style="height:20px;"><td style="text-wrap: nowrap;"><SPAN style=" FONT-SIZE: 10pt"><label style="display:inline-block;width:40px;">المستوى</label>&nbsp;<SPAN style=" FONT-SIZE: 11pt">'+Level+'</SPAN></td></tr>';
 var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
               str+='<tr style="height:20px;"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 10pt"><label style="display:inline-block;width:40px;">الكود</label>&nbsp;<SPAN style=" FONT-SIZE: 11pt">'+stu_code_id+'</SPAN></SPAN></td></tr>';

        }
               str+='<tr style="height:20px;"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 10pt" ><label style="display:inline-block;width:40px;">الرقم</label>&nbsp;'+stu_NID+'</SPAN></td></tr>';
               str+='<tr style="height:20px;vertical-align:center"><td style="text-wrap: nowrap;"><span style=" FONT-SIZE: 9pt;font-weight:bold">'+AcademicYearName+'</span>&nbsp;<span float="right">'+(show_bar_code?'<FONT  style="FONT-SIZE:10px" color=black class="barcode">'+stu_NID+'</FONT>':'')+'</span></td></tr>'+


            // '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;&nbsp;'+stu_NID+'</SPAN>' +
            // '&nbsp;&nbsp;&nbsp;&nbsp;<SPAN style="display: inline-block; FONT-SIZE: 8pt;text-align:'+(Lang=='A'?'left':'right')+'; MARGIN-'+(Lang=='A'?'right':'left')+': -10px;color:#031E6F;" dir="rtl" align=left >'+AcademicYearName+'</SPAN></td></TR>'+
            //padding-'+(Lang=='A'?'left':'right')+':12px;
            '</TBODY></TABLE>'+
        '</DIV></TD>' ;
    str+='                  <TD width="1%"></TD>';

    str+='                  <TD vAlign=top width="38%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;border: 2px solid '+color+';';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
    str+='          <div dir=ltr  align=center>';

    var signatureCard='عميد الكلية';
    var fontSize='9px';
    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" color=black><B style="white-space: nowrap">'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=18></B>';

    str+='</div>';
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='              </TR>';
    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/

    str+='              <TR>';
    str+='                  <TD style="height:22px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function BanhaNU(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;//+" ( الصيدله الاكلينيكيه) ";
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var stu_NID=stuData.stu_NID;
    var email=stuData.email;
    var background_path=stuData.background_path;
    var width_card=(stuData.width_card?stuData.width_card:"390");
   var height_card=(stuData.height_card?stuData.height_card:"243");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"65");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"92");
     var  spaces_between_lines=stuData.spaces_between_lines;
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';
//322 *212
    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%;font-weight:bold;" :"")+'" >'; //
   // str +='            <tr style="height: 0px"><td style="text-align: center;vertical-align: top" colspan="5">' +
   //        '             <SPAN style="FONT-SIZE: 12pt;font-weight:bold;" >' +getName('العام الاكاديمي|Academic Year')+" "+getName(AcademicYearName)+'</span>'+
   //  '                  </td></tr>';
    /*
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    */
    str+='              <TR>';
    str+='                  <TD style="height:22px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    /*
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    */
    str+='              <TR style="height: 80px">';

    // str+='                  <TD width="1%"></TD>';
    nameFontSize =  ((getName(stuName).length > 25)?(getName(stuName).length > 30?"10pt":"12pt"):"12pt")
    emailFontSize = ((email.length > 20)?(email.length > 30?"8pt":"9pt"):"10pt")
    str+='<TD dir='+dir+' vAlign=center align=right style="WIDTH: 60%;height:80px;">'+
        '<DIV style=" PADDING-'+align+': 15pt;margin-top:60px;margin-bottom: 20px;">'+
            '<TABLE border=0 cellSpacing=0 cellPadding=0 dir='+dir+' style="padding-'+align+':5px;" >'+
            '<TBODY>'+
            '<tr style="height:18px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'" ><td  dir='+dir+' style="WIDTH: 120px;text-wrap: nowrap;"> <SPAN style=" FONT-SIZE: 12pt;font-weight:bold;">الاسم:</SPAN>&nbsp;<span style="font-size: '+nameFontSize+';">'+getName(stuName)+'</SPAN></td></tr>'+/*font-family: banha_font;*/
            '<tr style="height:18px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 12pt;font-weight:bold;" >الرقم القومي:</span>&nbsp;<span style="FONT-SIZE: 9pt;">'+stu_NID+'</SPAN></td></tr>'+
            '<tr style="height:18px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 12pt;font-weight:bold;" >الكلية:</span>&nbsp;<span style="font-size: '+nameFontSize+';font-family: banha_font;">'+ScopeName+'</SPAN></td></tr>'+
            '<tr style="height:18px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 12pt;font-weight:bold;">كود الطالب :</SPAN>&nbsp;<SPAN style=" FONT-SIZE: 9pt">'+stu_code_id+'</SPAN></td></tr>'
        +( (stuData["showStEmail"]=="1")?'<tr style="height:18px;'+(spaces_between_lines?("line-height:"+spaces_between_lines+"px"):"")+'"><td style="text-wrap: nowrap;"><SPAN style="FONT-SIZE: 12pt;font-family: banha_font;font-weight:bold;">البريد الالكتروني:&nbsp;</SPAN><SPAN style="FONT-SIZE: '+emailFontSize+';font-family: Alamani;color: #0c5460" >'+email+'</SPAN></td></tr>':'')+

            // '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;&nbsp;'+stu_NID+'</SPAN>' +
            // '&nbsp;&nbsp;&nbsp;&nbsp;<SPAN style="display: inline-block; FONT-SIZE: 8pt;text-align:'+(Lang=='A'?'left':'right')+'; MARGIN-'+(Lang=='A'?'right':'left')+': -10px;color:#031E6F;" dir="rtl" align=left >'+AcademicYearName+'</SPAN></td></TR>'+
            //padding-'+(Lang=='A'?'left':'right')+':12px;
            '</TBODY></TABLE>'+
        '</DIV></TD>' ;
    // str+='                  <TD width="1%"></TD>';

    str+='                  <TD vAlign=top width="38%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'display: flex;width:'+width_student_image+'px;height: '+height_student_image+'px;'+color+';margin-top:-10px;margin-left:20px';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
    str+='          <div dir=ltr  align=center style="margin-top:25px">';

    var signatureCard='رئيس الجامعة';
    var fontSize='10pt';
    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" ><B style="white-space: nowrap">'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=38px width="70px"></B>';

    str+='</div>';
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='              </TR>';
    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/

    str+='          </TBODY>';
    str+='      </TABLE>';
    return str;
}

function Banha(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;//+" ( الصيدله الاكلينيكيه) ";
    var imgPath = stuData.imgPath;
    var Level = stuData.Level.split(":")[1];
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var stu_NID=stuData.stu_NID;
    var email=stuData.email;
    var show_program_flag=stuData.show_program_flag
    var show_level=stuData.show_level
    var stu_NID_Type=stuData.stu_NID_Type
    var background_path=stuData.background_path || '/static/images/cards/card_170.png';
    var width_card=(stuData.width_card?stuData.width_card:"349");
    var height_card=(stuData.height_card?stuData.height_card:"218");
    var width_student_image=(stuData.width_student_image?stuData.width_student_image:"65");
    var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="background-image: url('+background_path+');background-size: 100% 100%;color:#0c5460 ;font-weight:bold;" >'; //
    str+='              <TR>';
    str+='                  <TD style="height:22px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR style="height: 80px">';
    nameFontSize =  ((getName(stuName).length > 25)?(getName(stuName).length > 30?"7pt":"8pt"):"10pt")
    emailFontSize = ((email.length >=19) ?"7pt":"8pt");

    var ProgramName=(stuProg ?stuProg:"");
    ProgramNamFontSize =  ((getName(ProgramName).length > 40)?(getName(ProgramName).length > 45?(getName(ProgramName).length > 60?"6pt":"7pt"):"8pt"):"10pt")

    str+='<TD dir='+dir+' vAlign=top align=right style="WIDTH: 60%;height:80px;">'+
        '<DIV style=" PADDING-'+align+': 9pt;margin-top:70px;">'+
            '<TABLE border=0 cellSpacing=0 cellPadding=0 dir='+dir+' style="padding-'+align+':5px;" >'+
            '<TBODY>'+
            '<tr style="height:18px"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 11pt;font-family: banha_font;font-weight:bold;color:#eb4606;" >الكلية:</span>&nbsp;<span style="font-size: '+nameFontSize+';font-family: banha_font;">'+ScopeName+'</SPAN></td></tr>'+

            '<tr style="height:18px" ><td  dir='+dir+' style="WIDTH: 120px;text-wrap: nowrap;font-weight:bold;"> <SPAN style=" FONT-SIZE: 11pt;font-family: banha_font;font-weight:bold;color:#eb4606;">الاسم:</SPAN>&nbsp;<span style="font-size: '+nameFontSize+';font-family: banha_font;">'+getName(stuName)+'</SPAN></td></tr>'+
            '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 10pt;font-family: banha_font;font-weight:bold;color:#eb4606;">كود الطالب :</SPAN>&nbsp;<SPAN style=" FONT-SIZE: 8pt;">'+stu_code_id+'</SPAN></td></tr>';
            if(show_program_flag)
               str+=  '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE:9pt;font-family: banha_font;font-weight:bold;color:#eb4606;">البرنامج :</SPAN>&nbsp;<SPAN style=" FONT-SIZE: '+ProgramNamFontSize+';">'+ProgramName+'</SPAN></td></tr>';
            str+=' <tr style="height:18px"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 11pt;font-family: banha_font;font-weight:bold;color:#eb4606;" >'+((stu_NID_Type=='3.3.')?'رقم الجواز: ':'الرقم القومي: ')+'</span>&nbsp;<span style="FONT-SIZE: 8pt;">'+stu_NID+'</SPAN></td></tr>' +
                 ( (stuData["showStEmail"]=="1")?    '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: '+((email.length >= 20)?"10pt":"11pt")+';font-family: banha_font;font-weight:bold;color:#eb4606;">الايميل الالكتروني:&nbsp;</SPAN><SPAN style="FONT-SIZE: '+emailFontSize+';font-family: Alamani;" >'+email+'</SPAN></td></tr>':'')+
                 ( (stuData["show_level"]=="1")?    '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 11pt;font-family: banha_font;font-weight:bold;color:#eb4606;">المستوي:&nbsp;</SPAN><SPAN style="FONT-SIZE:11pt;font-family: Alamani;" >'+Level+'</SPAN></td></tr>':'')+




            // '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;&nbsp;'+stu_NID+'</SPAN>' +
            // '&nbsp;&nbsp;&nbsp;&nbsp;<SPAN style="display: inline-block; FONT-SIZE: 8pt;text-align:'+(Lang=='A'?'left':'right')+'; MARGIN-'+(Lang=='A'?'right':'left')+': -10px;color:#031E6F;" dir="rtl" align=left >'+AcademicYearName+'</SPAN></td></TR>'+
            //padding-'+(Lang=='A'?'left':'right')+':12px;
            '</TBODY></TABLE>'+
        '</DIV></TD>' ;
    // str+='                  <TD width="1%"></TD>';

    str+='                  <TD vAlign=top width="38%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;color:'+color+';margin-top:0px;';
        if(!imgPath) imgPath=""
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" ><span style="color:#036aac;">'+AcademicYearName.replace("-","/")+'</span> ';
    }
    str+='          <div dir=ltr  align=center style="margin-top:40px">';

    var signatureCard='رئيس الجامعة';
    var fontSize='12px';
    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" ><B style="white-space: nowrap;color:#036aac;">'+signatureCard+'</FONT><BR>&nbsp;<IMG src="/static/images/deans/170_.png" height=20px width="25px"></B>';

    str+='</div>';
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='              </TR>';
    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/

    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}
function cairoLaw(stuData){
   // var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;//+" ( الصيدله الاكلينيكيه) ";
    var imgPath = stuData.imgPath;
    var Level = stuData.Level.split(":")[1];
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var stu_NID=stuData.stu_NID;
    var email=stuData.email;
    var show_program_flag=stuData.show_program_flag
    var show_level=stuData.show_level
    var stu_NID_Type=stuData.stu_NID_Type
    var background_path=stuData.background_path || '/static/images/cards/card_170.png';
    var width_card=(stuData.width_card?stuData.width_card:"349");
    var height_card=(stuData.height_card?stuData.height_card:"218");
    var width_student_image=(stuData.width_student_image?stuData.width_student_image:"65");
    var height_student_image=(stuData.height_student_image?stuData.height_student_image:"80");
        var show_bar_code=stuData.show_bar_code;
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="background-image: url('+background_path+');background-size: 100% 100%;color:#0c5460 ;font-weight:bold;" >'; //
    str+='              <TR>';
    str+='                  <TD style="height:22px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR style="height: 80px">';
    
    nameFontSize =  (getName(stuName).length > 40 ?"9pt":"10pt")
    emailFontSize = ((email.length >=19) ?"7pt":"8pt");

    var ProgramName=(stuProg ?stuProg:"");
    ProgramNamFontSize =  ((getName(ProgramName).length > 40)?(getName(ProgramName).length > 45?(getName(ProgramName).length > 60?"6pt":"7pt"):"8pt"):"10pt")

    str+='<TD dir='+dir+' vAlign=top align=right style="WIDTH: 60%;height:80px;">'+
        '<DIV style=" PADDING-'+align+': 9pt;margin-top:70px;">'+
            '<TABLE border=0 cellSpacing=0 cellPadding=0 dir='+dir+' style="padding-'+align+':5px;" >'+
            '<TBODY>'+

            '<tr style="height:18px" ><td  dir='+dir+' style="WIDTH: 120px;text-wrap: nowrap;font-weight:bold;"> <SPAN style=" FONT-SIZE: 10pt;font-family: banha_font;font-weight:bold;color:#eb4606;">الاسم:</SPAN>&nbsp;<span style="font-size: '+nameFontSize+';">'+getName(stuName)+'</SPAN></td></tr>';
            if(show_program_flag)
               str+=  '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE:10pt;font-family: banha_font;font-weight:bold;color:#eb4606;">البرنامج :</SPAN>&nbsp;<SPAN style=" FONT-SIZE: '+ProgramNamFontSize+';">'+ProgramName+'</SPAN></td></tr>';

            str+= ( (stuData["show_level"]=="1")?    '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 10pt;font-family: banha_font;font-weight:bold;color:#eb4606;">المستوي:&nbsp;</SPAN><SPAN style="FONT-SIZE:10pt;" >'+Level+'</SPAN></td></tr>':'');

            str+='<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 10pt;font-family: banha_font;font-weight:bold;color:#eb4606;">كود الطالب :</SPAN>&nbsp;<SPAN style=" FONT-SIZE: 10pt;">'+stu_code_id+'</SPAN></td></tr>';

            str+=' <tr style="height:18px"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: 10pt;font-family: banha_font;font-weight:bold;color:#eb4606;" >'+((stu_NID_Type=='3.3.')?'رقم الجواز: ':'الرقم القومي: ')+'</span>&nbsp;<span style="FONT-SIZE: 10pt;">'+stu_NID+'</SPAN></td></tr>' +
                 ( (stuData["showStEmail"]=="1")?    '<tr style="height:18px;"><td style="text-wrap: nowrap;font-weight:bold;"><SPAN style="FONT-SIZE: '+((email.length >= 20)?"10pt":"11pt")+';font-family: banha_font;font-weight:bold;color:#eb4606;">الايميل الالكتروني:&nbsp;</SPAN><SPAN style="FONT-SIZE: '+emailFontSize+';font-family: Alamani;" >'+email+'</SPAN></td></tr>':'');


                if(show_bar_code){
                       str+='<tr style="height:18px"><td style="padding-top: 3px;"><FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT></td></tr>'
                }


            // '<tr><td><SPAN style=" FONT-SIZE: 8pt"><label style="display:inline-block;width:50px;">الرقم القومي</label>&nbsp;&nbsp;'+stu_NID+'</SPAN>' +
            // '&nbsp;&nbsp;&nbsp;&nbsp;<SPAN style="display: inline-block; FONT-SIZE: 8pt;text-align:'+(Lang=='A'?'left':'right')+'; MARGIN-'+(Lang=='A'?'right':'left')+': -10px;color:#031E6F;" dir="rtl" align=left >'+AcademicYearName+'</SPAN></td></TR>'+
            //padding-'+(Lang=='A'?'left':'right')+':12px;
           str+= '</TBODY></TABLE>'+
        '</DIV></TD>' ;
    // str+='                  <TD width="1%"></TD>';

    str+='                  <TD vAlign=top width="38%" align=center>';

    if (StuCode) {
        //;margin-right: -30px
        style= 'display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;color:'+color+';margin-top:0px;';
        if(!imgPath) imgPath=""
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" ><span style="color:#036aac;">'+AcademicYearName.replace("-","/")+'</span> ';
    }

    str+='          <div dir=ltr  align=center style="margin-top:40px;margin-left:10px">';

    var signatureCard='عميد الكلية';
    var fontSize='12px';
    str+='<FONT style="FONT-SIZE:'+fontSize+';line-height:2.5mm" ><B style="white-space: nowrap;color:#036aac;">'+signatureCard+'</FONT><BR>&nbsp;<IMG  style="margin-left: -14px;width:100%;height: 100%" src="'+deanSign+'" height=12></B>';

    str+='</div>';
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='              </TR>';

    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/

    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}



function BusCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var Itenerary=stuData.Itenerary;
    var subscriptionNo=stuData.subscriptionNo;
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:325px;height: 202px" align=center nowrap  dir="rtl" class="">';
    // str+='         <TBODY style="background-image: url(/static/images/cards/bus.png)">';
    str+='         <TBODY style="background-size:325px 202px;background-image: url(/static/images/cards/busN_x.jpg)">';

    /*
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    */
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    //'+bgcolor+'
    scopeFontSize = ((ScopeName.length > 20)?"10pt":"11pt")
    str+='                  <TD style="height:25px;" vAlign=bottom colSpan=5 align=center></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
    /*
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    */
    str+='              <TR style="height: 135px">';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'margin-top: 12px;display: flex;width:66px;height:77px;border: 2px solid '+color+';';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    nameFontSize = ((stuName.length > 40)?"10pt":"12pt")
    itenraryFontSize = ((getName(Itenerary).length > 30)?"9pt":"11pt")

    str+='                  <TD style="line-height: 1.6;HEIGHT: 23mm;text-align: right;padding-top:30px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+nameFontSize+' arabic transparent" color=darkblue>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="line-height: 1.6;FONT: bold '+scopeFontSize+' arabic transparent" color=darkblue>'+ScopeName+'-'+AcademicSemesterName+'</FONT><BR>&nbsp;'
    str+='				<FONT style="line-height: 1.6;FONT: bold '+itenraryFontSize+' arabic transparent" color=darkblue>'+getName("خط|Itenrary")+'&nbsp;'+getName(Itenerary)+'</FONT><BR>&nbsp;&nbsp;<span style="line-height: 1.6;FONT: bold 13pt arabic transparent;padding-right:100px">'+subscriptionNo+'</span>';//<BR>

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    // str+='                      <SPAN style="float:right;color: '+PrintColor+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    //<img style="margin-top: -60px;display: flex;width: 60px;border: 2px solid #394162;" src="/getJCI?param0=stuImages.Images&amp;param1=download&amp;param2=800159954">
    //str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B></TD>';
    //<BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT>
    str+='                  <TD dir=ltr vAlign=middle align=center>';
    style= 'margin-top: -50px;display: flex;width: 70px;border: 1px solid '+color+';';
    // str += ' <IMG style="'+style+'" src="/getJCI?param0=stuImages.Images&param1=downloadGatesQR&param2=' + StuCode + '" > ';
    str += '</TD>';
    str+='                  <TD dir=ltr colSpan=2 align=left style="line-height: 0.5;">' ;
    str+='          <div style="float:right;width:25%" dir=ltr vAlign=top align=center>';
    var signatureCard='يعتمد عميد الكلية';
    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */
    // str+='<IMG src="'+deanSign+'" height=12>';
    str+='</div>';
    str+='<div style="margin-left:5px;margin-top:-10px;width:72%;"><FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT>' +
        '<BR><FONT style="FONT: 8px times;float: left">ID: <B>'+stu_code_id+'</B></FONT>' +
        '<FONT style="FONT: 8px times"><B style="float: left;margin-left: 55px;">'+GetDate().split(" ")[0]+'</B></FONT></div></TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}


function MasnsNU(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var imgPath = stuData.imgPath;
    var Level = stuData.Level;
    var LevelName=stuData.LevelName;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var PrintColor=stuData.PrintColor;
    var ScopeID=stuData.ScopeID;
    var show_bar_code=stuData.show_bar_code;
    var width_card=(stuData.width_card?stuData.width_card:"325");
   var height_card=(stuData.height_card?stuData.height_card:"202");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"66");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"77");
    bgcolor="";
    color=PrintColor;
    if(PrintColor!="#248f24" && PrintColor!="#002bff"){
        bgcolor="background-color: "+PrintColor+";"
        color="white";
    }
    PrintColor= "#ff0076"
    //color = '#394162';

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='         <TBODY style="background-image: url(/static/images/cards/1531_.jpg);background-size:100% 100%">';
    /*
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    */
    str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    //'+bgcolor+'


     scopeFontSize = (ScopeName.length > 29 ?"11.5px" :((ScopeName.length > 20)?"12.5px":((ScopeName.length > 15)?"16.5px":"21px")));
       style='display: flex;font-size: '+scopeFontSize+';font-family: Air-Strip-Arabic;padding-right:162px;margin-bottom: -10px;'
    str+='                  <TD style="height:25px;" vAlign=bottom colSpan=5 align=center><FONT style="'+style+'" class="Card_collage_Name" color="'+color+'" ><B >'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'

    str+='              </TR>';
    /*
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    // str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';

    str+='              </TR>';
    */
    str+='              <TR style="height: 135px">';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        //;margin-right: -30px
        style= 'margin-top: 12px;display: flex;width:'+width_student_image+'px;height:'+height_student_image+'px;border: 2px solid '+color+';';
        str += ' <IMG style="'+style+'" download="'+StuCode+'"  src="'+imgPath+'/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    nameFontSize = ((stuName.length > 40)?"10pt":"11pt")
    str+='                  <TD style="line-height: 1.6;HEIGHT: 23mm;text-align: right;padding-top:30px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+nameFontSize+' arabic transparent" color=darkblue>'+stuName+'</FONT><BR>&nbsp;';
    //var ProgramName = (stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))
    var ProgramName=(stuProg ?stuProg:"");
    str+='				<FONT style="line-height: 1.6;FONT: bold '+((ProgramName.length > 30)?"9pt":"11pt")+' arabic transparent" color=darkblue>'+ProgramName+'</FONT><BR>&nbsp;'
  //  str+='<FONT style="line-height: 1.6;FONT: bold 11pt arabic transparent " color=darkblue>ID: <B>'+stu_code_id+'</B></FONT><BR>'
    //str+='				<FONT style="line-height: 1.6;FONT: bold 11pt arabic transparent" color=darkblue>'+Level+'</FONT><BR>&nbsp;&nbsp;';//<BR>

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:right;color: #E5097F;font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';
    // str+='                      <SPAN style="float:right;color: '+PrintColor+';font-weight:bold;padding: 2px 9px 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

   if(stuData.AddLevelStd){
    str+='            <FONT style="FONT: bold '+nameFontSize+' arabic transparent" color=darkblue>'+getName("المستوى|level")+'</label>&nbsp;'+LevelName+'</FONT><BR>&nbsp;';

   }
    str+='                  </TD>';


    str+='                  <TD></TD>';
    str+='              </TR>';


    /*str+='              <TR>';
    // str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';

    str+='              </TR>';*/
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    //<img style="margin-top: -60px;display: flex;width: 60px;border: 2px solid #394162;" src="/getJCI?param0=stuImages.Images&amp;param1=download&amp;param2=800159954">
    //str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>'+signatureCard+'</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B></TD>';
    //<BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT>
    str+='                  <TD dir=ltr vAlign=middle align=center>';
    style= 'margin-top: -50px;display: flex;width: 70px;border: 1px solid '+color+';';
    str += ' <IMG style="'+style+'" src="/getJCI?param0=stuImages.Images&param1=downloadGatesQR&param2=' + stu_code_id + '" > ';
    str += '</TD>';
    str+='                  <TD dir=ltr colSpan=2 align=left style="line-height: 0.5;">' ;
    str+='          <div style="float:right;width:25%" dir=ltr vAlign=top align=center>';
    var signatureCard='يعتمد عميد الكلية';
    /*
    if(ScopeID=='1.3.')
       signatureCard='يعتمد القائم بعمل عميد الكلية' ;
    */
    // str+='<IMG src="'+deanSign+'" height=12>';
    str+='</div>';
    str+='<div style="margin-left:5px;margin-top:-10px;width:72%;">'
    if( show_bar_code)
        str+='   <FONT  style="FONT-SIZE:18px;margin-left: 10px" color=black class="barcode">'+studentCode+'</FONT><BR>'
      str+=   '<FONT style="FONT: 8px times;float: left;margin-left: 10px">ID: <B>'+stu_code_id+'</B></FONT>'
       str+=     '<FONT style="FONT: 8px times"><B style="float: left;margin-left: 55px;">'+GetDate().split(" ")[0]+'</B></FONT></div></TD>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}


function ScuCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
    var stuNationalNum = stuData.stuNationalNum;
    var EnterYear=getName(stuData.EnterYear);
    var show_bar_code = stuData.show_bar_code;
     var width_card=(stuData.width_card?stuData.width_card:"310");
    var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");
   var background_path=stuData.background_path;


    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='          <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%\";" :"")+'">';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';

    }
    fontSize="11pt";
    if(stuName.length<32) fontSize="13pt";
    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 22mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold '+fontSize+' arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR><BR>&nbsp;&nbsp;';
    str += ' <IMG style="width:68px;" src="/getJCI?param0=stuImages.Images&param1=downloadQR&param2=' + stuNationalNum + '" > ';
    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding:48px 0 0 11px;FONT-size: 14px" dir=ltr>'+getName("عام الالتحاق|Student Enroll Year") +'&nbsp'+EnterYear+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد عميد الكلية</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';
 str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;'
if(show_bar_code){
     str+='     <FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR>'
}

       str+='   <FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+stu_code_id+"</B></FONT>" ;
      str+=      "</TD>";
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function MiniaCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
 var show_bar_code=stuData.show_bar_code;
    var univEmail = stuData.univEmail;
    var PrintColor=stuData.PrintColor;

   var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"88");
   var background_path=stuData.background_path;

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='          <TBODY style="'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%\";" :"")+'">';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+PrintColor+'" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:'+PrintColor+'"></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }

    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR>&nbsp;&nbsp;';

    if(univEmail)
        str+='				<span style="direction:ltr;"><FONT style="float:left;margin-left:8px;FONT: 9pt arabic transparent" color=#000>'+univEmail+'</FONT></span><BR>&nbsp;&nbsp;';

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:left;color:'+PrintColor+';font-weight:bold;padding: 2px 0 0 20px;FONT-size: 16px" dir=ltr>' + AcademicYearName+'</SPAN>';
    // str+='                      <font style="padding-top:20px;float:right;margin-right:3px;FONT: 9pt arabic transparent">sat,sun,mon,tus,wed,thu</font>';
    str+='<font style="padding: 7px 0 3px 20px;float:left;margin-right:3px;FONT: 7pt arabic transparent">'+DaysNames+'</font>\n';
    str+='<span style="float:right;color:'+PrintColor+';font-weight:bold;padding-top:2px;padding-right:5px;FONT-size: 16px;" dir="ltr">'+AcademicYearName+'</span="">';
    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="background-color:'+PrintColor+'" height=2 colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    str+='                  <TD dir=ltr vAlign=middle style="white-space:nowrap" align=center><FONT style="FONT-SIZE: 9px" color=black><B>رئيس الجامعة</FONT><BR><IMG src="'+deanSign+'" height=12 width="50px"></B><BR><FONT style="FONT-SIZE: 9px">أ.د./عصام الدين صادق فرحات</FONT></TD>';
 str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;'
if (show_bar_code)
{
  str+=' <FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR>' ;
}

         str+=  '<FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+stu_code_id+"</B></FONT></TD>";
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function MansEngCard (stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='          <TBODY>';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }

    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+Level+'</FONT><BR><BR>&nbsp;&nbsp;'

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B> يعتمد القائم بعمل عميد الكلية</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';


    str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+stu_code_id+"</B></FONT></TD>";
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

function AlexCard(stuData){
    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
     var show_bar_code = stuData.show_bar_code;
     var background_path=stuData.background_path;
      var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"202");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");

    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    str+='          <TBODY style= "'+(background_path ?"background-image: url("+background_path+");background-repeat:no-repeat;background-position:center;background-size:100% 100%\";" :"")+'">';
    str+='              <TR>';
    str+='                  <TD style="height:3px;" colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#009afe" ><B>'+ScopeName+'</B></FONT></TD>'; //+' - '+progtitle+'
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD height="2px" colSpan=5 style="background-color:#009afe"></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD width="1%">';
    str+='                  <TD vAlign=top width="26%" align=center>';
    if (StuCode) {
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }

    str+='                  </TD>';
    str+='                  <TD width="1%"></TD>';
    str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+stu_code_id+'</FONT><BR><BR>&nbsp;&nbsp;'

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    str+='                      <SPAN style="float:left;color: #009afe;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' +AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='              </TR>';
    str+='              <TR>';
    str+='                  <TD style="background-color:#009afe" height=2 colSpan=5></TD>';
    str+='              </TR>';
    str+='              <TR style="height:35px;">';
    str+='                  <TD>';
    str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد عميد الكلية</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';
 str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;'
     if(show_bar_code)
        str+=' <FONT  style="FONT-SIZE:18px" color=black class="barcode">'+studentCode+'</FONT><BR>';
    str+='                      <FONT style="FONT: 12px times"><B>'+Level+'</B></FONT></td>';
    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}

generateC39 = function(){
    $('.barcodel').barcode({code:'code39'});
    $('.barcode').barcode({code:'code39'});
};



function ThebesCard(stuData){

    var ScopeName = stuData.ScopeName;
    var StuCode = stuData.StuCode;
    var stuName = stuData.stuName;
    var stuProg = stuData.stuProg;
    var Level = stuData.Level;
    var AcademicYearName = stuData.AcademicYearName;
    var deanSign = stuData.deanSign;
    var stu_code_id = stuData.stu_code_id;
    var studentCode=stuData.studentCode;
var background_path=stuData.background_path;
var show_bar_code=stuData.show_bar_code;
 var width_card=(stuData.width_card?stuData.width_card:"310");
   var height_card=(stuData.height_card?stuData.height_card:"200");
   var width_student_image=(stuData.width_student_image?stuData.width_student_image:"76");
   var height_student_image=(stuData.height_student_image?stuData.height_student_image:"90");
    var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:'+width_card+'px;height: '+height_card+'px" align=center nowrap  dir="rtl" class="cardtbl">';
    //ToDo fix image name
   // bgUrl = "/static/images/cards/"+ScopeID.replace(/\./g, '_')+".jpg";
   // str+='          <TBODY  style="background-image: url('+bgUrl+')'+(ScopeID.indexOf("112.1.")==0?";background-size:310px 200px;":"")+'">';
    str += '<TBODY style="';

        if (background_path) {
            str += 'background-image: url(' + background_path + ');';
            str += 'background-size: 100% 100%;'
           //str += 'background-repeat: no-repeat;';
            //str += 'background-position: center;';

            // if (ScopeID.indexOf("112.1.") == 0) {
            //     str += 'background-size: 310px 200px;';
            // }
            // else{
            //     str += 'background-size: 325px 200px;';
            // }
        }

        str += '">';
    //str+='              <TR>';
    //str+='                  <TD style="height:3px;" colSpan=5></TD>';
    //str+='              </TR>';
    // str+='              <TR>';
    // str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=left><SPAN style="float:left;color:white;font-weight:bold;padding: 2px 0 20px 10px;FONT-size: 16px" dir=ltr>' + AcademicYearName+'</SPAN></TD>'; //+' - '+progtitle+'
    // //<FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT>
    // str+='              </TR>';
    //str+='              <TR>';
    //str+='                  <TD height="2px" colSpan=5 ></TD>';//style="background-color:#E5097F"
    //str+='              </TR>';
    if(ScopeID.indexOf("112.1.")==0) {
            str+='<tr height="50px"><td colspan="4"></td></tr>'

    }
    else{
        str+='              <TR>';
        str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=left><SPAN style="float:left;color:white;font-weight:bold;padding: 2px 0 20px 10px;FONT-size: 16px" dir=ltr>' + (ScopeID.indexOf("112.3.")==0?"":AcademicYearName)+'</SPAN></TD>'; //+' - '+progtitle+'
        //<FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+ScopeName+'</B></FONT>
        str+='              </TR>';
    }
    str+='              <TR>';
    str+='                  <TD width="1%"></TD>';

    //str+='                  <TD width="1%"></TD>';
    str+='     <TD nowrap style="HEIGHT: 23mm;text-align: right;padding-top:13px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 10pt arabic transparent" color=#000>'+stuName+'</FONT><BR>&nbsp;';
 var show_code_id=stuData.show_code_id;
     if(show_code_id =="1"){
        str+='				<FONT style="FONT: bold 10pt arabic transparent" color=#000>الكود: '+stu_code_id+'</FONT><BR>&nbsp;';
        }

    str+='				<FONT style="FONT: bold 10pt arabic transparent" color=#000>التخصص: '+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
    str+='				<FONT style="FONT: bold 10pt arabic transparent" color=#000>'+Level+'</FONT><BR>'//&nbsp;&nbsp;

    //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
    //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
    // str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 60px;FONT-size: 16px" dir=ltr>' + AcademicYearName+'</SPAN>';

    str+='                  </TD>';
    str+='                  <TD></TD>';
    str+='                  <TD vAlign=top width="26%" align=left>';
    if (StuCode) {
        str += ' <IMG style="width:'+width_student_image+'px;height:'+height_student_image+'px;'+(ScopeID.indexOf("112.1")==0?"":"margin-bottom: -20px;padding-top: 12px")+'" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + StuCode + '" > ';
    }

    str+='                  </TD>';
    str+='              </TR>';
    //str+='              <TR>';
    //str+='                  <TD  height=2 colSpan=5></TD>';//style="background-color:#E5097F"
    //str+='              </TR>';
    if(ScopeID.indexOf("112.1.")==0){
        str+=`<tr><td></td><td  style="float: right;FONT: bold 8pt arabic " color="#000">UserID:`+stu_code_id+`</td><td></td><td></td></tr>`
    }
    else{
        str+='              <TR dir="ltr">';
        str+='                  <TD align=right ></TD>'
        str+='                  <TD  height=2 style="float: right" ><font style="FONT: bold 8pt arabic transparent" color="#000">User ID:'+stu_code_id+'</font></TD>';
        str+='                  <TD  height=2 ><font style="FONT: bold 8pt arabic transparent" color="#000">&nbsp;'+(ScopeID.indexOf("112.1.")==0 ?"":getName('عميد المعهد |Institute Dean'))+'</font></TD>';//style="background-color:#E5097F"
        str+='                  <TD  height=2 ><font style="FONT: bold 8pt arabic transparent" color="#000"></font></TD>';




        str+='              </TR>';

    }

    str+='              <TR style="height:25px;">';
    str+='                  <TD></TD>';
    if(show_bar_code)
        str+='                  <TD align=right ><FONT  style="" color=black class="barcode">'+studentCode+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></TD>';//FONT-SIZE:18px
   else
        str+='                  <TD align=right ></TD>'
    if(ScopeID.indexOf("112.1.")==0) {
        str+='<TD dir=ltr colSpan=2 vAlign=middle align=center style="padding-bottom: 15px;padding-left: 70px">' ;

    }
    else{
            str+='<TD dir=ltr colSpan=2 vAlign=middle align=center style="padding-bottom: 15px;padding-left: 70px">' ;

            str+='<IMG src="'+deanSign+'" height=12>' ;
    }

    str+='</B><BR><FONT style="FONT-SIZE: 9px"></FONT></TD>';//'+GetDate()+' يعتمد عميد الكلية


    str+='              </TR>';
    str+='          </TBODY>';
    str+='      </TABLE>';

    return str;
}



















/*
function getCardDesign(result){
    var cardProfile = result["cardProfile"];
    var data=result["stdData"];

    var CardColor = "#E5097F";
    if(cardProfile["textColor"] && cardProfile["textColor"])	CardColor=cardProfile["textColor"];

    var str = "";

    if(data &&data[0])
    {
        str +='<table class="tblprint" dir='+dir+' ><tr>';
        for (var i =0;i<data.length;i++)
        {

            var deanSign="/static/images/deans/"+data[i].ScopeID.replace(/\./g,"_")+".jpg";
            if (i%10==0 && i>0){
                str+="</tr></table><table class='tblprint' dir='"+dir+"'><tr>";
            }else
                str+=(i%2==0 && i>0?'</tr><tr>':'');
            var stuProg=getName(data[i]['progName']);
            var isOpen=String(stuProg).indexOf('(');
            var progtitle=(isOpen>0? String(stuProg).substring(isOpen,stuProg.length).replace(/\(/g," ").replace(/\)/g," "):getName(stuProg))
            var progN=(isOpen>0? String(stuProg).substring(0,isOpen):getName(stuProg));
            str +='<td class="tblprinttd" align="right" dir="rtl" >';

            /****str+='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
            str+='          <TBODY>';
            str+='              <TR>';
            str+='                  <TD style="height:3px;" colSpan=5></TD>';
            str+='              </TR>';
            str+='              <TR>';
            str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="'+CardColor+'" ><B>'+getName(data[i]['ScopeName'])+'</B></FONT></TD>'; //+' - '+progtitle+'
            str+='              </TR>';
            str+='              <TR>';
            str+='                  <TD height="2px" colSpan=5 style="background-color:'+CardColor+'"></TD>';
            str+='              </TR>';
            str+='              <TR>';
            str+='                  <TD width="1%">';
            str+='                  <TD vAlign=top width="26%" align=center>';
            if (data[i]['StuCode']) {
                str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + data[i]['StuCode'] + '" > ';
            }

            str+='                  </TD>';
            str+='                  <TD width="1%"></TD>';
            str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+getName(data[i]["name"])+'</FONT><BR>&nbsp;';
            str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
            str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(ScopeProgType == "Credit" ?getName('المستوى|Level'):"")+'&nbsp;&nbsp;'+getName(data[i]['Level'])+'</FONT><BR>&nbsp;&nbsp;'

            //mmostafa
             //Minia
            if (cardProfile["showStEmail"]=="1" && data[i]['univEmail']) {
                str+='				<FONT style="float:left;margin-left:8px;FONT: 9pt arabic transparent" color=#000>'+data[i]['univEmail']+'</FONT><BR>&nbsp;&nbsp;'
            }
            else{
                str+='<BR>'
            }
            //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
            //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
            str+='                      <SPAN style="float:left;color: '+CardColor+';font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + AcademicYearName +'</SPAN>';

            str+='                  </TD>';
            str+='                  <TD></TD>';
            str+='              </TR>';
            str+='              <TR>';
            str+='                  <TD style="background-color:'+CardColor+'" height=2 colSpan=5></TD>';
            str+='              </TR>';
            str+='              <TR style="height:35px;">';
            str+='                  <TD>';

            if(ScopeID.indexOf("179.")==0){
                str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد رئيس الجامعة</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';

            }

            else if( data[i].ScopeID.indexOf("1.10.")==0){
                str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد نائب رئيس الجامعة</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';

            }

            else{
                str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد عميد الكلية</FONT><BR>&nbsp;<IMG src="'+deanSign+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';
            }

            str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+data[i]["StuCode"]+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+data[i]["stu_code_id"];
            str+='              </TR>';
            str+='          </TBODY>';
            str+='      </TABLE>';****/ /*
            if(ScopeID.indexOf("179.")==0)  str += '<minia-card ';
            else if(ScopeID.indexOf("165.")==0)  str += '<alex-card ';
            else if(ScopeID.indexOf("1.10.")==0)  str += '<mans-eng-card ';
            else str += '<default-card ';

            str += '    name="custom-card"';
            str += '    ScopeName="'+getName(data[i]['ScopeName'])+'"';
            str += '    StuCode="'+data[i]['StuCode']+'" ';
            str += '    stuName="'+getName(data[i]['name'])+'" ';
            str += '    Level="'+(ScopeProgType == "Credit" ?getName('المستوى|Level'):"")+'&nbsp;&nbsp;'+getName(data[i]['Level'])+'" ';
            str += '    AcademicYearName="'+AcademicYearName+'" ';
            str += '    stu_code_id="'+data[i]['stu_code_id']+'" ';
            str += '    stuProg="'+stuProg+'" ';
            str += '    deanSign="'+deanSign+'" ';
            str += '> ';
            str+='</td>';
            if(cardProfile["cardsPadding"]!="" &&parseInt(cardProfile["cardsPadding"]) && i%2==0)    str += "<td style='width:"+cardProfile["cardsPadding"]+"px;padding:0;'></td>";
        }
        str+="</tr></table>"
        ;
    }

    return str;
}


class DefaultCard extends HTMLElement{
    constructor() {
        // Always call super first in constructor
        super();

        // write element functionality in here

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});

        var stuProg = this.getAttribute('stuProg');

        var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
        str+='          <TBODY>';
        str+='              <TR>';
        str+='                  <TD style="height:3px;" colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+this.getAttribute("ScopeName")+'</B></FONT></TD>'; //+' - '+progtitle+'
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD width="1%">';
        str+='                  <TD vAlign=top width="26%" align=center>';
        if (this.getAttribute('StuCode')) {
            str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + this.getAttribute('StuCode') + '" > ';
        }

        str+='                  </TD>';
        str+='                  <TD width="1%"></TD>';
        str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute("stuName")+'</FONT><BR>&nbsp;';
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute('Level')+'</FONT><BR><BR>&nbsp;&nbsp;';

        //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
        //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
        str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + this.getAttribute('AcademicYearName')+'</SPAN>';

        str+='                  </TD>';
        str+='                  <TD></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR style="height:35px;">';
        str+='                  <TD>';
        str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد عميد الكلية</FONT><BR>&nbsp;<IMG src="'+this.getAttribute('deanSign')+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';


        str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+this.getAttribute("StuCode")+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+this.getAttribute("stu_code_id");
        str+='              </TR>';
        str+='          </TBODY>';
        str+='      </TABLE>';

        shadow.innerHTML = str;

    }


    connectedCallback(){

          shadow.shadowRoot.querySelector('.barcode').barcode({code:'code39'});
    }
}

class MiniaCard extends HTMLElement{
    constructor() {
        // Always call super first in constructor
        super();

        // write element functionality in here

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});

        var stuProg = this.getAttribute('stuProg');

        var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
        str+='          <TBODY>';
        str+='              <TR>';
        str+='                  <TD style="height:3px;" colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+this.getAttribute("ScopeName")+'</B></FONT></TD>'; //+' - '+progtitle+'
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD width="1%">';
        str+='                  <TD vAlign=top width="26%" align=center>';
        if (this.getAttribute('StuCode')) {
            str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + this.getAttribute('StuCode') + '" > ';
        }

        str+='                  </TD>';
        str+='                  <TD width="1%"></TD>';
        str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute("stuName")+'</FONT><BR>&nbsp;';
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute('Level')+'</FONT><BR>&nbsp;&nbsp;';

        str+='				<FONT style="float:left;margin-left:8px;FONT: 9pt arabic transparent" color=#000>'+this.getAttribute('univEmail')+'</FONT><BR>&nbsp;&nbsp;';

        //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
        //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
        str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + this.getAttribute('AcademicYearName')+'</SPAN>';

        str+='                  </TD>';
        str+='                  <TD></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR style="height:35px;">';
        str+='                  <TD>';
        str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد رئيس الجامعة</FONT><BR>&nbsp;<IMG src="'+this.getAttribute('deanSign')+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';


        str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+this.getAttribute("StuCode")+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+this.getAttribute("stu_code_id");
        str+='              </TR>';
        str+='          </TBODY>';
        str+='      </TABLE>';

        shadow.innerHTML = str;
  }
}

class MansEngCard extends HTMLElement{
    constructor() {
        // Always call super first in constructor
        super();

        // write element functionality in here

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});

        var stuProg = this.getAttribute('stuProg');

        var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
        str+='          <TBODY>';
        str+='              <TR>';
        str+='                  <TD style="height:3px;" colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#E5097F" ><B>'+this.getAttribute("ScopeName")+'</B></FONT></TD>'; //+' - '+progtitle+'
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD height="2px" colSpan=5 style="background-color:#E5097F"></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD width="1%">';
        str+='                  <TD vAlign=top width="26%" align=center>';
        if (this.getAttribute('StuCode')) {
            str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + this.getAttribute('StuCode') + '" > ';
        }

        str+='                  </TD>';
        str+='                  <TD width="1%"></TD>';
        str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute("stuName")+'</FONT><BR>&nbsp;';
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute("Level")+'</FONT><BR><BR>&nbsp;&nbsp;'

        //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
        //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
        str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + this.getAttribute('AcademicYearName')+'</SPAN>';

        str+='                  </TD>';
        str+='                  <TD></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="background-color:#E5097F" height=2 colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR style="height:35px;">';
        str+='                  <TD>';
        str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد نائب رئيس الجامعة</FONT><BR>&nbsp;<IMG src="'+this.getAttribute('deanSign')+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';


        str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+this.getAttribute("StuCode")+'</FONT><BR><FONT style="FONT: 8px times">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: <B>'+this.getAttribute("stu_code_id");
        str+='              </TR>';
        str+='          </TBODY>';
        str+='      </TABLE>';

        shadow.innerHTML = str;
  }
}

class AlexCard extends HTMLElement{
    constructor() {
        // Always call super first in constructor
        super();

        // write element functionality in here

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});

        var stuProg = this.getAttribute('stuProg');

        var str='      <TABLE border=0 cellSpacing=0 cellPadding=0 style="width:310px;" align=center nowrap  dir="rtl" class="cardtbl">';
        str+='          <TBODY>';
        str+='              <TR>';
        str+='                  <TD style="height:3px;" colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="height:40px;" vAlign=bottom colSpan=5 align=center><FONT style="FONT-SIZE: 18px;‎" class="Card_collage_Name" color="#009afe" ><B>'+this.getAttribute("ScopeName")+'</B></FONT></TD>'; //+' - '+progtitle+'
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD height="2px" colSpan=5 style="background-color:#009afe"></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD width="1%">';
        str+='                  <TD vAlign=top width="26%" align=center>';
        if (this.getAttribute('StuCode')) {
            str += ' <IMG style="width:76px;" src="/getJCI?param0=stuImages.Images&param1=download&param2=' + this.getAttribute('StuCode') + '" > ';
        }

        str+='                  </TD>';
        str+='                  <TD width="1%"></TD>';
        str+='                  <TD style="HEIGHT: 23mm;text-align: right;padding-top:5px" vAlign=top>&nbsp;&nbsp;<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute("stuName")+'</FONT><BR>&nbsp;';
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+(stuProg.indexOf("(") == -1 ? stuProg : (stuProg.substring(0, stuProg.indexOf("(") - 1) + "<br/>&nbsp;&nbsp" + stuProg.substring(stuProg.indexOf("("))))+'</FONT><BR>&nbsp;'
        str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#000>'+this.getAttribute('stu_code_id')+'</FONT><BR><BR>&nbsp;&nbsp;'

        //str+='				<FONT style="FONT: bold 11pt arabic transparent" color=#E5097F>'+getName(data[i]["name"])+'</FONT>'
        //str+='                      <SPAN style="float:left;color: #E5097F;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>سارى حتى '+ data[i]['ExpYear'] +'</SPAN>';
        str+='                      <SPAN style="float:left;color: #009afe;font-weight:bold;padding: 2px 0 0 30px;FONT-size: 16px" dir=ltr>' + this.getAttribute('AcademicYearName')+'</SPAN>';

        str+='                  </TD>';
        str+='                  <TD></TD>';
        str+='              </TR>';
        str+='              <TR>';
        str+='                  <TD style="background-color:#009afe" height=2 colSpan=5></TD>';
        str+='              </TR>';
        str+='              <TR style="height:35px;">';
        str+='                  <TD>';
        str+='                  <TD dir=ltr vAlign=middle align=center><FONT style="FONT-SIZE: 9px" color=black><B>يعتمد عميد الكلية</FONT><BR>&nbsp;<IMG src="'+this.getAttribute('deanSign')+'" height=12></B><BR><FONT style="FONT-SIZE: 9px">'+GetDate()+'</FONT></TD>';


        str+='                  <TD dir=ltr colSpan=2 align=left >&nbsp;&nbsp;&nbsp;&nbsp;<FONT  style="FONT-SIZE:18px" color=black class="barcode">'+this.getAttribute("StuCode")+'</FONT><BR>';
        str+='                      <FONT style="FONT: 12px times"><B>'+this.getAttribute("Level")+'</B></FONT>';
        str+='              </TR>';
        str+='          </TBODY>';
        str+='      </TABLE>';

        shadow.innerHTML = str;
  }
}

// Define the new element
// use lower case, upper-case not working
customElements.define('default-card', DefaultCard);
customElements.define('minia-card', MiniaCard);
customElements.define('mans-eng-card', MansEngCard);
customElements.define('alex-card', AlexCard);


generateC39 = function(){
    $("[name='custom-card']").each(function(i,card){
        card.shadowRoot.querySelectorAll(".barcode").forEach(function(elem){
            $(elem).barcode({code:'code39'});
        })
    });
};
*/