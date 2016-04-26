$(function () {
    //NOTE: this script is for the school or dept specific faculty listing pages eg /copa/faculty-directory.aspx, NOT /our-faculty/index.aspx
	//from old level/js.faculty-law.js in Cascade
    var devUrl = "//chapmanfaculty.dev.breilabs.com",
        prodUrl = "//" + window.location.hostname,
        page = 0,
        resultsPerPage = 50,
        totalPages = 0,
        scope = (function () {

            if (window.sessionStorage) {
                switch (sessionStorage.scope) {
                    case "_faculty/full":
                        $("#fullTime").attr("checked", "checked");
                        break;
                    case "_faculty/all":
                        $("#showAll").attr("checked", "checked");
                        break;
                    case "_faculty/tenure":
                        $("#tenure").attr("checked", "checked");
                        break;
                    default:
                        break;
                }
            }

            var inputVal = $(".filter input:checked").val();

            switch (inputVal) {
                case "Tenure":
                    return "_faculty/tenure";
                case "Full Time":
                    return "full";
                case "All":
                    return "all";
                default:
                    return "_faculty/full";
            }

        })(),
        schoolFilter = (function () {
            var extensionStart = window.location.pathname.lastIndexOf("."),
                relativePath = window.location.pathname.substr(0, extensionStart).toLowerCase();

            switch (relativePath) {
                case "/business/faculty-research/faculty-directory".toLowerCase():
                    return "SBE";
                case "/ces/contact-us/faculty-directory".toLowerCase():
                    return "SOE";
                case "/copa/faculty-directory".toLowerCase():
                    return "COPA";
                case "/dodge/about/faculty-directory".toLowerCase():
                    return "CFMA";
                case "/law/law-faculty/index".toLowerCase():
                    return "SOL";
                case "/scst/about/faculty-directory".toLowerCase():
                    return "COS";
                case "/pharmacy/faculty-directory/index".toLowerCase():
                    return "SOP";   
                case "/crean/faculty-directory".toLowerCase():
                    return "CHBS";
                case "/wilkinson/about-wilkinson/faculty/faculty-directory".toLowerCase():
                    return "CHSS";
                default:
                    return "";
            }
        })(),
        departmentFilter = (function () {
            var extensionStart = window.location.pathname.lastIndexOf("."),
                relativePath = window.location.pathname.substr(0, extensionStart).toLowerCase();

            switch (relativePath) {                
                case "/research-and-institutions/economic-science-institute/about-us/faculty-directory".toLowerCase():
                    return "ESI";
                //case "/copa/music/faculty-directory".toLowerCase():
                //    return "MUSI";
                case "/copa/dance/faculty-directory".toLowerCase():
                    return "DANC";
                case "/copa/theatre/faculty-directory".toLowerCase():
                    return "THEA";
                case "/wilkinson/art/faculty-directory".toLowerCase():
                    return "ARTS";
                case "/wilkinson/communication-studies/faculty-directory".toLowerCase():
                    return "COMM";
                case "/wilkinson/english/faculty-directory/index".toLowerCase():
                    return "ENGL";
                case "/wilkinson/history/faculty-directory".toLowerCase():
                    return "HIST";
                case "/crean/academic-programs/undergraduate-programs/bs-health-sciences/faculty".toLowerCase():
                    return "HSCI";
                case "/wilkinson/languages/faculty-directory".toLowerCase():
                    return "LANG";
                //case "/crean/academic-programs/graduate-programs/ma-marriage-family/faculty-directory".toLowerCase():
                //    return "MFT";
                //case "/crean/academic-programs/graduate-programs/physician-assistant/faculty-directory".toLowerCase():
               //     return "PAS";
                case "/crean/academic-programs/graduate-programs/ma-marriage-family/faculty".toLowerCase():
                    return "MFT";
                case "/crean/academic-programs/graduate-programs/physician-assistant/faculty".toLowerCase():
                    return "PAS";
                //case "/scst/crean-school-health/physical-therapy/faculty-directory".toLowerCase():
                //    return "PHYS";
                case "/crean/academic-programs/graduate-programs/physical-therapy/faculty".toLowerCase():
                    return "PHYS";
                case "/crean/academic-programs/undergraduate-programs/ba-psychology/faculty".toLowerCase():
                    return "PSYC";
                case "/crean/academic-programs/undergraduate-programs/bs-kinesiology/faculty".toLowerCase():
                    return "KINE";
                case "/wilkinson/peace-studies/faculty-directory".toLowerCase():
                    return "PCST";
                case "/wilkinson/philosophy/faculty-directory".toLowerCase():
                    return "PHIL";
                case "/wilkinson/political-science/faculty-directory".toLowerCase():
                    return "POLI";
                case "/wilkinson/religious-studies/faculty/directory".toLowerCase():
                    return "RELI";
                case "/wilkinson/sociology/faculty-directory".toLowerCase():
                    return "SOCI";
                default:
                    return "";
            }
        })(),
        groupFilter = (function () {
            var extensionStart = window.location.pathname.lastIndexOf("."),
                relativePath = window.location.pathname.substr(0, extensionStart).toLowerCase();

            switch (relativePath) {
                case "/scst/crean-school-health/faculty-directory".toLowerCase():
                    return "SHLS";
                case "/scst/about/earth-environmental-sciences/faculty-directory".toLowerCase():
                    return "SESS";
                case "/scst/about/computational-sciences/faculty-directory".toLowerCase():
                    return "SOCS";
                case "/copa/music/faculty-directory".toLowerCase():
                    return "MUSI";
                default:
                    return "";
            }
        })(),
        keywords = "",
        facultyFeedUrl = function () {
            return prodUrl + "/" +
                   scope + "/" +
                   (keywords ? keywords + "/" : "") +
                   page + "/" +
                   resultsPerPage + "?" +
                   (schoolFilter ? ("school=" + schoolFilter + "&") : '') +
                   (departmentFilter ? ("dept=" + departmentFilter + "&") : '') +
                   (groupFilter ? ("facgroup=" + groupFilter + "&") : '') +
                   "callback=?";
        },
        populateResults = function () {
            //setting the sessionStorage.scope breaks app on some iPad minis. Remove for now
            //if (window.sessionStorage) {
            //    sessionStorage.scope = scope;
            //}

            $(".facultyList .facultyMember").addClass("old");
            $.getJSON(facultyFeedUrl(), function (data) {
                for (var i = 0; i < data.length; i++) {
                    var v_photo;
            		if (!data[i].ThumbnailPhoto) {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '/') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else {
						v_photo = data[i].ThumbnailPhoto;
					}
                    
                    //put each title on own line
    				var splitTitles = data[i].AdditionalTitles;
					if (splitTitles != '' && splitTitles != null) {
						splitTitles = splitTitles.replace(/;/gi, "
<br/>") + "
<br/>";					
					}
                    
                    var result = {
                        link: data[i].CascadePath ? '/our-faculty/' + data[i].CascadePath : '',
                        image: v_photo,
                        firstName: $.trim(data[i].FacFirstName),
                        lastName: $.trim(data[i].FacLastName),
                        name: $.trim(data[i].FacFullName),
                        title: data[i].Rank,
                        //additionalTitles: data[i].AdditionalTitles,
                        additionalTitles: splitTitles,
                        affiliation: (function () {
                            var affiliation = [];
    						var cntr = 0;
							var dept = '';
							var school = '';
							var prev_school = '';
							var prev_dept = '';
							var final_school_dept = '';							
							for (var j = 0; j < (data[i].Depts.length); j++) {
								cntr = cntr + 1;
								school = data[i].Depts[j].SchoolName ? data[i].Depts[j].SchoolName : '';
                                if (data[i].Depts[j].DisplayDeptName != '' && data[i].Depts[j].DisplayDeptName != 'Conservatory of Music') {
                                    dept = data[i].Depts[j].FacGroupName ? data[i].Depts[j].DisplayDeptName + ', ' + data[i].Depts[j].FacGroupName: data[i].Depts[j].DisplayDeptName;
                                }
								else {
                                     dept = data[i].Depts[j].FacGroupName ? data[i].Depts[j].FacGroupName : '';
                                }							                    
                                //
								if (cntr == 1) {
									prev_school = data[i].Depts[j].SchoolName ? data[i].Depts[j].SchoolName : '';
									prev_dept = dept;	 
								}
								else if (school == prev_school){
									if (prev_dept != '' && dept != '') {
										prev_dept = prev_dept + ', ' + dept;
									}
									else if (prev_dept != '') {
										prev_dept = prev_dept;
									}
									else   {
										prev_dept = dept;
									}								
								}
								else {
									if (prev_dept == '') {
										if (data[i].DeanFlag == 'Y') {
											final_school_dept = prev_school + ',
<em>Dean</em>';
										}
										else {
											final_school_dept = prev_school;	
										}
									}
									else {
										if (prev_school != '') {
                                            if (data[i].DeanFlag == 'Y') {
                                                final_school_dept = prev_school + "; " + prev_dept + ',
<em>Dean</em>';
                                            }
                                            else {
                                                final_school_dept = prev_school + "; " + prev_dept;
                                            }
												
										}
										else {
                                            if (data[i].DeanFlag == 'Y') {
                                                final_school_dept = prev_dept + ',
<em>Dean</em>';
                                            }
                                            else {
                                                final_school_dept = prev_dept;
                                            }
											
										}
									}
									
								affiliation.push(final_school_dept);
								prev_school = data[i].Depts[j].SchoolName ? data[i].Depts[j].SchoolName : '';
								prev_dept = dept;	
								}								
                            }					
							//one final output after last loop to get last "previous" variable:
							if (prev_dept == '') {
								if (data[i].DeanFlag == 'Y') 
                                {
									final_school_dept = prev_school + ', 
<em>Dean</em>';
								}
								else {
									final_school_dept = prev_school;	
								}
							}
							else {
								if (prev_school != '') {
                                    if (data[i].DeanFlag == 'Y') {
                                        final_school_dept = prev_school + '; ' + prev_dept + ', 
<em>Dean</em>';
                                    }
                                    else 
                                    {
                                        final_school_dept = prev_school + '; ' + prev_dept;
                                    }
										
								}
								else {
                                    if (data[i].DeanFlag == 'Y') 
                                    {
                                        final_school_dept = prev_dept + ', 
<em>Dean</em>';
                                    }
                                    else {
                                        final_school_dept = prev_dept;
                                    }
									
								}
							}
 							affiliation.push(final_school_dept);							
                            return affiliation.join('
<div class="spacer"></div>');
                        })(),
                        phone: data[i].OfficePhone,
                        email: data[i].ChapEmail,
                        specialty: (function () {
                                var spcl;
                                if (data[i].SpecialtyGrouping != 'none' && data[i].SpecialtyGrouping != '') {
                                    spcl = data[i].SpecialtyGrouping;
                                }
                                else {
                                    spcl = '';
                                }
                            return spcl;
                        })(),
                        id: data[i].DatatelId
                    }

                    $(".facultyList").append(formatResult(result));
                }
                if(data.length){
                    var rangeLower = (data[data.length - 1].CurrentPage * resultsPerPage) + 1,
                        rangeUpper = (data[data.length - 1].CurrentPage + 1) * data[data.length - 1].ResultsPerPage,
                        totalResults = data[data.length - 1].TotalResults;
                    
                    if (rangeUpper > totalResults) {
                        rangeUpper = totalResults;
                    }

                    $(".rangeLower").html(rangeLower);
                    $(".rangeUpper").html(rangeUpper);
                    $(".totalResults").html(totalResults);
                    totalPages = data[data.length - 1].TotalPages;
                    $(".pagingNavigation").show();
                }
                else{
                    $(".rangeLower").html(0);
                    $(".rangeUpper").html(0);
                    $(".totalResults").html(0);
                    totalPages = 0;
                    $(".pagingNavigation").hide();
                }

                $(".facultyList .facultyMember.old").remove();
            });
        };

    populateResults();

    $(".directorySearchButton").click(function (event) {
        
        keywords = $.trim($("#directorySearchBox").val());

        if(keywords){
            scope = scope.replace('_faculty/', '_facultysearch/');            
        }
        else{
            scope = scope.replace('_facultysearch/', '_faculty/');
        }

        page = 0;
        populateResults();

    });

    $('#directorySearchBox').keypress(function (event) {

        if (event.which == 13) {
            jQuery(this).blur();
            jQuery('.directorySearchButton').focus().click();
        }

    });

    $(".first").click(function () {
        page = 0;
        populateResults();
    });

    $(".previous").click(function () {
        (page === 0) ? page = 0 : page -= 1;
        populateResults();
    });

    $(".next").click(function () {
        (page === totalPages) ? page = totalPages : page += 1;
        populateResults();
    });

    $(".last").click(function () {
        page = totalPages;
        populateResults();
    });
    
    $("#showAll").bind("change", function () {
        scope = "_faculty/all";
    });
    
    $("#fulltime").bind("change", function () {
        scope = "_facultysearch/full";
    });
    $("#tenure").bind("change", function () {
        scope = "_facultysearch/tenure";
    });

    function formatResult(result) {

        var formattedResult =
            '
<div class="facultyMember" itemscope itemtype="http://schema.org/Person">' +
                (result.image ? '
    <div class="profilePicture">
        <img width="80px" src="' + result.image + '" itemprop="image">
        </div>' : '') +
                (result.name ? '
        <h2 class="name" itemprop="name">' + (result.link ? ('
            <a href="' + result.link) + '">' + result.name + '</a>' : result.name) + '
        </h2>' : '') +
                (result.title ? '
        <div class="title" itemprop="jobTitle">' + result.title + '</div>' : '') +
                (result.additionalTitles ? '
        <div class="additionalTitles" itemprop="jobTitle">' + result.additionalTitles + '</div>' : '') +
                (result.specialty ? '
        <div class="specialty" itemprop="specialty">' + result.specialty + '</div>' : '') +
                (result.affiliation ? '
        <div class="affiliation" itemprop="affiliation">' + result.affiliation + '</div>' : '') +                
                //(result.phone ? '
        <div class="phone" itemprop="telephone">' + result.phone + '</div>' : '') +
                (result.email ? '
        <div class="email" itemprop="email">
            <a href="mailto:' + result.email + '">' + result.email + '</a>
        </div>' : '') +
                //(result.link ? '
        <a class="bio" href="' + result.link + '" itemprop="url">View Profile &raquo;</a>' : '') +
            '
    </div>';

        return formattedResult;
    }
});