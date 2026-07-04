
function getMenuIcon(itemId) {
    var icons = {
        // الأساسية
        'prsData': '👤',
        'timetable': '📋',
        'studytable': '📅',
        'RegistrationFees': '💰',
        'BooksList': '📖',
        'examtable': '📝',
        'Questionnaire': '📋',
        'crsGrd': '📊',
        'progDsr': '🎯',
        'stdResult': '📄',
        'electronic_payment': '💳',
        'StudentCadr': '🪪',
        'WeeklyStudentAttendance': '📆',
        'AcademyServey': '📊',
        'QuestionnaireNew': '📝',
        'StudentExpectations': '📈',
        'Sanctions': '⚠️',
        'registerReport': '📋',
        'AcdWarnData': '🔴',
        'StudentAttendance': '✅',
        'unregisterWarning': '🚫',
        'militarystatus': '🎖️',
        'updateEducationalPlatform': '🖥️',
        'ExaminationForm': '🏥',
        'studentprogress': '📈',
        'StudentUpdateData': '✏️',
        'moodleLogin': '🌐',
        'mailTD': '📧',
        'feesPaper': '🧾',
        'studentDocuments': '📁',
        'MaterialGrievances': '⚖️',
        'SummerTraining': '💼',
        'gpa_calculator': '🧮',

        // البريد
        'createMail': '✉️',
        'newMessages': '➕',
        'indoxMessages': '📥',
        'outboxMessages': '📤',

        // إضافات
        'coursesDsr': '📚',
        'StudentAttendance_old': '📖',
        'CourseWithdrawal': '🚶',
        'uploadStudentPersonalDoc': '📤',
        'studentDocs': '📄',
        'examSeats': '🪑'
    };

    return icons[itemId] || '•';  // أيقونة افتراضية لو مش موجود
}
function render_basic_student(lang, data) {
    var personalData = (data.personal && data.personal[0]) ? data.personal[0] : {};
    var contactData = (data.contact && data.contact[0]) ? data.contact[0] : {};
    var famData = (data.fam && data.fam[0]) ? data.fam[0] : {};
    var preqData = (data.preq && data.preq[0]) ? data.preq[0] : {};
    var sanctionData = data.SanctionData || [];

    var dir = (lang == "A") ? "rtl" : "ltr";

    var html = `<div class="student-card-container" dir="${dir}">`;

    // ========== 1. بطاقة البيانات الشخصية ==========
    html += `
       <form id="FormStudentPersonalData"> <div class="student-card card-blue">
            <div class="card-header">📋 ${getName("البيانات الشخصية|Personal Data", lang)}</div>
            <div class="card-body">
                <table class="info-table">
                    <tr class="divider">
                        <td class="label">${getName("الاسم بالعربية|Arabic Name", lang)}:</td>
                        <td class="value">${(personalData.Name && personalData.Name.split('|')[0]) ? personalData.Name.split('|')[0] : ''}</td>
                        <td class="label">${getName("الاسم بالإنجليزية|English Name", lang)}:</td>
                        <td class="value">${(personalData.Name && personalData.Name.split('|')[1]) ? personalData.Name.split('|')[1] : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("الرقم الجامعى|University ID", lang)}:</td>
                        <td class="value">${personalData.studentCode || ''}</td>
                        <td class="label">${getName("النوع|Gender", lang)}:</td>
                        <td class="value">${personalData.StuGender ? getName(personalData.StuGender, lang) : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("الجنسية|Nationality", lang)}:</td>
                        <td class="value">${personalData.nationalityName ? getName(personalData.nationalityName, lang) : ''}</td>
                        <td class="label">${getName("الديانة|Religion", lang)}:</td>
                        <td class="value">${personalData.relegion ? getName(personalData.relegion, lang) : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("تاريخ الميلاد|Date of Birth", lang)}:</td>
                        <td class="value">${personalData.Birthdate || ''}</td>
                        <td class="label">${getName("محل الميلاد|Place of Birth", lang)}:</td>
                        <td class="value">${personalData.BirthPlace ? getName(personalData.BirthPlace, lang) : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("الرقم القومي / جواز السفر|National Id/passport Number", lang)}:</td>
                        <td class="value">${personalData.StuIdNum || ''}</td>
                        <td class="label">${getName("تاريخ الاصدار|Release Date", lang)}:</td>
                        <td class="value">${personalData.idDate || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("محل الاصدار |Release Place", lang)}:</td>
                        <td class="value">${personalData.StuPlaceName ? getName(personalData.StuPlaceName, lang) : ''}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    // ========== 2. بطاقة بيانات العائلة ==========
    html += `
        <div class="student-card card-green">
            <div class="card-header">👨‍👩‍👧‍👦  &nbsp; ${getName("بيانات العائلة|Family Data", lang)}</div>
            <div class="card-body">
                <table class="info-table">
                    <tr class="divider">
                        <td class="label">${getName("اسم ولى الأمر|Guardian Name", lang)}:</td>
                        <td class="value">${famData.name || ''}</td>
                        <td class="label">${getName("الوظيفة|Job", lang)}:</td>
                        <td class="value">${famData.jobTitle || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("المدينة|City", lang)}:</td>
                        <td class="value">${famData.addressRegionName ? getName(famData.addressRegionName, lang) : ''}</td>
                        <td class="label">${getName("العنوان|Address", lang)}:</td>
                        <td class="value">${famData.address || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("تليفون المنزل|Home Tel", lang)}:</td>
                        <td class="value">${famData.homeTel || ''}</td>
                        <td class="label">${getName("الموبايل|Mobile", lang)}:</td>
                        <td class="value">${famData.mobile || ''}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    // ========== 3. بطاقة بيانات الاتصال ==========
    html += `
        <div class="student-card card-gray">
            <div class="card-header">📞 ${getName("بيانات الاتصال|Contact Data", lang)}</div>
            <div class="card-body">
                <table class="info-table">
                    <tr class="divider">
                        <td class="label-wide">${getName("العنوان|Address", lang)}:</td>
                        <td class="value-wide" colspan="3">${contactData.Address || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("المدينة|City", lang)}:</td>
                        <td class="value">${contactData.AddressRegionName ? getName(contactData.AddressRegionName, lang) : ''}</td>
                        <td class="label">${getName("تليفون المنزل|Home Tel", lang)}:</td>
                        <td class="value">${contactData.HomeTel || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("الموبايل|Mobile", lang)}:</td>
                        <td class="value">${contactData.MobileTel || ''}</td>
                        <td class="label">${getName("الفاكس|Fax", lang)}:</td>
                        <td class="value">${contactData.Fax || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("البريد الإلكتروني|Email", lang)}:</td>
                        <td class="value">${contactData.Email || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("صندوق البريد|Mail Box", lang)}:</td>
                        <td class="value">${contactData.MailBox || ''}</td>
                        <td class="label">${getName("بريد النظام|System Mail", lang)}:</td>
                        <td class="value">${contactData.SystemEmail || ''}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    // ========== 4. بطاقة بيانات المؤهل السابق ==========
    html += `
        <div class="student-card card-orange">
            <div class="card-header">🎓 ${getName("بيانات المؤهل السابق|Previous Qualification", lang)}</div>
            <div class="card-body">
                <table class="info-table">
                    <tr class="divider">
                        <td class="label">${getName("المؤهل|Qualification", lang)}:</td>
                        <td class="value">${preqData.PreQualName ? getName(preqData.PreQualName, lang) : ''}</td>
                        <td class="label">${getName("سنة التخرج|Graduation Year", lang)}:</td>
                        <td class="value">${preqData.PreQualYearName ? getName(preqData.PreQualYearName, lang) : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("دور المؤهل|Qualification Turn", lang)}:</td>
                        <td class="value">${preqData.PreQualturnName ? getName(preqData.PreQualturnName, lang) : ''}</td>
                        <td class="label">${getName("المدرسة|School", lang)}:</td>
                        <td class="value">${preqData.School || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("مجموع الدرجات|Total Score", lang)}:</td>
                        <td class="value">${preqData.PreQualDegree || ''}</td>
                        <td class="label">${getName("النسبة المئوية|Percentage", lang)}:</td>
                        <td class="value">${preqData.Percentage || ''} %</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">SAT I:</td>
                        <td class="value">${preqData.Sat ? preqData.Sat.split('|')[0] : ''}</td>
                        <td class="label">SAT II:</td>
                        <td class="value">${preqData.Sat ? preqData.Sat.split('|')[1] : ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label">${getName("رقم موافقة التنسيق |Coordination no.", lang)}:</td>
                        <td class="value">${preqData.CoordNo || ''}</td>
                        <td class="label">${getName("تاريخ موافقة التنسيق|Coordination Date", lang)}:</td>
                        <td class="value">${preqData.CoordDate || ''}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    // ========== 5. بطاقة في حالة التحويل ==========
    var hasTransferData = (preqData.Institute && preqData.Institute != '') || (preqData.InstAttendDateName);
    if (hasTransferData) {
        html += `
        <div class="student-card card-purple">
            <div class="card-header">🔄 ${getName("في حالة التحويل الي كلية او معهد اخر|Transfer Student Data", lang)}</div>
            <div class="card-body">
                <table class="info-table">
                    <tr class="divider">
                        <td class="label-wide">${getName("الجهة المحول منها|Transfer From", lang)}:</td>
                        <td class="value-wide" colspan="3">${preqData.Institute || ''}</td>
                    </tr>
                    <tr class="divider">
                        <td class="label-wide">${getName("سنة الالتحاق|Enrollment Year", lang)}:</td>
                        <td class="value-wide" colspan="3">${preqData.InstAttendDateName || ''}</td>
                    </tr>
                </table>
            </div>
        </div>
        `;
    }

    // ========== 6. بطاقة الجزاءات (إن وجدت) ==========
    if (sanctionData && sanctionData.length > 0) {
        var sanctionsHtml = '';
        for (var i = 0; i < sanctionData.length; i++) {
            var row = sanctionData[i];
            sanctionsHtml += `
                <tr>
                    <td>${row.sanctionName ? getName(row.sanctionName, lang) : ''}</td>
                    <td>${row.sanctionYear ? getName(row.sanctionYear, lang) : ''}</td>
                    <td>${row.sanctionSemester ? getName(row.sanctionSemester, lang) : ''}</td>
                    <td>${row.sanctionNote || ''}</td>
                </tr>
            `;
        }
        html += `
        <div class="student-card card-red">
            <div class="card-header">⚠️ ${getName("الجزاءات|Sanctions", lang)}</div>
            <div class="card-body">
                <table class="sanctions-table">
                    <thead>
                        <tr>
                            <th>${getName("الجزاء|Sanction", lang)}</th>
                            <th>${getName("العام الأكاديمي|Academic Year", lang)}</th>
                            <th>${getName("الفصل الدراسي|Semester", lang)}</th>
                            <th>${getName("ملاحظات|Notes", lang)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sanctionsHtml}
                    </tbody>
                </table>
            </div>
        </div>
        `;
    }

    html += `</div></form>`;

    return html;
}
function render_timetable_html(lang, timetableData) {

    if (!timetableData || timetableData == '{}') {
        return `<div style="text-align:center; padding:20px; color:red;">
                    ${getName("لا يوجد جدول دراسي|No timetable available", lang)}
                </div>`;
    }

    var dir = (lang == "A") ? "rtl" : "ltr";
    var align = (lang == "A") ? "right" : "left";

    var Data = timetableData;
    var CelltimeArray = Data["CelltimeArray"] || [];
    var daysTable = Data["daysOrdered"] || [];
    var daysData = Data["days"] || [];
    var daysEventdata = Data["daysEventdata"] || {};

    // CSS مخصص للجدول
    var customStyle = `
        <style>
            .timetable-shape1-container {
                max-width: 100%;
                overflow-x: auto;
                margin-bottom: 20px;
            }
            .timetable-shape1-table {
                width: 100%;
                border-collapse: collapse;
                background: white;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .timetable-shape1-table th,
            .timetable-shape1-table td {
                border: 1px solid #C0B8B8;
                padding: 10px 8px;
                vertical-align: middle;
            }
            .timetable-shape1-table thead th {
                background-color: #deedf7;
                font-weight: bold;
                text-align: center;
            }
            .timetable-shape1-table tbody th {
                background-color: #deedf7;
                color: #990000;
                font-weight: bold;
            }
            .timetable-staff-info {
                background: #f9f9f9;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                border-right: 4px solid #2c7ab1;
            }
            .timetable-student-info {
               
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .timetable-student-info span {
                color: #2c7ab1;
                font-weight: bold;
            }
            /* تنسيق التوقيعات الجديد - بدون مربع */
            .signatures-container {
                margin-top: 30px;
                padding: 15px 0;
                border-top: 2px dashed #ccc;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 20px;
            }
            .signature-item {
                flex: 1;
                text-align: center;
                min-width: 150px;
            }
            .signature-label {
                font-size: 12px;
                font-weight: bold;
                color: #555;
                margin-bottom: 30px;
                display: block;
            }
            .signature-line {
                border-bottom: 1px solid #999;
                margin-top: 5px;
                padding-top: 5px;
                width: 80%;
                margin-left: auto;
                margin-right: auto;
            }
        </style>
    `;

    var html = customStyle;
    html += `<div dir="${dir}">`;

    // ========== معلومات المرشد الأكاديمي ==========
    if ((Data["StuAdvName"] && Data["StuAdvName"] != "") || (Data["StuAdvMail"] && Data["StuAdvMail"] != "")) {
        html += `<div class="timetable-staff-info">`;
        if (Data["StuAdvName"] && Data["StuAdvName"] != "") {
            html += `<div style="margin-bottom:5px;">
                        <strong>${getName("اسم المرشد|Advisor Name", lang)} :</strong> 
                        ${Data["StuAdvNick"] ? getName(Data["StuAdvNick"], lang) + " / " : ""}${getName(Data["StuAdvName"], lang)}
                    </div>`;
        }
        if (Data["StuAdvMail"] && Data["StuAdvMail"] != "") {
            html += `<div><strong>${getName("البريد الالكترونى للمرشد|Advisor Mail", lang)} :</strong> ${Data["StuAdvMail"]}</div>`;
        }
        html += `</div>`;
    }

    // ========== معلومات الطالب ==========
    html += `
        <div class="timetable-student-info">
            <table style="width:100%;">
                <tr>
                    <td style="text-align:${align}; padding:5px;">
                        <span>${getName("اسم الطالب|Student Name", lang)} :</span> ${getName(Data["studentName"], lang)}
                    </td>
                    <td style="text-align:${align === 'right' ? 'left' : 'right'}; padding:5px;">
                        <span>${getName("كود الطالب|Student Code", lang)} :</span> ${Data["student_code"] || ''}
                    </td>
                </tr>
                <tr>
                    <td style="text-align:${align}; padding:5px;">
                        <span>${getName("برنامج الطالب|Student Programme", lang)} :</span> ${getName(Data["studentProg"], lang)}
                    </td>
                    <td style="text-align:${align === 'right' ? 'left' : 'right'}; padding-left:35px;padding-top: 5px;">
                        <span>${getName("مستوي الطالب|Student Level", lang)} :</span> ${getName(Data["studentLevel"], lang)}
                    </td>
                </tr>
            </table>
        </div>
    `;

    // ========== الجدول الرئيسي ==========
    if (CelltimeArray.length > 0 && daysTable.length > 0) {
        html += `<div class="timetable-shape1-container">`;
        html += `<table class="timetable-shape1-table" style="direction:${dir}; text-align:${align};">`;

        // صف الأوقات
        html += `<thead>`;
        html += `<tr>`;
        html += `<th style="width:100px;">${getName('اليوم|Day', lang)}</th>`;
        for (var i = 0; i < CelltimeArray.length; i++) {
            html += `<th style="writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;">
                        <b>${CelltimeArray[i]}</b>
                    </th>`;
        }
        html += `</tr>`;
        html += `</thead>`;

        // صفوف الأيام
        html += `<tbody>`;
        for (var dayobj = 0; dayobj < daysTable.length; dayobj++) {
            var dayEvent = daysEventdata[daysTable[dayobj]] || [];
            html += `<tr style="height:50pt;">`;
            html += `<th>${getNameByDic(String(daysData[daysTable[dayobj]]), lang)}</th>`;

            var colspan = 0;
            for (var i = 0; i < CelltimeArray.length; i++) {
                if (colspan == 0) {
                    if (dayEvent[i] && dayEvent[i][0] && dayEvent[i][0].length > 0) {
                        var dayEventFirst = dayEvent[i][0];
                        var dayEventSecond = dayEvent[i][1];
                        var TimeData = "";
                        var bgColor = "#FFFFFF";

                        for (var d = 0; d < dayEventFirst.length; d++) {
                            var ChkType = (dayEventSecond[d] ? dayEventSecond[d].split('|')[2] || '' : '');
                            bgColor = getColorByChkType(ChkType);
                            colspan = parseInt(dayEventSecond[d] ? dayEventSecond[d].split('|')[0] : 1);
                            var ClsOrLab = (dayEventSecond[d] ? (dayEventSecond[d].split('|')[3] || '').split('-')[1] || '' : '');

                            var txtName = "";
                            if (ClsOrLab != '') {
                                if (ChkType == "35.13.2.") {
                                    txtName = '(' + getName(' فصل' + ClsOrLab + '| Group' + ClsOrLab, lang) + ') ';
                                } else {
                                    txtName = '(' + getName(' معمل' + ClsOrLab + '|Lab ' + ClsOrLab, lang) + ') ';
                                }
                            }

                            TimeData+=`<span style="display:inline-block;">${txtName}${dayEventFirst[d]}</span><br>`;
                        }

                        html += `<td colspan="${colspan}" style="background-color:${bgColor}; text-align:center;">
                                    ${TimeData}
                                </td>`;
                    } else {
                        colspan = 1;
                        html += `<td style="background-color:#FFFFFF;">&nbsp;</td>`;
                    }
                }
                colspan--;
            }
            html += `</tr>`;
        }
        html += `</tbody>`;
        html += `</table>`;
        html += `</div>`;
    } else {
        html += `<div style="text-align:center; padding:20px;">${getName("لا توجد بيانات للجدول|No timetable data available", lang)}</div>`;
    }

    // ========== التوقيعات (بدون مربع، بشكل جميل) ==========
    html += `
        <div class="signatures-container">
            <div class="signature-item">
                <span class="signature-label">${getName("توقيع الطالب|Student signature", lang)}</span>
                <div class="signature-line"></div>
            </div>
            <div class="signature-item">
                <span class="signature-label">${getName("توقيع المرشد الأكاديمى|Advisor signature", lang)}</span>
                <div class="signature-line"></div>
            </div>
            <div class="signature-item">
                <span class="signature-label">${getName("توقيع رئيس القسم|Department Director signature", lang)}</span>
                <div class="signature-line"></div>
            </div>
        </div>
    `;

    html += `</div>`;

    return html;
}
function getColorByChkType(chkType) {
    switch(chkType) {
        case "35.13.1.": return "#E8F5E9";  // محاضرة
        case "35.13.2.": return "#FFF3E0";  // فصل
        case "35.13.3.": return "#E3F2FD";  // معمل
        default: return "#F1F1F1";
    }
}
function render_timetable_shape2_html(lang, timetableData) {


    // ========== التحقق من وجود بيانات ==========
    if (!timetableData || timetableData.MSG != "success") {
        return `<div style="text-align:center; padding:20px; color:red;">
                    ${getName("لايوجد جدول للطالب|No Table Exist for Student", lang)}
                </div>`;
    }

    var data = timetableData;
    var dir = (lang == "A") ? "rtl" : "ltr";
    var align = (lang == "A") ? "right" : "left";

    // استخراج البيانات
    var studentTimeTable = data.Data || data.studentTimeTable || [];
    var daysTable = data.daysTable || [];
    var groupType = data.groupType || '';
    var lblName = (lang == "A") ? "اسم الطالب" : "Student Name";
    var stuName = data.StuName || '';
    var studentCode = data.student_code || '';
    var regAcceptFlag = data.StRegConfFlag || '';
    var registerAcceptDate = data.RegisterAcceptDate || '';
    var rightlogo = data.rightlogo || "";
    var leftlogo = data.leftlogo || "";

    // استخدام الدالة الموجودة GetGroupNameType
    var GroupLettersList = typeof GetGroupNameType === 'function' ? GetGroupNameType(groupType) : [];

    var html = '';

    html += `<div dir="${dir}">`;

    // ========== الهيدر بالشعارات ==========
    html += `
        <div class="timetable-header-logo">
            <table style="width:100%;">
                <tr>
                    <td style="width:20%; text-align:${align};"><img src="/static/images/${rightlogo}" style="width:82px; height:102px;" onerror="this.style.display='none'"></td>
                    <td style="width:60%; text-align:center;"><h3>${getName('الجدوال الدراسي|Study Time Table', lang)}</h3></td>
                    <td style="width:20%; text-align:${align === 'right' ? 'left' : 'right'};"><img src="/static/images/${leftlogo}" style="width:82px; height:102px;" onerror="this.style.display='none'"></td>
                </tr>
            </table>
        </div>
    `;

    // ========== معلومات الطالب ==========
    html += `
        <div class="timetable-student-info">
            <table>
                <tr>
                    <td style="width:50%; text-align:${align};">
                        <b class="student-name-red">${lblName} : ${getName(stuName, lang)}</b>
                    </td>
                    <td style="width:50%; text-align:${align === 'right' ? 'left' : 'right'};">
                        <b class="student-name-red">${getName("كود الطالب|Student Code", lang)} : ${studentCode}</b>
                    </td>
                </tr>
    `;

    if (regAcceptFlag == "1") {
        html += `
            <tr>
                <td colspan="2" style="text-align:center;">
                    <b class="student-name-red">${getName("تم قبول التسجيل بتاريخ|Registration accepted on", lang)} : ${registerAcceptDate}</b>
                </td>
            </tr>
        `;
    }

    html += `</table></div>`;

    // ========== الجدول الرئيسي ==========
    if (studentTimeTable.length > 0 && daysTable.length > 0) {
        html += `<div class="timetable-shape2-container">`;
        html += `<table class="timetable-shape2-table" dir="${dir}" style="text-align:${align};">`;
        html += `<thead>`;
        html += `<tr height="25">`;
        html += `<th style="width:100px;">${getName('اليوم|Day', lang)}</th>`;
        html += `<th style="width:100px;">${getName('التوقيت|The time', lang)}</th>`;
        html += `<th style="width:100px;">${getName('المادة|The course', lang)}</th>`;
        html += `<th style="width:100px;">${getName('اسم المحاضر|Staff Name', lang)}</th>`;
        html += `<th style="width:100px;">${getName('النوع|Type', lang)}</th>`;
        html += `<th style="width:100px;">${getName('رقم المجموعة|Group Number', lang)}</th>`;
        html += `<th style="width:100px;">${getName('القاعة|Building', lang)}</th>`;
        html += `</tr>`;
        html += `</thead>`;
        html += `<tbody>`;

        // ملء الجدول بالبيانات
        for (var i = 0; i < studentTimeTable.length; i++) {
            for (var d = 0; d < daysTable.length; d++) {
                var dayId = daysTable[d]?.item_id || daysTable[d];
                var TimeData = studentTimeTable[i][dayId];
                if (!TimeData || TimeData.length === 0) continue;

                for (var j = 0; j < TimeData.length; j++) {
                    var ItemData = TimeData[j];
                    if (!ItemData) continue;

                    html += `<tr>`;

                    // اليوم (يظهر مرة واحدة لكل مجموعة)
                    if (j === 0) {
                        html += `<td rowspan="${TimeData.length}">
                                    <span>${getName(ItemData.dayName, lang)}</span>
                                </td>`;
                    }

                    // التوقيت
                    html += `<td><span>${ItemData.startPeriod || ''} - ${ItemData.endPeriod || ''}</span></td>`;

                    // اسم المادة
                    html += `<td><span>${getName(ItemData.courseName, lang)}</span></td>`;

                    // اسم المحاضر
                    var staffName = '';
                    var nickStaffNameList = ItemData.nickStaffName;
                    if (nickStaffNameList && nickStaffNameList.length) {
                        var staffNames = [];
                        for (var s = 0; s < nickStaffNameList.length; s++) {
                            var nickStaffName = nickStaffNameList[s]?.nick_staff_name;
                            if (nickStaffName) {
                                var nameParts = nickStaffName.split('-');
                                for (var p = 0; p < nameParts.length; p++) {
                                    staffNames.push(getName(nameParts[p], lang));
                                }
                            }
                        }
                        staffName = staffNames.join(' ');
                    }
                    html += `<td><span>${staffName}</span></td>`;

                    // النوع
                    html += `<td><span>${getName(ItemData.typeName, lang)}</span></td>`;

                    // رقم المجموعة
                    var GroupID = ItemData.groupNum ? parseInt(ItemData.groupNum.split('-')[0]) : 0;
                    var SecID = ItemData.groupNum ? ItemData.groupNum.split('-')[1] : '';
                    var TitText = "";
                    if (GroupID != 0) {
                        TitText = GroupLettersList[GroupID] || GroupID;
                        if (SecID != '') {
                            TitText += ' - ' + getName(ItemData.typeName, lang) + ' ' + SecID;
                        }
                    }
                    html += `<td><span>${TitText}</span></td>`;

                    // القاعة
                    html += `<td><span>${getName(ItemData.buildName, lang)}</span></td>`;

                    html += `</tr>`;
                }
            }
        }

        html += `</tbody>`;
        html += `</table>`;
        html += `</div>`;
    } else {
        html += `<div style="text-align:center; padding:20px;">${getName("لا توجد بيانات للجدول|No timetable data available", lang)}</div>`;
    }

    html += `</div>`;

    return html;
}
function GetGroupNameType(GroupNameType) {
    var Letters='';
    if (GroupNameType == 1)
        Letters = [null, getName("الأولى|1"), getName("الثانية|2"), getName("الثالثة|3"), getName("الرابعة|4"), getName("الخامسة|5"), getName("السادسة|6")
            , getName("السابعة|7"), getName("الثامنة|8"), getName("التاسعة|9"), getName("العاشرة|10"), getName("الحادية عشر|11"), getName("الثانية عشر|12")
            , getName("الثالثة عشر|13"), getName("الرابعة عشر|14"), getName("الخامسة عشر|15"), getName("السادسة عشر|16"), getName("السابعة عشر|17")
            , getName("الثامنة عشر|18"), getName("التاسعة عشر|19"), getName("العشرون|20"), getName("الحادية و العشرون|21"), getName("الثانية و العشرون|22")
            , getName("االثالثة و العشرون|23"), getName("الرابعة و العشرون"), getName("الخامسة و العشرون|25"), getName("السادسة و العشرون|26")
            , getName("السابعة و العشرون|27"), getName("الثامنة و العشرون|28"), getName("التاسعة و العشرون|29")
            , getName("الثلاثون|30"), getName("الحادية والثلاثون|31"), getName("الثانية و االثلاثون|32"), getName("الثالثة و االثلاثون|33")
            , getName("الرابعةو الثلاثون|34"), getName("الخامسة والثلاثون|35"), getName("السادسة والثلاثون|36"), getName("السابعة والثلاثون|37")
            , getName("الثامنة و االثلاثون|38"), getName("التاسعة و الثلاثون|39")
            , getName("الأربعون|40"), getName("الحادية والأربعون|41"), getName("الثانية و الأربعون|42"), getName("الثالثة و الأربعون|43")
            , getName("الرابعة و الأربعون|44"), getName("الخامسة و الأربعون|45"), getName("السادسة والأربعون|46"), getName("السابعة والأربعون|47")
            , getName("الثامنة و الأربعون|48"), getName("التاسعة والأربعون|49"), getName("الخمسون|50")
        ];
    else if (GroupNameType == 2)
        Letters = [null, "أ", "ب", "ج", "د", "ح", "خ", "ت", "ث", "ذ", "ر", "ز", "س", "ش", "ص", "ضـ", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
    else if (GroupNameType == 3)
        Letters = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50];
    else if (GroupNameType == 4)
        Letters = [null, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return Letters;
}
function render_courses_grades_html(lang, data) {
         if (!data || data.MSG != 'success') {
             return `<div class="error-message">${getName(data?.MSG || "حدث خطأ في تحميل التقديرات|Error loading grades", lang)}</div>`;
         }

         // تحديد الاتجاه حسب اللغة
         var dir = (lang == "A") ? "rtl" : "ltr";
         var textAlign = (lang == "A") ? "right" : "left";

         // الحفاظ على كل المتغيرات الأصلية
         var pgLang = lang;
         var gradeLang = data["gradeLang"] || 'E';
         var stActualDegrees = data["ActualDegrees"];
         var AcademicYear = data["currentAcademicYear"];
         var AcademicSemester = data["currentAcademicSemester"];
         var showQualitySemesterStdPortal = data["showQualitySemesterStdPortal"];
         var StuSemesterData = data['StuSemesterData'] || [];
         var ScopeProgType = (typeof ScopeProgType !== 'undefined') ? ScopeProgType : "Credit";
         var font = (ScopeProgType == "StudyYear" ? "font-size:10pt;" : "BACKGROUND: #dcedf5;font-size:11pt;");
         var blockFlag = false;
         var ResultFlag = parseInt(data['ResultFlag']);

         var html = '';

         // ========== العنوان ==========
         html += `<div class="grades-header" dir="${dir}">`;
         html += `<h1>${getName('النتائج الدراسية|Courses Grades', lang)}</h1>`;
         html += `<h3>${getName(data["StuProgram"], pgLang)}</h3>`;
         html += `</div>`;

         // ========== معلومات الطالب الأساسية (بطاقة جميلة) ==========
         html += `
        <div class="student-info-card" dir="${dir}">
            <table style="width:100%;">
                <tr>
                    <td style="text-align:${textAlign}; width:33%;">
                        <span class="student-label">${getName('اسم الطالب|Student Name', lang)} :</span>
                        <span class="student-value">${getName(data["stuName"], lang)}</span>
                    </td>
                    <td style="text-align:${textAlign}; width:33%;">
                        <span class="student-label">${getName('المستوي|The level', lang)} :</span>
                        <span class="student-value">${getName(data["level"], lang)}</span>
                    </td>
                    <td style="text-align:${textAlign}; width:34%;">
                        <span class="student-label">${getName('حالة القيد|Status', lang)} :</span>
                        <span class="student-value">${getName(data["status"], lang)}</span>
                    </td>
                </tr>
            </table>
        </div>
    `;
         // ========== التقديرات لكل فصل دراسي ==========
         for (var i = 0; i < StuSemesterData.length; i++) {
             var AcadYear = StuSemesterData[i].AcadYearName;
             var AcadYearID = StuSemesterData[i].AcadYearID;

             for (var k = 0; k < StuSemesterData[i].Semesters.length; k++) {
                 var Semester = StuSemesterData[i].Semesters[k];

                 // حالة الحظر
                 if (Semester.BlockResult != "") {
                     blockFlag = true;
                     html += `<div class="semester-title" dir="${dir}">${getName(Semester.SemesterName, pgLang)} ${getName(AcadYear, pgLang)}</div>`;
                     html += `<div class="block-result">${getName(Semester.BlockResult, lang)}</div>`;
                     html += `<br>`;
                     continue;
                 }

                 var creditHour = 0;

                 // عنوان الفصل الدراسي
                 html += `<div class="semester-title" dir="${dir}">
                        ${getName(Semester.SemesterName, pgLang)} ${(ScopeProgType == "Credit" ? getName(AcadYear, pgLang) : "")}
                    </div>`;

                 // بداية جدول المقررات
                 html += `<div class="grades-container">`;
                 html += `<table class="grades-table" dir="ltr">`;
                 html += `<thead>`;
                 html += `<tr>`;
                 html += `<th style="text-align:center; width:15%;">${getName('كود المقرر |Course Code', pgLang)}</th>`;
                 html += `<th style="text-align:center; width:20%;">${getName('اسم المقرر | Course Name', pgLang)}</th>`;
                 html += `<th style="text-align:center; width:15%;">${getName('الساعات المعتمده | Credit Hours', pgLang)}</th>`;

                 var resultFlag2 = (ResultFlag == 2 || ResultFlag == 3);
                 var resultFlag7or8 = ((ResultFlag == 7 || ResultFlag == 8) && Semester.AcadYearID == AcademicYear && Semester.SemesterID == AcademicSemester);

                 if (resultFlag2 || resultFlag7or8) {
                     html += `<th style="text-align:center; width:15%;">${getName('تفصيل الدرجات | Degree in details', pgLang)}</th>`;
                 }

                 if (ResultFlag >= 1 && ResultFlag != 3 && ResultFlag != 8) {
                     html += `<th style="text-align:center; width:10%;">${getName('الدرجه | Degree', pgLang)}</th>`;
                 }

                 if (ResultFlag >= 0 && ResultFlag != 3 && ResultFlag != 4) {
                     html += `<th style="text-align:center; width:15%;">${getName('التقدير | Grade', pgLang)}</th>`;
                 }

                 html += `</tr>`;
                 html += `</thead>`;
                 html += `<tbody>`;

                 // المقررات
                 for (var j = 0; j < Semester.Courses.length; j++) {
                     var CourseData = Semester.Courses[j];
                     creditHour += (parseFloat(CourseData.CourseCredit) ? parseFloat(CourseData.CourseCredit) : 0);

                     html += `<tr>`;
                     html += `<td style="text-align:center;">${getName(CourseData.CourseCode, pgLang)}</td>`;
                     html += `<td style="TEXT-ALIGN: ${pgLang == 'A' ? 'right' : 'left'}">${getName(CourseData.CourseName, pgLang)}</td>`;
                     html += `<td style="text-align:center;">${CourseData.CourseCredit}</td>`;

                     if (resultFlag2 || resultFlag7or8) {
                         var assmentHtml = '';
                         try {
                             if (typeof assmentTbl === 'function') {
                                // assmentHtml = assmentTbl(CourseData, stActualDegrees);
                                  assmentHtml = assmentTbl(
                                    CourseData,           // data
                                    stActualDegrees,      // stActualDegrees
                                    stDegrees,            // stDegrees
                                    stMapAssementIds,     // stMapAssementIds
                                    stMapDegreesNames,    // stMapDegreesNames
                                    pgLang,               // lang
                                    dir                   // dir
                                );
                             }
                         } catch (e) {
                             assmentHtml = '---';
                         }
                         html += `<td style="text-align:center;">${assmentHtml}</td>`;
                     }

                     // الدرجة والتقدير
                     if (CourseData.CourseStatus == "") {
                         if (ResultFlag >= 1 && ResultFlag != 3 && ResultFlag != 8) {
                             var degreeClass = (CourseData.Degree && CourseData.Degree >= 50) ? 'grade-pass' : (CourseData.Degree ? 'grade-fail' : '');
                             html += `<td style="text-align:center;"><span class="${degreeClass}">${CourseData.Degree ? CourseData.Degree : ""}</span></td>`;
                         }
                         if (ResultFlag >= 0 && ResultFlag != 6 && ResultFlag != 3 && ResultFlag != 4) {
                             var gradeClass = getGradeClass(CourseData.Grade);
                             html += `<td style="text-align:center;"><span class="${gradeClass}">${getName(CourseData.Grade, gradeLang)}</span></td>`;
                         }
                         if (ResultFlag == 6) {
                             html += `<td style="text-align:center;">${getName(CourseData.equGrade, gradeLang)}</td>`;
                         }
                     } else {
                         html += `<td style="text-align:center;" colspan="2"><span class="grade-fail">${getName(CourseData.CourseStatus, gradeLang)}</span></td>`;
                     }

                     html += `</tr>`;
                 }

                 html += `</tbody>`;
                 html += `</table>`;
                 html += `</div>`;

                 // ملخص الفصل الدراسي
                 html += `<div class="semester-summary" dir="${dir}">`;
                 html += `<span>${getName('الساعات المسجله : |Attempted Hours: ', pgLang)} <strong class="highlight">${creditHour}</strong></span> &nbsp;&nbsp;&nbsp;`;
                 html += `<span>${getName('الساعات الحاصل عليها : |Total Hours Earned : ', pgLang)} <strong class="highlight">${Semester.CurrCH ? parseFloat(Semester.CurrCH) : ""}</strong></span>`;

                 if (Semester.CourseStatus == "") {
                     html += `&nbsp;&nbsp;&nbsp;<span>${getName('المعدل الفصلي : |Semester GPA : ', pgLang)} <strong class="highlight">${Semester.GPA}</strong></span> &nbsp;&nbsp;&nbsp;`;
                     html += `<span>${getName('المعدل التراكمي : |GPA : ', pgLang)} <strong class="highlight">${Semester.CurrGPA}</strong></span>`;

                     if (showQualitySemesterStdPortal) {
                         var qualityPoint = Semester.sem663QualityPoint ? parseFloat(Semester.sem663QualityPoint).toFixed(parseFloat(Semester.PointRoundNum)) : "";
                         html += `&nbsp;&nbsp;&nbsp;<span>${getName('نقاط الجوده الفصلية : |Semester Quality Points : ', pgLang)} <strong class="highlight">${qualityPoint}</strong></span>`;
                     }

                     if (Semester.flagShowPrc != '0') {
                         html += `&nbsp;&nbsp;&nbsp;<span>${getName('النسبه الفصليه : |Semester Perc. : ', pgLang)} <strong class="highlight">${Semester.CurrPerc}</strong></span>`;
                         html += `&nbsp;&nbsp;&nbsp;<span>${getName('النسبه التراكميه : |Percentage : ', pgLang)} <strong class="highlight">${Semester.AccumPerc}</strong></span>`;
                     }

                     if (Semester.flagShowSemesterCumulativeGrade != '0') {
                         var semesterGrade = "";
                         var cumulativeGrade = "";

                         if (Semester.ShowGradeMethod == "2") {
                             if (typeof GetItemIDName === 'function') {
                                 semesterGrade = Semester.SemGrade ? GetItemIDName(Semester.SemGrade || 'x.', "basicattributes", pgLang) : "";
                                 cumulativeGrade = Semester.equivalentCumulativeGrade ? GetItemIDName(Semester.equivalentCumulativeGrade || 'x.', "basicattributes", pgLang) : "";
                             }
                         } else {
                             semesterGrade = Semester.semesterGradeSymbol ? getName(Semester.semesterGradeSymbol, pgLang) : "";
                             cumulativeGrade = Semester.cumulativeGrade ? getName(Semester.cumulativeGrade, pgLang) : "";
                         }

                         html += `&nbsp;&nbsp;&nbsp;<span>${getName(' التقدير الفصلى: |Semester Grade. : ', pgLang)} <strong class="highlight">${semesterGrade}</strong></span>`;
                         html += `&nbsp;&nbsp;&nbsp;<span>${getName(' التقدير التراكمى: |cumulative Grade. : ', pgLang)} <strong class="highlight">${cumulativeGrade}</strong></span>`;
                     }
                 }
                 html += `</div>`;
                 html += `<br>`;
             }
         }
         // جدول التقديرات الإضافي للطلاب
         if (typeof RegType !== 'undefined' && RegType == "student") {
             html += `<div class="grades-container" dir="${dir}">`;
             html += `<table id="studyGradesDetTable" class="grades-table" style="width:70%; margin:0 auto;">`;
             html += `</table>`;
             html += `<table id="Tbl_Symbols" class="grades-table" style="margin-top:10px; width:28%;">`;
             html += `</table>`;
             html += `</div>`;
         }

         return html;

}
function getGradeClass(grade) {
    if (!grade) return '';
    var gradeStr = String(grade).toLowerCase();
    if (gradeStr.indexOf('ممتاز') !== -1 || gradeStr.indexOf('excellent') !== -1) return 'grade-excellent';
    if (gradeStr.indexOf('جيد جدا') !== -1 || gradeStr.indexOf('very good') !== -1) return 'grade-very-good';
    if (gradeStr.indexOf('جيد') !== -1 || gradeStr.indexOf('good') !== -1) return 'grade-good';
    if (gradeStr.indexOf('مقبول') !== -1 || gradeStr.indexOf('pass') !== -1) return 'grade-pass';
    if (gradeStr.indexOf('راسب') !== -1 || gradeStr.indexOf('fail') !== -1) return 'grade-fail';
    return '';
}
function assmentTbl(data, stActualDegrees, stDegrees, stMapAssementIds, stMapDegreesNames, lang, dir) {
    var str = '';
    var tblDir = dir || 'rtl';
    var tblAlign = (lang == 'A') ? 'right' : 'left';

    str += "<TABLE width='100%' border=0 dir='" + tblDir + "' style='TEXT-ALIGN:" + tblAlign + ";font-size: 10pt;background-color:#fffef9;'><TBODY>";

    for (var Assement in stActualDegrees) {
        var CourseDegree = stActualDegrees[Assement];
        if (CourseDegree && data[CourseDegree]) {
            var degreeKey = stDegrees[CourseDegree];
            var mapAssementId = stMapAssementIds[degreeKey];
            var degreeName = stMapDegreesNames[mapAssementId];

            str += "<TR>";
            str += "<TD style='text-align:" + tblAlign + ";WIDTH: 50%;'>&nbsp;";
            str += "<SPAN style='white-space:nowrap;margin-right:7px;'><bdi>" + getName(degreeName, lang);
            str += "&nbsp;( " + data[CourseDegree] + " )&nbsp;&nbsp;</SPAN></bdi></TD>";
            str += "<TD style='margin:7px;WIDTH: 25%;'>&nbsp;&nbsp;";
            str += ((data[CourseDegree] !== undefined) ? data[degreeKey] : "  ");
            str += "</TD></TR>";
        }
    }
    str += "</TBODY></TABLE>";
    return str;
}
function processCourseData(data) {
   stMapAssementIds={}
    if (data["CourseAssements"]) {
        stCourseAssements = data["CourseAssements"];
    }
    if (data["MapDegrees"]) {
        stMapDegrees = data["MapDegrees"];
        for (var n in stMapDegrees) {
            stMapAssementIds[stMapDegrees[n]] = n;
        }
    }
    if (data["ActualDegrees"]) {
        stActualDegrees = data["ActualDegrees"];
    }
    if (data["Degrees"]) {
        stDegrees = data["Degrees"];
    }
    if (data["MaxCourseMark"]) {
        stMaxCourseMark = data["MaxCourseMark"];
    }
    if (data["MapDegreesNames"]) {
        stMapDegreesNames = data["MapDegreesNames"];
    }
}
function render_exam_seats_html(lang, data) {

    var dir = (lang == "A") ? "rtl" : "ltr";
    var align = (lang == "A") ? "right" : "left";

    if (data['retMsg'] != 'success') {
        return `<div class="error-message">${getName(data['retMsg'], lang)}</div>`;
    }

    var rightlogo = data["rightlogo"] || "";
    var leftlogo = data["leftlogo"] || "";
    var distributeAssessment = data["distributeAssessment"] || "0";
    var Seats = data["Data"] || [];
    var Title = data["Title"] || {};

    if (!Seats || Seats.length === 0) {
        return NoDataToShow ? NoDataToShow() : `<div class="no-data-message">${getName("لا توجد بيانات|No Data", lang)}</div>`;
    }

    var html = '';

    html += `<div id="printDiv" style="width:95%; margin:0 auto;">`;
    html += `<table id="container" dir="${dir}" style="width:100%;">`;
    html += `<tr><td>`;

    // الهيدر
    html += ShowHeader ? ShowHeader(getName('جدول إمتحان طالب|Student Exam Time Table', lang), leftlogo, rightlogo) : '';

    html += `</td></tr>`;
    html += `<tr><td>`;

    // ========== الجدول الرئيسي ==========
    var colspanCount = distributeAssessment == "1" ? 10 : 9;

    html += `
        <table id="StdCom" class="exam-seats-table" dir="${dir}">
            <thead>
                <tr class="exam-header-title">
                    <td colspan="${colspanCount}" style="text-align:center; font-weight:bold; font-size:18px; padding:12px;">
                        ${getName(Title["StuName"], lang).replace(/\|$/, '')}
                        &nbsp;${getName(Title["StuCode"], lang)}
                        &nbsp;-&nbsp;
                        ${getName(Title["AcademicSemesterName"], lang)}
                        &nbsp;${getName(Title["AcademicYearName"], lang)}
                    </td>
                </tr>
                <tr class="exam-header-columns">
                    <th>${getName("التاريخ|Date", lang)}</th>
                    <th>${getName("الكود|Code", lang)}</th>
                    <th>${getName("المقرر|Course", lang)}</th>
    `;

    if (distributeAssessment == "1") {
        html += `<th>${getName("التفاصيل|Assessment", lang)}</th>`;
    }

    html += `
                    <th>${getName("الــوقـــــــت|Time", lang)}</th>
                    <th>${getName("اسم اللجنة|Committee Name", lang)}</th>
                    <th>${getName("مكان اللجنة|Committee Place", lang)}</th>
                    <th>${getName("المقعد|Seat", lang)}</th>
                    <th>${getName("ملاحظات|Notes", lang)}</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (var s = 0; s < Seats.length; s++) {
        var stdSeat = Seats[s];
        var concatName = stdSeat["ConcatName"] ? `&nbsp;-&nbsp;<span class="exam-concat-name">${getName(stdSeat["ConcatName"], lang)}</span>` : '';

        html += `<tr>`;
        html += `<td>${stdSeat["DayDate"] || ''}</td>`;
        html += `<td>${getName(stdSeat["CourseCode"], lang)}</td>`;
        html += `<td>${getName(stdSeat["CourseName"], lang)}${concatName}</td>`;

        if (distributeAssessment == "1") {
            html += `<td>${getName(stdSeat["assessmnetName"], lang)}</td>`;
        }

        if (stdSeat["DayDate"]) {
            var timeSlot = stdSeat["FromDate"] ? stdSeat["FromDate"] + ' - ' + stdSeat["ToDate"] : '';
            html += `
                <td>${timeSlot}</td>
                <td>${getName(stdSeat["CommitteeName"], lang)}</td>
                <td>${getName(stdSeat["BuildingName"], lang)}</td>
                <td><strong>${stdSeat["SeatNum"] || ''}</strong></td>
                <td>${getName(stdSeat["Notes"], lang)}</td>
            `;
        } else {
            var noSeatColspan = distributeAssessment == "1" ? 7 : 6;
            html += `<td colspan="${noSeatColspan}" class="no-seat-message">${getName("لا يوجد أرقام مقاعد|No Seat Num", lang)}</td>`;
        }

        html += `</tr>`;
    }

    html += `
            </tbody>
        </table>
    `;

    html += `</td></tr>`;
    html += `</table>`;
    html += `</div>`;

    return html;
}
function render_warning_options_html(lang) {
    var dir = (lang == "A") ? "rtl" : "ltr";
    var align = (lang == "A") ? "right" : "left";

    var html = `
        <div class="warning-container" dir="${dir}">
            <div class="warning-header">
                <h2>${getName("الإنذارات الأكاديمية|Academic Warnings", lang)}</h2>
            </div>
            
            <div class="warning-options">
                <label class="warning-label">${getName("اختر نوع الإنذار|Choose Warning Type", lang)} :</label>
                <div class="warning-radio-group">
                    <input type="radio" name="warningType" value="1" id="warnGPA" checked>
                    <label for="warnGPA">${getName("انذار بناء على المعدل|GPA Warning", lang)}</label>
                    
                    <input type="radio" name="warningType" value="2" id="warnAbsence">
                    <label for="warnAbsence">${getName("انذار غياب|Absence Warning", lang)}</label>
                    
                    <input type="radio" name="warningType" value="3" id="warnFailure">
                    <label for="warnFailure">${getName("انذار مقررات الرسوب|Failure Warning", lang)}</label>
                </div>
            </div>
            
            <div id="warnDiv" class="warning-result"></div>
        </div>
    `;

    return html;
}
function render_warning_data_html(lang, result, Dict) {

    var dir = (lang == "A") ? "rtl" : "ltr";
    var align = (lang == "A") ? "right" : "left";

    var d = result['warningData'] || [];
    var warningText = result['warningTxt'] || {};
    var flagGPAWarning = Dict['flagGPAWarning'];
    var warningAbsence = Dict['warningAbsence'] || false;
    var warningType = Dict['warningType'] || '1';

    if (!d || d.length === 0 || !d[0] || d[0].length === 0) {
        return `<div class="no-data-message">${getName("لا توجد إنذارات|No warnings found", lang)}</div>`;
    }

    var Acadwarndata = d[0];
    var html = '';

    // ========== العنوان ==========
    var title = '';
    if (warningAbsence) {
        title = getName('تقرير انذارات الغياب|Absence Warnings Report', lang);
    } else if (flagGPAWarning && warningType != '3') {
        title = getName('تقرير الانذارات الاكاديميه|Academic Warnings Report', lang);
    } else if (warningType == '3') {
        title = getName('تقرير انذارات الرسوب|Failure Warnings Report', lang);
    } else {
        title = getName('تقرير الانذارات لعدم التسجيل|Unregistration Warnings Report', lang);
    }

    html += `
        <div class="warning-report-container" dir="${dir}">
            <div class="warning-report-header">
                <h3>${title}</h3>
                <div class="warning-report-date">${GetDate ? GetDate() : ''}</div>
            </div>
            <hr>
    `;

    // ========== الجدول ==========
    if (Acadwarndata.length > 0) {
        html += `
            <div class="warning-table-container">
                <table class="warning-table">
                    <thead>
                        <tr>
        `;

        if (warningAbsence) {
            html += `
                <th>${getName("الإنذار|Warning", lang)}</th>
                <th>${getName("اسم المقرر|Course Name", lang)}</th>
                <th>${getName("الفصل الدراسي|Semester", lang)}</th>
                <th>${getName("العام الدراسي|Academic Year", lang)}</th>
                <th>${getName("نسبة الغياب|Absence %", lang)}</th>
            `;
        } else {
            html += `
                <th>${getName("رقم الإنذار|Warning No.", lang)}</th>
            `;
            if (!flagGPAWarning) {
                html += `<th>${getName("تاريخ الإنذار|Warning Date", lang)}</th>`;
            }
            if (flagGPAWarning && warningType != '3') {
                html += `<th>${getName("المعدل التراكمي|GPA", lang)}</th>`;
            }
            if (warningType == '3') {
                html += `<th>${getName("عدد مرات الرسوب|Failures", lang)}</th>`;
            }
            html += `
                <th>${getName("الفصل الدراسي|Semester", lang)}</th>
                <th>${getName("العام الدراسي|Academic Year", lang)}</th>
                <th>${getName("ملاحظات|Notes", lang)}</th>
            `;
        }

        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (var i = 0; i < Acadwarndata.length; i++) {
            var warndata = Acadwarndata[i];
            html += `<tr>`;

            if (warningAbsence) {
                html += `
                    <td>${getName(warndata.absenceText, lang)}</td>
                    <td>${getName(warndata.courseName, lang)}</td>
                    <td>${getName(warndata.semName, lang)}</td>
                    <td>${getName(warndata.yearName, lang)}</td>
                    <td><span class="warning-percentage">${warndata.absence_percentage}%</span></td>
                `;
            } else {
                html += `
                    <td><strong>${getName(warndata.WarnNum, lang)}</strong></td>
                `;
                if (!flagGPAWarning) {
                    html += `<td>${warndata.ApplyDate || ''}</td>`;
                }
                if (flagGPAWarning && warningType != '3') {
                    html += `<td><span class="warning-gpa">${getName(warndata.f5, lang)}</span></td>`;
                }
                if (warningType == '3') {
                    html += `<td><span class="warning-failures">${getName(warndata.f5, lang)}</span></td>`;
                }
                html += `
                    <td>${getName(warndata.semName, lang)}</td>
                    <td>${getName(warndata.yearName, lang)}</td>
                    <td>${warndata.f8 || ''}</td>
                `;
            }

            html += `</tr>`;
        }

        html += `
                    </tbody>
                </table>
            </div>
        `;
    }

    html += `</div>`;

    return html;
}
function renderFeesPaymentPage() {
    var html = '';

    // ====== هيكل الصفحة ======
    html += '<div id="feesPaymentContainer">';

    // رسائل التنبيه
    html += '<div id="NoteContainer"></div>';

    // معلومات العام والفصل
    html += '<div class="academic-info">';
    html += '    <div class="info-item">';
    html += '        <h4 class="info-label">' + getName("العام الدراسى / ") + '</h4>';
    html += '        <h4 id="year_name" class="info-value"></h4>';
    html += '    </div>';
    html += '    <div class="info-item">';
    html += '        <h4 class="info-label">' + getName("الفصل الدراسى / ") + '</h4>';
    html += '        <h4 id="semester_name" class="info-value"></h4>';
    html += '    </div>';
    html += '</div>';

    // جدول الرسوم
    html += '<div class="table-container">';
    html += '    <table id="feesTbl" class="fees-table"></table>';
    html += '</div>';

    // حاوية الدفع (إجمالي + أزرار)
    html += '<div id="paymentContainer"></div>';

    html += '</div>';

    return html;
}
function showNote(message, type) {
    var color = '';
    var bgColor = '';
    var borderColor = '';

    if (type === 'error') {
        color = '#8B0000';
        bgColor = '#ffe8e8';
        borderColor = '#c62828';
    } else if (type === 'warning') {
        color = '#856404';
        bgColor = '#fff3cd';
        borderColor = '#ffc107';
    } else {
        color = '#0c5460';
        bgColor = '#d1ecf1';
        borderColor = '#17a2b8';
    }

    var html = '<span class="note-message" style="display:block; padding:12px 16px; border-radius:8px; border-right:4px solid ' + borderColor + '; background:' + bgColor + '; color:' + color + '; font-size:16px; margin-bottom:15px;">';
    html += message;
    html += '</span>';

    $('#NoteContainer').html(html);
}
function renderTotalFees(totalValue) {
    var html = '<div class="total-fees-container">';
    html += '    <span class="total-label">' + getName("إجمالي الرسوم المستحقة | Total Fees Due") + ' : </span>';
    html += '    <span class="total-value" id="span_total_needed">' + totalValue + '</span>';
    html += '</div>';
    return html;
}
function renderPaymentButtons() {
    var html = '<div class="payment-buttons">';
    html += '    <button id="misr_bank" class="payment-btn primary-btn">' + getName("الدفع ببطاقة الإئتمان | Pay using Credit Card") + '</button>';
    html += '</div>';
    return html;
}
function renderFeesTable(feesData) {
    if (!feesData || feesData.length === 0) {
        $('#feesTbl').html('<tr><td colspan="3" style="text-align:center; padding:20px; color:#999;">' + getName("لا توجد رسوم مستحقة|No fees due") + '</td></tr>');
        return;
    }

    var data_str = '';
    data_str += '<thead><tr>';
    data_str += '    <th>' + getName("اختيار|Select") + '</th>';
    data_str += '    <th>' + getName("الرسم|Fee") + '</th>';
    data_str += '    <th>' + getName("القيمه|Value") + '</th>';
    data_str += '</tr></thead><tbody>';

    for (var i = 0; i < feesData.length; i++) {
        var fee_data = feesData[i];
        var checked = 'checked';

        data_str += '<tr>';
        data_str += '    <td><input ' + checked + ' type="checkbox" id="' + fee_data.fee_id + '" fee_item="' + fee_data.fee_item + '" class="chooseFees" value="' + fee_data.to_paid_value + '"></td>';
        data_str += '    <td>' + getName(fee_data.fee_name) + '</td>';
        data_str += '    <td>' + fee_data.to_paid_value + '</td>';
        data_str += '</tr>';
    }

    data_str += '</tbody>';
    $('#feesTbl').html(data_str);
}
function repair_data() {
    selected_fees_to_paid = [];
    total_value_needed = 0;

    $(".chooseFees").each(function() {
        var fee_item = $(this).attr("fee_item").replaceAll('.', '_');
        if ($(this).prop('checked')) {
            total_value_needed += parseFloat($(this).attr("value"));
            if (!selected_fees_to_paid.includes(fee_item))
                selected_fees_to_paid.push(fee_item);
        }
    });

    $("#span_total_needed").text(total_value_needed);

    if (total_value_needed == 0) {
        $("#misr_bank").prop('disabled', true);
    } else {
        $("#misr_bank").prop('disabled', false);
    }
}

var ProgsList = [];
var availableRegularProgram = 0;
var availablePrivateProgram = 0;
var desireOperator = '';
var desireNumberRegister = '';
var stuProgram = '';
var stuGpa = '';
var stuGrade = '';

function renderDesiresPageHtml(lang) {
    var dir = (lang == "A") ? "rtl" : "ltr";

    var html = '';
    html += '<div class="desires-container" dir="' + dir + '">';

    html += '<div class="desires-header">' + getName("الرغبات|Desires", lang) + '</div>';

    html += '<div id="desiresNoteContainer"></div>';

    html += '<div class="desires-radio-group">';
    html += '    <label>' + getName("اختر نوع البرامج|Choose Program Type", lang) + ' :</label>';
    html += '    <input type="radio" name="ProgType" value="0" id="progNormal" checked>';
    html += '    <label for="progNormal">' + getName("برنامج عادى|Normal Program", lang) + '</label>';
    html += '    <input type="radio" name="ProgType" value="1" id="progPrivate">';
    html += '    <label for="progPrivate">' + getName("برنامج خاص|Private Program", lang) + '</label>';
    html += '</div>';

    // حاوية الرغبات
    html += '<div id="desirediv">';
    html += '    <form id="FormStudentDesireData">';
    html += '        <input type="hidden" id="desireNumberRegister" name="desireNumberRegister">';
    html += '        <div style="text-align:left; margin-bottom:10px;">';
    html += '            <button id="PrintProgDsr" class="desires-btn desires-btn-print">' + getName("طباعة|Print", lang) + '</button>';
    html += '        </div>';
    html += '        <table class="desires-table">';
    html += '            <thead><tr><th>' + getName("الرغبات|Desires", lang) + '</th></tr></thead>';
    html += '            <tbody>';
    html += '                <tr>';
    html += '                    <td style="padding:15px;">';
    html += '                        <div id="desirebales" style="direction:' + dir + ';">';
    html += '                            <select id="slcprogs" name="slcprogs" class="multiselect" multiple="multiple">';
    html += '                                <option value="">----</option>';
    html += '                            </select>';
    html += '                        </div>';
    html += '                    </td>';
    html += '                </tr>';
    html += '            </tbody>';
    html += '        </table>';
    html += '        <div class="desires-actions">';
    html += '            <button id="SaveDesires" class="desires-btn desires-btn-primary">' + getName("حفظ|Save", lang) + '</button>';
    html += '        </div>';
    html += '    </form>';
    html += '</div>';

    html += '</div>';

    return html;
}
// ============================================
// عرض رسائل التنبيه
// ============================================
function showDesiresNote(message, type) {
    var className = 'desires-note';
    if (type === 'info') className += ' desires-note-info';
    else if (type === 'warning') className += ' desires-note-warning';
    else if (type === 'error') className += ' desires-note-error';

    $('#desiresNoteContainer').html('<div class="' + className + '">' + message + '</div>');
}
function initMultiSelect() {

     try {
        if (typeof $(".multiselect").multiselect === 'function') {
            $(".multiselect").multiselect({ sortable: true  });
            $(".ui-multiselect ul li").css("padding-right", "20px");


        }
    } catch(e) {
        console.log("multiselect init error:", e);
    }
}

function renderPrograms(lang,data) {

    if (!data || data.MSG != '') {
        if (data && data.MSG) {
            showDesiresNote(getName(data.MSG), 'warning');
        }
        return '';
    }

    availableRegularProgram = data.availableRegularProgram || 0;
    availablePrivateProgram = data.availablePrivateProgram || 0;
    desireOperator = data.desireNumbersOperator || '>=';
    desireNumberRegister = data.desireNumbersRegister || '';
    PreQualDegree = data["PreQualDegree"] || '';
    PreQualName = data["PreQualName"] || '';
    CurrentNameA = getName(data["stuName"], 'A');
    stuProgram = data['programName'] || '';
    stuGpa = data['GPA'] || '';
    stuGrade = data['cumulativeGradeName'] || '';

    var str = '';
    ProgsList = data.progs || [];

    for (var x = 0; x < ProgsList.length; x++) {
        var Name = getName(ProgsList[x].Name);
        var ID = ProgsList[x].ID;
        var selected = (ProgsList[x].selected && ProgsList[x].selected == 'selected') ? 'selected' : '';

        str += "<option value='" + ID + "' title='" + Name + "' " + selected + ">" + Name + "</option>";
    }

    // بناء HTML كامل لـ desirediv
    var dir = (lang == "A") ? "rtl" : "ltr";
    var html = '';
    html += '<form id="FormStudentDesireData">';
    html += '    <input type="hidden" id="desireNumberRegister" name="desireNumberRegister" value="' + desireNumberRegister + '">';
    html += '    <div style="text-align:left; margin-bottom:10px;">';
    html += '        <button id="PrintProgDsr" class="desires-btn desires-btn-print">' + getName("طباعة|Print", lang) + '</button>';
    html += '    </div>';
    html += '    <table class="desires-table">';
    html += '        <thead><tr><th>' + getName("الرغبات|Desires", lang) + '</th></tr></thead>';
    html += '        <tbody>';
    html += '            <tr>';
    html += '                <td style="padding:15px;">';
    html += '                    <div id="desirebales" style="direction:' + dir + ';">';
    html += '                        <select id="slcprogs" name="slcprogs" class="multiselect" multiple="multiple">';
    html += '                            ' + str;
    html += '                        </select>';
    html += '                    </div>';
    html += '                </td>';
    html += '            </tr>';
    html += '        </tbody>';
    html += '    </table>';
    html += '    <div class="desires-actions">';
    html += '        <button id="SaveDesires" class="desires-btn desires-btn-primary">' + getName("حفظ|Save", lang) + '</button>';
    html += '    </div>';
    html += '</form>';

    return html;
}

// ============================================
// دالة حساب وتقييم الرغبات
// ============================================
function evaluateDesires() {
    var selectedCount = ($('#desirebales').find('.selected').find('li').length) - 1;
    var desireNum = parseInt(desireNumberRegister) || 0;
    var op = desireOperator || '>=';

    switch(op) {
        case '>=': return selectedCount >= desireNum;
        case '<=': return selectedCount <= desireNum;
        case '>': return selectedCount > desireNum;
        case '<': return selectedCount < desireNum;
        case '=':
        case '==': return selectedCount == desireNum;
        default: return selectedCount >= desireNum;
    }
}


function repairDesiresData() {
    var selectedCount = ($('#desirebales').find('.selected').find('li').length) - 1;
    var desireNum = parseInt(desireNumberRegister) || 0;

    if (desireNum > 0 && selectedCount > 0) {
        var isValid = evaluateDesires();
        if (!isValid) {
            showDesiresNote(
                getName("يجب إختيار عدد رغبات " + desireOperator + desireNumberRegister + " | You must choose " + desireOperator + desireNumberRegister + " programs"),
                'warning'
            );
        } else {
            $('#desiresNoteContainer').html('');
        }
    }
}


function printDesiresReport(data) {
    if (!data) return;

    var desiresPrintNames = [];
    var desireFlag = data.DesiresFlag || '';
    var ResultThanwy = data.ResultThanwy || {};
    var ProgsList = data.progs || [];

    for (var x = 0; x < ProgsList.length; x++) {
        if (ProgsList[x].selected && ProgsList[x].selected == 'selected') {
            desiresPrintNames.push(ProgsList[x].Name);
        }
    }

    var str = "<div id=printDiv style='direction:" + getName("rtl|ltr") + ";'>";
    str += "  <table id=container width=80% dir=" + getName("rtl|ltr") + "><tr><td>";
    str += " <table id=headerTbl border=0 align=right dir=" + getName("rtl|ltr") + " style='height:70px;width:100%;'>";
    str += "        <tr>";
    str += "            <TD style='width:20%;text-align:center;'><IMG src='/static/images/alexLogo.jpg' id='ImgLogo'><br></TD>";
    str += "     <TD align='center'><b><font size=4>" + "استمارة رغبات" + " </font> </TD>";
    str += "     <td style='width:20%'> </td></tr>";
    str += "    <TR style='width:80%' align='center'>";
    str += "           <TD colspan=3 style='font-size:12px;'>" + getName("نظام ابن الهيثم لإدارة شئون الطلاب |Ibn al-Haytham credit hours ", "A") + " " + GetDate() + "</td>";
    str += "    </tr>";
    str += "	<tr><td colspan=3><hr></td></tr>";
    str += "</table></td></tr>";
    str += " <tr><td>";
    str += " <table style='width:80%;margin:15px auto;text-align:right;'>";
    str += "        <tr><td colspan='3'>";
    str += "            <table style='width:100%;border:1px solid #000;border-radius:16px;margin:5px;'>";
    str += "                <tr><td style='width:150px;padding:5px;'>اسم الطالب</td><td>" + CurrentNameA + "</td></tr>";

    if (desireFlag == "0") {
        str += "<tr><td style='width:150px;padding:5px;'>البرنامج الحالى</td><td>" + getName(stuProgram) + "</td></tr>";
        str += "<tr><td style='width:150px;padding:5px;'>المعدل التراكمى</td><td>" + stuGpa + "</td></tr>";
        str += "<tr><td style='width:150px;padding:5px;'>التقدير التراكمى</td><td>" + getName(stuGrade) + "</td></tr>";
    } else {
        str += "<tr><td style='width:150px;padding:5px;'>المجموع</td><td>" + PreQualDegree + "</td></tr>";
        str += "<tr><td style='width:150px;padding:5px;'>نوع الشعبة</td><td>" + getName(PreQualName, "A") + "</td></tr>";
    }

    str += " </table></td></tr>";
    str += "        <tr><td colspan='3'><b>ترتيب رغبات الطالب</b></td></tr>";

    if (desiresPrintNames.length > 0) {
        for (var xx = 0; xx < desiresPrintNames.length; xx++) {
            str += "<tr><td style='width:10px;'>" + (xx + 1) + "</td>";
            str += "<td>" + getName(desiresPrintNames[xx], "A") + "</td></tr>";
        }
    } else {
        str += "<tr><td><label style='color:red'>لايوجد رغبات مسجلة</label></td></tr>";
    }

    str += " </table></td></tr>";

    if (ResultThanwy && Object.keys(ResultThanwy).length > 0) {
        str += " <tr><td>";
        str += " <table style='width:80%;margin:0 auto;border-collapse:collapse;' border='1'>";
        str += "<tr><td colspan='2' style='text-align:center;font-weight:bold;'>درجات الثانوية العامة</td></tr>";
        for (var key in ResultThanwy) {
            str += "<tr><td style='width:60%;'>" + key + "</td>";
            str += "<td>" + (ResultThanwy[key] || '') + "</td></tr>";
        }
        str += " </table></td></tr>";
    }

    str += "        <tr><td colspan=3><br></td></tr>";
    str += "        <tr><td colspan=3><span style='width:100px;'><b>توقيع الطالب :</b></span> .................................</td></tr>";
    str += "        <tr><td colspan=3><span style='width:100px;'><b>التاريخ :</b></span> .................................</td></tr>";
    str += "</table></div>";

    ClickHereToPrint("", str);
}
var map_status = {
    '1': 'جديد|New',
    '2': 'مقبول|Accept',
    '3': 'مرفوض|Refuse',
    '4': 'قيد المراجعة|In Progress',
    '5':'تم تعديل الدرجة|degrees Updated'
};
function renderComplaintMainForm(lang) {

    var dir = (lang == "A") ? "rtl" : "ltr";

    var html = '';
    html += '<form id="crs_form" dir="' + dir + '">';
    html += '    <header>';
    html += '        <h1>' + getName("طلب اعادة رصد درجات مقرر |Request to re-monitor course grades", lang) + '</h1>';
    html += '        <h2 style="color: #c62828; margin-bottom: 6px;" id="message_complaint"></h2>';
    html += '    </header>';
    html += '    <table dir="' + dir + '" id="complaintTbl">';
    html += '        <tr>';
    html += '            <td>' + getName("أختر السنه|Select Year", lang) + ':</td>';
    html += '            <td><select style="width:100%;" class="required" id="slcyearAcademic" name="slcyearAcademic"></select></td>';
    html += '            <td>' + getName("اخترالفصل الدراسي|Select Semester", lang) + ':</td>';
    html += '            <td><select style="width:100%;" class="required" id="slcstuSemester" name="slcstuSemester"></select></td>';
    html += '        </tr>';
    html += '        <tr>';
    html += '            <td><span class="blockCrs">' + getName("اخترالماده|Select Course", lang) + ':</span></td>';
    html += '            <td colspan="3"><span class="blockCrs"><select style="width:100%;" id="slcstuCourses" class="required" name="slcstuCourses"></select></span></td>';
    html += '        </tr>';
    html += '        <tr>';
    html += '            <td><label>' + getName("ملاحظات الطالب :|Student Notes:", lang) + '</label></td>';
    html += '            <td colspan="3"><textarea id="studentNotes" rows="4" placeholder="' + getName("اكتب ملاحظاتك هنا|Write your notes here", lang) + '"></textarea></td>';
    html += '        </tr>';
    html += '        <tr>';
    html += '            <td colspan="4" style="text-align: center; padding-top: 15px;">';
    html += '                <button id="SaveRecheckSubject" class="btn-save">' + getName("حفظ|Save", lang) + '</button>';
    html += '            </td>';
    html += '        </tr>';
    html += '    </table>';
    html += '</form>';
    html += '<div style="margin-top: 25px;"><table id="grid_data"></table></div>';

    return html;
}
function getStudentAcademicDataAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: false,
        data: {
            param0: "Questionnaire.Questions",
            param1: "getCurrentAcademicData",
            param2: JSON.stringify(paramDict)
        },
        success: function (d) {

            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function () {
            if (callback) callback(null);
        }
    })
}
function loadCourses(DictSearch,lang) {


    getStudentCoursesAPI(DictSearch, function(data) {
        var str = "";
        if (data && data.length > 0) {
            str += "<option value=''>-----</option>";
            for (var i = 0; i < data.length; i++) {
                str += "<option value='" + data[i].crsID + "' crsN='" + data[i].crsName + "'>" + getName(data[i].crsName) + "</option>";
            }
        } else {
            str = "<option value=''>" + getName("لا توجد مقررات|No courses", lang) + "</option>";
        }
        $("#slcstuCourses").html(str);
    });
}
function loadComplaintFee(lang,student_id='') {
    var Dict = {
        'year_id': $("#slcyearAcademic").val(),
        'semester_id': $("#slcstuSemester").val()
    };
    if(student_id){
        Dict['student_id']=student_id;
    }

    getComplaintFeeAPI(Dict, function(data) {
        var feeValue = data['fee_value'] || '';
        var msg = renderComplaintFeeMessage(feeValue, lang);
        if (msg) {
            $("#message_complaint").html(msg);
        }
    });
}
function renderComplaintFeeMessage(feeValue, lang) {
    if (feeValue) {
        var msgAr = "يرجى العلم ان قيمة رسم التظلم للمقرر " + feeValue + " جنية ";
        var msgEn = "Please note that the grievance fee for course is " + feeValue + " EGP";
        return getName(msgAr + "|" + msgEn, lang);
    }
    return '';
}
function getStudentCoursesAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "Questionnaire.Questions",
            param1: "getStudentCourses",
            param2: JSON.stringify(paramDict)
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback([]);
        }
    });
}
function getComplaintFeeAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentCoursesComplaints.CourseComplaints",
            param1: "get_complaint_fee_student_value",
            param2: JSON.stringify(paramDict)
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback({});
        }
    });
}
function loadComplaintsTable(lang,student_id='') {
    getAllComplaintsAPI(function(data) {
        var html = renderComplaintsTable(data, lang,student_id);
        $("#grid_data").html(html);
    }, student_id);
}
function getAllComplaintsAPI(callback,student_id='') {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentCoursesComplaints.CourseComplaints",
            param1: "get_all_courses_complaints",
            param2: JSON.stringify({'student_id':student_id})
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback({ data: [] });
        }
    });
}
function saveComplaintAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentCoursesComplaints.CourseComplaints",
            param1: "save_courses_complaints_degrees",
            param2: JSON.stringify(paramDict)
        },
        beforeSend: function() {
            if (typeof $.blockUI === 'function') {
                $.blockUI({ message: '<h1>' + getName('يرجى الانتظار|Please wait') + '</h1>' });
            }
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        complete: function() {
            if (typeof $.unblockUI === 'function') {
                $.unblockUI();
            }
        },
        error: function() {
            if (callback) callback({ failed: true, message: 'error' });
        }
    });
}
function saveComplaintAction(lang,student_id='') {
    if (!$("#crs_form").valid()) {
        return;
    }

    var Dict = {
        'year_id': $("#slcyearAcademic").val(),
        'semester_id': $("#slcstuSemester").val(),
        'course_id': $("#slcstuCourses").val(),
        'student_notes': $("#studentNotes").val()
    };
    if(student_id){
        Dict['student_id']=student_id;
    }

    if (!Dict['course_id']) {
        showComplaintMessage(getName("برجاء اختيار المقرر|Please select a course", lang));
        return;
    }

    saveComplaintAPI(Dict, function(data) {

        if (data && !data.failed) {
               showComplaintMessage(getName(data.message || 'تم الحفظ بنجاح|Saved successfully', lang));
            $("#crs_form")[0].reset();
            loadComplaintsTable(lang,student_id);
            loadComplaintFee(lang,student_id);
        } else {
          showComplaintMessage(getName(data ? data.message : 'حدث خطأ|Error occurred', lang));
        }
    });
}
function deleteComplaintAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentCoursesComplaints.CourseComplaints",
            param1: "delete_complaint_course_degree",
            param2: JSON.stringify(paramDict)
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback({ message: 'error' });
        }
    });
}
function deleteComplaintAction(itemId,lang,student_id='') {

    jConfirm(getName("هل انت متاكد من حذف الطلب ؟|Are you sure you want to delete this request?", lang),
        getName("تأكيد الحذف|Confirm Delete", lang),
        function(answer) {
            if (!answer) return false;

            var Dict = { 'item_doc': itemId };
            if(student_id){
                Dict['student_id']=student_id;
            }
            deleteComplaintAPI(Dict, function(data) {
                if (data && data.message == 'success') {
                    jAlert(getName('تم الحذف بنجاح|Delete Done', lang));
                    loadComplaintsTable(lang,student_id);
                } else {
                    jAlert(getName('حدث خطأ أثناء الحذف|Error during delete', lang));
                }
            });
        }
    );
}
function renderComplaintsTable(data, lang,student_id='') {
    var complaints_data = data.data || [];
    var str = '';

    if (complaints_data.length > 0) {
        str += '<caption>' + getName("الطلبات |The Requirements", lang) + '</caption>';
        str += '<thead>';
        str += '    <tr>';
        str += '        <th>#</th>';
        str += '        <th>' + getName("إسم المقرر|Course Name", lang) + '</th>';
        str += '        <th>' + getName("العام |Year", lang) + '</th>';
        str += '        <th>' + getName("الفصل | Semester", lang) + '</th>';
        str += '        <th>' + getName("ملاحظات الطالب |Student Notes", lang) + '</th>';
        str += '        <th>' + getName("ملاحظات الكنترول |Control Notes", lang) + '</th>';
        str += '        <th>' + getName("الحالة |Status", lang) + '</th>';
        str += '        <th>' + getName("الدرجة النهائية |Final Degree", lang) + '</th>';
        str += '        <th>' + getName("التقدير النهائي |Final Grade", lang) + '</th>';
        str += '        <th></th>';
        str += '    </tr>';
        str += '</thead>';
        str += '<tbody>';

        for (var x = 0; x < complaints_data.length; x++) {
            var row = complaints_data[x];
            var statusText = getName(map_status[row['status_id']] || row['status_id'], lang);

            str += '<tr>';
            str += '    <td>' + (parseInt(x) + 1) + '</td>';
            str += '    <td>' + getName(row['course_name'], lang) + '</td>';
            str += '    <td>' + getName(row['year_name'], lang) + '</td>';
            str += '    <td>' + getName(row['semester_name'], lang) + '</td>';
            str += '    <td style="text-align:right;">' + (row['student_notes'] || '') + '</td>';
            str += '    <td style="text-align:right;">' + (row['notes'] || '') + '</td>';
            str += '    <td><span class="status-' + row['status_id'] + '">' + statusText + '</span></td>';

            if (row['status_id'] == '5') {
                str += '    <td>' + (row['degree_after'] || '') + '</td>';
                str += '    <td>' + getName(row['grade_after'], lang) + '</td>';
            } else {
                str += '    <td>-</td>';
                str += '    <td>-</td>';
            }

            if (row['status_id'] == '1') {
str += `    <td><button class="btn-delete" onclick="deleteComplaintAction('${row["id"]}', '${lang}','${student_id}')"><img src="/static/images/Icons/del.png" alt="delete"></button></td>`;            } else {
                str += '    <td></td>';
            }

            str += '</tr>';
        }

        str += '</tbody>';
    } else {
        str = '<caption>' + getName("الطلبات |The Requirements", lang) + '</caption>';
        str += '<tr><td colspan="10" style="text-align:center; padding:30px; color:#999;">' + getName("لا توجد طلبات|No requests found", lang) + '</td></tr>';
    }

    return str;
}
function bindComplaintEvents(lang,student_id='') {
        $("#slcyearAcademic, #slcstuSemester").unbind('change');
    $("#slcyearAcademic, #slcstuSemester").bind('change', function() {
            AcademicYear = $("#slcyearAcademic").val();
            AcademicSemester = $("#slcstuSemester").val();
             params={
                "AcadYear": AcademicYear,
                "Semester": AcademicSemester,
                "exceptGrade": true
            };
            if(student_id){
                  params["StuID"] = student_id;
            }
            // تمرير params جديدة عند تغيير الـ select
            loadCourses(params);
            loadComplaintFee(lang,student_id);
        });

        // زر الحفظ
        $("#SaveRecheckSubject").unbind('click');
    $("#SaveRecheckSubject").bind('click', function(e) {
            e.preventDefault();
            saveComplaintAction(lang,student_id);
            return false;
        });
    }
function showComplaintMessage(message) {
    $("#message_complaint").html(message).show();

    // clearTimeout(window.complaintMessageTimeout);
    // window.complaintMessageTimeout = setTimeout(function() {
    //     $("#message_complaint").fadeOut(500);
    // }, 5000);
}
 function loadAcademicData(options) {

        var paramDict = {
            'ScopeID': ScopeID,
            'AppID': CurrAppID
        };

        getStudentAcademicDataAPI(paramDict, function(data) {
            if (data) {
                AcademicYear = data.AcadYear || '';
                AcademicSemester = data.Semester || '';

                // تعبئة الـ selects
                GetBasicattributes({
                    "item_id": "35.5.",
                    "limit": "7",
                    "order": "ids"
                }, AcademicYear, "slcyearAcademic");

                GetBasicattributes({
                    "item_id": "35.3."
                }, AcademicSemester, "slcstuSemester");

                // تنفيذ callback بعد تحميل البيانات
                if (options && typeof options.callback === 'function') {
                    options.callback();
                }
            }
        });
    }
   var WithdrawalAcademicYear = '';
var WithdrawalAcademicSemester = '';

// ====== خريطة حالات الانسحاب ======
var map_withdrawal_status = {
    '1': 'جديد|New',
    '2': 'مقبول|Accept',
    '3': 'مرفوض|Refuse',
    '4': 'قيد المراجعة|In Progress'
};
    function renderWithdrawalMainForm(lang) {
    var dir = (lang == "A") ? "rtl" : "ltr";

    var html = '';
    html += '<form id="withdrawal_form" dir="' + dir + '">';
    html += '    <header>';
    html += '        <h1>' + getName("طلب انسحاب من المقرر |Request to withdraw from the course", lang) + '</h1>';
    html += '        <h2 style="color: #c62828; margin-bottom: 6px;" id="message_withdrawal"></h2>';
    html += '    </header>';
    html += '    <table dir="' + dir + '" id="withdrawalTbl">';
    html += '        <tr>';
    html += '            <td>' + getName("أختر السنه|Select Year", lang) + ':</td>';
    html += '            <td><select style="width:100%;" class="required" id="slcyearAcademicWithdrawal" name="slcyearAcademicWithdrawal"></select></td>';
    html += '            <td>' + getName("اخترالفصل الدراسي|Select Semester", lang) + ':</td>';
    html += '            <td><select style="width:100%;" class="required" id="slcstuSemesterWithdrawal" name="slcstuSemesterWithdrawal"></select></td>';
    html += '        </tr>';
    html += '        <tr>';
    html += '            <td><span class="blockCrs">' + getName("اخترالماده|Select Course", lang) + ':</span></td>';
    html += '            <td colspan="3"><span class="blockCrs"><select style="width:100%;" id="slcstuCoursesWithdrawal" class="required" name="slcstuCoursesWithdrawal"></select></span></td>';
    html += '        </tr>';
    html += '        <tr>';
    html += '            <td colspan="4" style="text-align: center; padding-top: 15px;">';
    html += '                <button id="SaveWithdrawal" class="btn-save-withdrawal">' + getName("حفظ|Save", lang) + '</button>';
    html += '            </td>';
    html += '        </tr>';
    html += '    </table>';
    html += '</form>';
    html += '<div style="margin-top: 25px;"><table id="grid_withdrawal_data"></table></div>';

    return html;
}

function initWithDrawalPage(lang,student_id='',app_id=''){
      var html = renderWithdrawalMainForm(lang);
      if(student_id){
            $("#divContents").empty();
             $("#divContents").append(html);
      }
      else{
          $("#MainDiv").html(html);
      }


    loadWithdrawalAcademicData({
        callback: function() {
            var params = {
                "AcadYear": WithdrawalAcademicYear,
                "Semester": WithdrawalAcademicSemester,
                "withdrawApp": true
            };

            if (student_id) {
                params["StuID"] = student_id;
            }

            loadWithdrawalCourses(params, lang);
        }
    });

    loadWithdrawalsTable(lang, student_id);
    bindWithdrawalEvents(lang, student_id);

}
function loadWithdrawalAcademicData(options) {
    var paramDict = {
        'ScopeID': ScopeID,
        'AppID': CurrAppID
    };

    getStudentAcademicDataAPI(paramDict, function(data) {
        if (data) {
            WithdrawalAcademicYear = data.AcadYear || '';
            WithdrawalAcademicSemester = data.Semester || '';

            if (typeof GetBasicattributes === 'function') {
                GetBasicattributes({
                    "item_id": "35.5.",
                    "limit": "7",
                    "order": "ids"
                }, WithdrawalAcademicYear, "slcyearAcademicWithdrawal", true);

                GetBasicattributes({
                    "item_id": "35.3."
                }, WithdrawalAcademicSemester, "slcstuSemesterWithdrawal", false);
            }

            if (options && typeof options.callback === 'function') {
                options.callback();
            }
        }
    });
}
function loadWithdrawalCourses(params, lang) {
    var DictSearch = params || {
        "AcadYear": $("#slcyearAcademicWithdrawal").val(),
        "Semester": $("#slcstuSemesterWithdrawal").val(),
        "withdrawApp": true
    };

    getStudentCoursesAPI(DictSearch, function(data) {
        var str = "";
        if (data && data.length > 0) {
            str += "<option value=''>-----</option>";
            for (var i = 0; i < data.length; i++) {
                str += "<option value='" + data[i].crsID + "' crsN='" + data[i].crsName + "'>" + getName(data[i].crsName) + "</option>";
            }
        } else {
            str = "<option value=''>" + getName("لا توجد مقررات|No courses", lang || PortalLang) + "</option>";
        }
        $("#slcstuCoursesWithdrawal").html(str);
    });
}
function loadWithdrawalsTable(lang, student_id) {
    var paramDict = {};
    if (student_id) {
        paramDict['student_id'] = student_id;
    }

    getAllWithdrawalsAPI(paramDict, function(data) {
        var html = renderWithdrawalsTable(data, lang || PortalLang, student_id);
        $("#grid_withdrawal_data").html(html);
    });
}
function getAllWithdrawalsAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentWithdrawnCourses.WithdrawnCourses",
            param1: "get_all_courses_complaints",
            param2: JSON.stringify(paramDict || {})
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback({ data: [] });
        }
    });
}
function bindWithdrawalEvents(lang, student_id) {
    $("#slcyearAcademicWithdrawal, #slcstuSemesterWithdrawal").unbind('change');
    $("#slcyearAcademicWithdrawal, #slcstuSemesterWithdrawal").bind('change', function() {
        WithdrawalAcademicYear = $("#slcyearAcademicWithdrawal").val();
        WithdrawalAcademicSemester = $("#slcstuSemesterWithdrawal").val();

        var params = {
            "AcadYear": WithdrawalAcademicYear,
            "Semester": WithdrawalAcademicSemester,
            "withdrawApp": true
        };

        if (student_id) {
            params["StuID"] = student_id;
        }

        loadWithdrawalCourses(params, lang);
    });

    $("#SaveWithdrawal").unbind('click');
    $("#SaveWithdrawal").bind('click', function(e) {
        e.preventDefault();
        saveWithdrawalAction(lang || PortalLang, student_id);
        return false;
    });
}
function saveWithdrawalAction(lang, student_id) {
    if (!$("#withdrawal_form").valid()) {
        return;
    }

    var Dict = {
        'year_id': $("#slcyearAcademicWithdrawal").val(),
        'semester_id': $("#slcstuSemesterWithdrawal").val(),
        'course_id': $("#slcstuCoursesWithdrawal").val()
    };

    if (student_id) {
        Dict['student_id'] = student_id;
    }

    if (!Dict['course_id']) {
        showWithdrawalMessage(getName("برجاء اختيار المقرر|Please select a course", lang || PortalLang));
        return;
    }

    saveWithdrawalAPI(Dict, function(data) {
        if (data && !data.failed) {
            showWithdrawalMessage(getName(data.message || 'تم الحفظ بنجاح|Saved successfully', lang || PortalLang));
            $("#withdrawal_form")[0].reset();
            loadWithdrawalsTable(lang || PortalLang, student_id);
        } else {
            showWithdrawalMessage(getName(data ? data.message : 'حدث خطأ|Error occurred', lang || PortalLang));
        }
    });
}
function saveWithdrawalAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentWithdrawnCourses.WithdrawnCourses",
            param1: "save_withdrawn_courses",
            param2: JSON.stringify(paramDict)
        },
        beforeSend: function() {
            if (typeof $.blockUI === 'function') {
                $.blockUI({ message: '<h1>' + getName('يرجى الانتظار|Please wait') + '</h1>' });
            }
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        complete: function() {
            if (typeof $.unblockUI === 'function') {
                $.unblockUI();
            }
        },
        error: function() {
            if (callback) callback({ failed: true, message: 'error' });
        }
    });
}
function renderWithdrawalsTable(data, lang, student_id) {
    var withdrawals_data = data.data || [];
    var str = '';

    if (withdrawals_data.length > 0) {
        str += '<caption>' + getName("طلبات الانسحاب |Withdrawal Requests", lang) + '</caption>';
        str += '<thead>';
        str += '    <tr>';
        str += '        <th>#</th>';
        str += '        <th>' + getName("إسم المقرر|Course Name", lang) + '</th>';
        str += '        <th>' + getName("العام |Year", lang) + '</th>';
        str += '        <th>' + getName("الفصل | Semester", lang) + '</th>';
        str += '        <th>' + getName("ملاحظات |Notes", lang) + '</th>';
        str += '        <th>' + getName("الحالة |Status", lang) + '</th>';
        str += '        <th></th>';
        str += '    </tr>';
        str += '</thead>';
        str += '<tbody>';

        for (var x = 0; x < withdrawals_data.length; x++) {
            var row = withdrawals_data[x];
            var statusText = getName(map_withdrawal_status[row['status_id']] || row['status_id'], lang);

            str += '<tr>';
            str += '    <td>' + (parseInt(x) + 1) + '</td>';
            str += '    <td>' + getName(row['course_name'], lang) + '</td>';
            str += '    <td>' + getName(row['year_name'], lang) + '</td>';
            str += '    <td>' + getName(row['semester_name'], lang) + '</td>';
            str += '    <td style="text-align:right;">' + (row['notes'] || '') + '</td>';
            str += '    <td><span class="status-' + row['status_id'] + '">' + statusText + '</span></td>';

            if (row['status_id'] == '1') {
                str += `    <td><button class="btn-delete" onclick="deleteWithdrawalAction('${row["id"]}', '${student_id || ''}')"><img src="/static/images/Icons/del.png" alt="delete"></button></td>`;
            } else {
                str += '    <td></td>';
            }

            str += '</tr>';
        }

        str += '</tbody>';
    } else {
        str = '<caption>' + getName("طلبات الانسحاب |Withdrawal Requests", lang) + '</caption>';
        str += '<tr><td colspan="7" style="text-align:center; padding:30px; color:#999;">' + getName("لا توجد طلبات|No requests found", lang) + '</td></tr>';
    }

    return str;
}
function showWithdrawalMessage(message) {
    $("#message_withdrawal").html(message).show();
}
function deleteWithdrawalAction(itemId, student_id) {
    jConfirm(getName("هل انت متاكد من حذف الطلب ؟|Are you sure you want to delete this request?", PortalLang),
        getName("تأكيد الحذف|Confirm Delete", PortalLang),
        function(answer) {
            if (!answer) return false;

            var Dict = {
                'item_doc': itemId,
                'student_id': student_id
            };

            deleteWithdrawalAPI(Dict, function(data) {
                if (data && data.message == 'success') {
                    showWithdrawalMessage(getName('تم الحذف بنجاح|Delete Done', PortalLang));
                    loadWithdrawalsTable(PortalLang, student_id);
                } else {
                    showWithdrawalMessage(getName('حدث خطأ أثناء الحذف|Error during delete', PortalLang));
                }
            });
        }
    );
}
function deleteWithdrawalAPI(paramDict, callback) {
    $.ajax({
        url: "/getJCI",
        type: "post",
        cache: false,
        async: true,
        data: {
            param0: "StudentWithdrawnCourses.WithdrawnCourses",
            param1: "delete_withdrawn_course",
            param2: JSON.stringify(paramDict)
        },
        success: function(d) {
            var data = jQuery.parseJSON(d);
            if (callback) callback(data);
        },
        error: function() {
            if (callback) callback({ message: 'error' });
        }
    });
}
