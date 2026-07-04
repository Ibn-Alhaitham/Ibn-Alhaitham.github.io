

    try{
        jAlert
    }catch(err) {
        jAlert = alert;
    }
   var userType = '1',Lang ='E';
    var studentsUserNames ='';
    var studentsPasswords ='';
        jQuery(document).ready(function () {
            getUniversityData();
            check_bug=false

            // // binds form submission and fields to the validation engine
            // if ($.browser.msie && $.browser.version == 8) {
            //     jQuery("#employeesLoginFrm").validationEngine();
            // } else {
            //     jQuery("#employeesLoginFrm").validationEngine({isOverflown: true, 'overflownDIV': 'body'});
            // }
            // $("input:radio").uniform();
            //if($.browser.mozilla){
            //$("#employeesLoginFrm").draggable({containment: "#form", scroll: false});
            //}else{
            //	$( "#employeesLoginFrm" ).draggable({ containment: "body" ,scroll: false });
            //}

            $("input[name=usertype]:radio").click(function () {

                userType = $(this).val();
                $("#ForgetPassword").show();
                 $("#name").attr("placeholder",'Username');
                 $("#password").attr("placeholder",'Password');
                if($(this).val() == "2" ){
                    if(studentsUserNames != ''){
                        $("#name").attr("placeholder",studentsUserNames);
                    }
                    if(studentsPasswords != ''){
                        $("#password").attr("placeholder",studentsPasswords);
                    }
                }

            });



        });
    $.getScript("/static/js/index.js?num=" + new Date().getTime(), function () {
        $.getScript("/static/js/general.js?num=" + new Date().getTime(), function () {
            //$.getScript("/static/js/words.js?num=" + new Date().getTime(), function () {
                $.getScript("/static/js/sdmenu.js?num=" + new Date().getTime(), function () {
                     $.getScript("/static/js/crypto-js.min.js?num=" + new Date().getTime(), function () {
                        $(document).ready(function () {
                           // LoadAppVariables();
                            AdjustLoginForm();

                        });
                });
            });
        });
    });

    function ForgetPassword() {
        var str = "";
        var msgMailValidator = getName('ليست صيغة بريد الكتروني صحيحة |not a valid e-mail ', Lang);
        var msgIDValidator = getName('رقم قومى خاطئ|not a valid ID ', Lang);

        str += "<div id='DivForgetPassData' style='padding: 5px 40px'>";
        str += "	<form id='FormForgetPassword' name='FormForgetPassword' >";
        str += "		<table border='0' style='border-collapse:collapse;width:100%;height:100%'>";
        str += "			<tbody>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td  style='width:25%'>";
        // str += "						" + getName("الرقم القومى|National ID", "E");
        // str += "					</td>"
        str += "					<td style='vertical-align:bottom;'>";
        str += "						<input id='NationalID' name='NationalID' class='InputCorner' style='width:200px;'  type='text' placeholder='"+ getName("الرقم القومى|National ID", "E")+"' />";
        str += "					</td>";
        str += "					<td width=25% align=left'>";
        str += "						<label for='NationalID' generated='true' class='error' style='color:red;'></label>";
        str += "					</td>";
        str += "				</tr>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td width='25%'>";
        // str += "						" + getName("البريد الإلكترونى| Email", "E");
        // str += "					</td>";
        str += "					<td width=50% style=''>"
        str += "						<input id=studenteMailText name=studenteMailText class='InputCorner' style='width:200px;'  type=text style='width:90%;' placeholder='"+ getName("البريد الإلكترونى| Email", "E")+"' />";
        str += "					</td>";
        str += "					<td width=25% align=left>"
        str += "						<label for='studenteMailText' generated='true' class='error' style='color:red;'></label>"
        str += "					</td>";
        str += "				</tr>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td width='25%'>";
        // str += "						" + getName("تأكيد الكلمة| Word Verification", "E");
        // str += "					</td>";
        str += "					<td style='width:50%'>";
        str += "						<div id='ReCaptchaDiv' style='padding-top: .5em;'></div>";
        str += "					</td>";
        str += "					<td width=25% align=left>"



        str += "						<label for='recaptcha_response_field' generated='true' class='error' style='color:red;'></label>"
        str += "					</td>";
        str += "				</tr>";
        str += "			</tbody>";
        str += "		</table>";
        str += "	</form>";
        str += "</div>";


        if ($("#DivForgetPassData").length == 0) {
            $("#employeesLoginFrm").append(str);
            CreateRecaptcha();
            $("#FormForgetPassword").validate({
                rules: {
                    NationalID: {
                        required: true,
                        digits: true
                    },
                    studenteMailText: {
                        required: true,
                        email: true
                    },
                    recaptcha_response_field: {
                        required: true
                    }
                },
                messages: {
                    NationalID: {
                        required: '&nbsp;&nbsp;*',
                        digits: ((Lang == "A") ? "مسموح بارقام فقط  " : "Only Numbers are allowed")
                    },
                    studenteMailText: {
                        required: '&nbsp;&nbsp;*',
                        email: msgMailValidator
                    },
                    recaptcha_response_field: {
                        required: '&nbsp;&nbsp;*'
                    }
                }
            });
        }

        $('#DivForgetPassData').dialog({
            modal: true,
            autoOpen: true,
            title: "Send an email with username and password",
            closeOnEscape: true,
            zIndex: 3999,
            // width: "600",
            height: "auto",
            resizable: true,
            show: 'fade',
            hide: 'fade',
            buttons: [{
                text: "Send",
                click: function () {
                    var NationalID = $("#NationalID").val();
                    var eMail = $("#studenteMailText").val();

                    if ($("#FormForgetPassword").valid()) {

                            condValid=true;
                            if (NationalID.length==14){
                                condValid=CheckNationalID(NationalID);
                            }
                        if (condValid) {

                            var queryForm = {}
                            queryForm["recaptcha_response_field"] = $("#recaptcha_response_field").val();
                            queryForm["recaptcha_key_field"] = $("input[name=recaptcha_key_field]").val();
                            var codeFlag = VerifyingAnswer(queryForm);

                            if (codeFlag == "true") {

                                var Dict = {}
                                Dict["NationalID"] = NationalID;
                                Dict["studenteMailText"] = eMail;

                                $.ajax({
                                    url: "/stuJCI",
                                    data: {
                                        param0: "Mail.Mail",
                                        param1: "SendMail",
                                        param2: NationalID,
                                        param3: eMail,
                                        param4: (userType ?userType:'1')
                                    },
                                    type: "post",
                                    cache: false,
                                    async: false,
                                    success: function (d) {
                                        var data = jQuery.parseJSON(d);
                                        if (data){
                                            var MSG, msg = '';
                                            var msgDict = {
                                                "Mail": getName("البريد الإلكترونى غير مسجل | Email address is not registerd on the system"),
                                                "NoData": getName("بيانات الزائر غير مسجلة | Guest data Not found")
                                            };

                                            if ("ErrorMsg" in data) {
                                                msg = msgDict[data.ErrorMsg];
                                            }

                                            if (data.MSG == 'success') {
                                                MSG = (msg ? msg : getName("Message Sent Successfuly"));
                                            }
                                            else {
                                                MSG = (msg ? msg : getName("Message Not Sent"));
                                            }
                                            $("#DivForgetPassData").dialog("close");
                                            $("#DivForgetPassData").dialog("destroy").remove();
                                            jAlert(MSG);
                                        }
                                    }
                                });
                            }
                            else {
                                var msgValidator = "Code error";
                                $('label[for="recaptcha_response_field"]').html(msgValidator);
                                $('label[for="recaptcha_response_field"]').show();
                            }
                        }
                        else {
                            $('label[for="NationalID"]').html(msgIDValidator);
                            $('label[for="NationalID"]').show();
                        }
                    }

                }
            }, {
                text: "Cancel",
                click: function () {
                    $("#DivForgetPassData").dialog("close");
                    $("#DivForgetPassData").dialog("destroy").remove();
                }
            }],
            close: function (event, ui) {
                $("#DivForgetPassData").dialog("close");
                $("#DivForgetPassData").remove();
            }
        });
        $("#DivForgetPassData").dialog("open");

        if($("input[name=usertype]:radio:checked").val()=="2"){
         $("#NationalID").attr("placeholder",getName("الرقم القومى/الكود|National ID/Code", "E"));
        }
         else if($("input[name=usertype]:radio:checked").val()=="3"){
         $("#NationalID").attr("placeholder",getName("الرقم القومى|National ID", "E"));
        }
    }
  function ForgetPassword2() {
        var str = "";
        var msgMailValidator = getName('ليست صيغة بريد الكتروني صحيحة |not a valid e-mail ', Lang);
        var msgIDValidator = getName('رقم قومى خاطئ|not a valid ID ', Lang);

        str += "<div id='DivForgetPassData' style='padding: 5px 40px'>";
        str += "	<form id='FormForgetPassword' name='FormForgetPassword' >";
        str += "		<table border='0' style='border-collapse:collapse;width:100%;height:100%'>";
        str += "			<tbody>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td  style='width:25%'>";
        // str += "						" + getName("الرقم القومى|National ID", "E");
        // str += "					</td>"
        str += "					<td style='vertical-align:bottom;'>";
        str += "						<input id='NationalID' name='NationalID' class='InputCorner' style='width:200px;'  type='text' placeholder='"+ getName("الرقم القومى|National ID", "E")+"' />";
        str += "					</td>";
        str += "					<td width=25% align=left'>";
        str += "						<label for='NationalID' generated='true' class='error' style='color:red;'></label>";
        str += "					</td>";
        str += "				</tr>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td width='25%'>";
        // str += "						" + getName("البريد الإلكترونى| Email", "E");
        // str += "					</td>";
        str += "					<td width=50% style=''>"
        str += "						<input id=studenteMailText name=studenteMailText class='InputCorner' style='width:200px;'  type=text style='width:90%;' placeholder='"+ getName("البريد الإلكترونى| Email", "E")+"' />";
        str += "					</td>";
        str += "					<td width=25% align=left>"
        str += "						<label for='studenteMailText' generated='true' class='error' style='color:red;'></label>"
        str += "					</td>";
        str += "				</tr>";
        str += "				<tr style='line-height:2em;color:#045c97;'>";
        // str += "					<td width='25%'>";
        // str += "						" + getName("تأكيد الكلمة| Word Verification", "E");
        // str += "					</td>";
        str += "					<td style='width:50%'>";
        str += "						<div id='ReCaptchaDiv' style='padding-top: .5em;'></div>";
        str += "					</td>";
        str += "					<td width=25% align=left>"



        str += "						<label for='recaptcha_response_field' generated='true' class='error' style='color:red;'></label>"
        str += "					</td>";
        str += "				</tr>";
        str += "			</tbody>";
        str += "		</table>";
        str += "	</form>";
        str += "</div>";


        if ($("#DivForgetPassData").length == 0) {
            $("#employeesLoginFrm").append(str);
            CreateRecaptcha();
            $("#FormForgetPassword").validate({
                rules: {
                    NationalID: {
                        required: true,
                        digits: true
                    },
                    studenteMailText: {
                        required: true,
                        email: true
                    },
                    recaptcha_response_field: {
                        required: true
                    }
                },
                messages: {
                    NationalID: {
                        required: '&nbsp;&nbsp;*',
                        digits: ((Lang == "A") ? "مسموح بارقام فقط  " : "Only Numbers are allowed")
                    },
                    studenteMailText: {
                        required: '&nbsp;&nbsp;*',
                        email: msgMailValidator
                    },
                    recaptcha_response_field: {
                        required: '&nbsp;&nbsp;*'
                    }
                }
            });
        }

        $('#DivForgetPassData').dialog({
            modal: true,
            autoOpen: true,
            title: "Send an email with username and password",
            closeOnEscape: true,
            zIndex: 3999,
            // width: "600",
            height: "auto",
            resizable: true,
            show: 'fade',
            hide: 'fade',
            buttons: [{
                text: "Send",
                click: function () {
                    var NationalID = $("#NationalID").val();
                    var eMail = $("#studenteMailText").val();

                    if ($("#FormForgetPassword").valid()) {

                            condValid=true;
                            if (NationalID.length==14){
                                condValid=CheckNationalID(NationalID);
                            }
                        if (condValid) {

                            var queryForm = {}
                            queryForm["recaptcha_response_field"] = $("#recaptcha_response_field").val();
                            queryForm["recaptcha_key_field"] = $("input[name=recaptcha_key_field]").val();
                            var codeFlag = VerifyingAnswer(queryForm);

                            if (codeFlag == "true") {

                                var Dict = {}
                                Dict["NationalID"] = NationalID;
                                Dict["studenteMailText"] = eMail;

                                $.ajax({
                                    url: "/stuJCI",
                                    data: {
                                        param0: "Mail.Mail",
                                        param1: "SendMailOTP",
                                        param2: NationalID,
                                        param3: eMail,
                                        param4: (userType ?userType:'1')
                                    },
                                    type: "post",
                                    cache: false,
                                    async: false,
                                    success: function (d) {
                                        var data = jQuery.parseJSON(d);
                                        if (data){
                                            var MSG, msg = '';
                                            var msgDict = {
                                                "Mail": getName("البريد الإلكترونى غير مسجل | Email address is not registerd on the system"),
                                                "NoData": getName("بيانات الزائر غير مسجلة | Guest data Not found")
                                            };

                                            if ("ErrorMsg" in data) {
                                                msg = msgDict[data.ErrorMsg];
                                            }

                                            if (data.MSG == 'success') {
                                                MSG = (msg ? msg : getName("Message Sent Successfuly"));
                                            }
                                            else {
                                                MSG = (msg ? msg : getName("Message Not Sent"));
                                            }
                                            $("#DivForgetPassData").dialog("close");
                                            $("#DivForgetPassData").dialog("destroy").remove();
                                            jAlert(MSG);
                                        }
                                    }
                                });
                            }
                            else {
                                var msgValidator = "Code error";
                                $('label[for="recaptcha_response_field"]').html(msgValidator);
                                $('label[for="recaptcha_response_field"]').show();
                            }
                        }
                        else {
                            $('label[for="NationalID"]').html(msgIDValidator);
                            $('label[for="NationalID"]').show();
                        }
                    }

                }
            }, {
                text: "Cancel",
                click: function () {
                    $("#DivForgetPassData").dialog("close");
                    $("#DivForgetPassData").dialog("destroy").remove();
                }
            }],
            close: function (event, ui) {
                $("#DivForgetPassData").dialog("close");
                $("#DivForgetPassData").remove();
            }
        });
        $("#DivForgetPassData").dialog("open");

        if($("input[name=usertype]:radio:checked").val()=="2"){
         $("#NationalID").attr("placeholder",getName("الرقم القومى/الكود|National ID/Code", "E"));
        }
         else if($("input[name=usertype]:radio:checked").val()=="3"){
         $("#NationalID").attr("placeholder",getName("الرقم القومى|National ID", "E"));
        }
    }
    function AdjustLoginForm() {
        $("#name").focus();
        var h = ($(window).height() - 228) / 2;
        var w = ($(window).width() - 375) / 2;
        $('#employeesLoginFrm').css({'top': h, 'left': w});
        $('#form').css({width: ($(window).width()), height: $(window).height()});
        $('#form').show();
        $('#employeesLoginFrm').submit(function (e) {
            e.preventDefault();
        });
    }
    $(document).ready(function () {


              $("#security_id").click(function () {

            $("#divContents").html('<div id="RDialogDiv" ></div>');
            $("#RDialogDiv").load('security.html');
            $('#RDialogDiv').dialog({
                modal: true,
                autoOpen: true,
                title: getName('سياسة الخصوصية وتأمين البيانات'),
                closeOnEscape: true,
                zIndex: 3999,
                width: 750,
                height: 350,
                resizable: true,
                show: 'fade',
                hide: 'fade',
                open: function (event, ui) {
                    $(this).parent().css('top', 0);
                },
                buttons: {
                    'استمرار': function () {
                        $(this).dialog("close");
                        $("#RDialogDiv").remove();


                    }
                }
            });
        })
    });
    function getUniversityData() {
        $.ajax({
            url: "/general",
            type: "post",
            cache: false,
            async: true,
            data: {
                index: "current_university"
            },
            beforeSend: function () {
            }, success: function (d) {
                var data = jQuery.parseJSON(d);
                var university = data['university'], backgroundImageUrl = 'url(' + data['backgroundImageUrl'] + ')';
                 studentsUserNames = data['studentsUserNames'];
                 studentsPasswords = data['studentsPasswords'];
                if(studentsUserNames != ''){
                    $("#studentsHelp").html("username : "+studentsUserNames+"<br>password : "+studentsPasswords);
                }
                if(university=="Mansoura National University"){
                     $(".university-name").html("<div align='center'><img src='/static/images/ahliaLogo.PNG' style=\"width:100px;height:100px\"/></div>");
                }
                else{
                    $(".university-name").html(university);
                }
                // $(".university-name").html(university);
                $("#title").text(university);
                const connectionType  = getConnectionType();
                if (['3g' ,'4g'].indexOf(connectionType) > -1){
                  $('body').css('background-image', backgroundImageUrl);
                }
            }
        });
    }

    function getConnectionType() {
        'use strict';
        let connectionType = 'not supported';
        if ('connection' in navigator) {
            connectionType = navigator.connection.effectiveType;
        }
        return connectionType;
    }
