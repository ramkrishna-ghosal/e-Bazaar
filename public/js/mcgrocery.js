
//infinity scroll 
function iscroll(){   
    $container = $('.infinite-scroll');
    
    $container.infinitescroll('destroy');
    $container.data('infinitescroll', null);

    //reinstantiate the container
    $container.infinitescroll({                      
      state: {                                              
            isDestroyed: false,
            isDone: false                           
      }
    });    
    
    //call the methods you need on the container again.
     $container.infinitescroll({
            navSelector  : '.pagination',    // selector for the paged navigation
            nextSelector : '.next_page',  // selector for the NEXT link (to page 2)
            debug: false,
            itemSelector : '.slide',     // selector for all items you'll retrieve      
            loading: {
                finishedMsg: '<p class="show_more_products">No more products to load.</p>',
                img: '',
                msgText: '<p class="show_more_products"><img src="image/load.gif" alt="Loading" /> Loading more products...</p>',
              }
            }
      );
}//END of infinity scroll 

/* change color of category of selected sub category */
function selectCatfromleft(url) {
    var data_array = url.split("/");
    var catIndex = data_array.length - 2;
    $('.cat-name').each(function() {
        if (data_array[catIndex] == $(this).data("id") && data_array[catIndex] != '') {
            $(this).css('color', '#52b5a8');
            //$(this).css('font-weight','normal');
        } else {
            $(this).css('color', '');
            //	$(this).css('font-weight','');
        }
    });
}

displayForm = function(elementId) {
    var content = [];
    $('#' + elementId + ' input').each(function() {
        var el = $(this);
        if ((el.attr('type').toLowerCase() == 'radio'))
        {
            if (this.checked)
                content.push([
                    '"', el.attr('name'), '": ',
                    'value="', (this.value), '"',
                    (this.disabled ? ', disabled' : '')
                ].join(''));
        }
        else
            content.push([
                '"', el.attr('name'), '": ',
                (this.checked ? 'checked' : 'not checked'),
                (this.disabled ? ', disabled' : '')
            ].join(''));
    });
    alert(content.join('\n'));
}

changeStyle = function(skin)
{
    jQuery('#myform :checkbox').checkbox((skin ? {cls: skin} : {}));
}

/*======= 1 =======*/
checked = false;
function checkedAll(frm1) {
    var aa = document.getElementById('frm1');
    if (checked == false)
    {
        checked = true
    }
    else
    {
        checked = false
    }
    for (var i = 0; i < aa.elements.length; i++)
    {
        aa.elements[i].checked = checked;
    }
}

/*======= 2 =======*/
checked = false;
function checkedAll2(frm2) {
    var aa = document.getElementById('frm2');
    if (checked == false) {
        checked = true
    }
    else {
        checked = false
    }
    for (var i = 0; i < aa.elements.length; i++)
    {
        aa.elements[i].checked = checked;
    }
}

//======================= Slider =======================//
function customCheckbox(checkboxName) {
    var checkBox = $('input[name="' + checkboxName + '"]');
    $(checkBox).each(function() {
        $(this).wrap("<span class='custom-checkbox'></span>");
        //$(this).parents('.tag_option').addClass('custom-checkbox');
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });
    $(checkBox).click(function() {
        $(this).parent().toggleClass("selected");
    });

}

// filters start here
function filterscustomcheckboxes() {
    $(".multiple_tag, .grid_multiple_tag, .multiple_brand").multipleSelect({
        placeholder: "[select]",
        refresh: true
    });
    $(".price_filter").multipleSelect({
        placeholder: "[select]",
        single: true
    });
    customCheckbox("selectAllmultiple_tag");
    customCheckbox("selectItemmultiple_tag");

    customCheckbox("selectAllgrid_multiple_tag");
    customCheckbox("selectItemgrid_multiple_tag");

    customCheckbox("selectAllmultiple_brand");
    customCheckbox("selectItemmultiple_brand");

    //$('.multiple_brand .ms-select-all, .grid_multiple_tag .ms-select-all, .multiple_tag .ms-select-all').live('click', function(){
    $('.ms-select-all').live('click', function() {
        //var selectedclass = $(this).parents('.ms-parent').attr('class');
        if ($(this).find('span.custom-checkbox').hasClass('selected')) {
            $(this).siblings().find('span.custom-checkbox').addClass('selected');
        }
        else {
            $(this).siblings().find('span.custom-checkbox').removeClass('selected');
        }
    });

    $('.ms-parent ul').click(function() {
        var liselelen = $(this).find('li.selected').length;
        var liunselelen = $(this).find('li').length - 2;

        if (liunselelen == liselelen) {
            $(this).children('li.ms-select-all').find('span.custom-checkbox').addClass('selected');
        }
        else {
            $(this).children('li.ms-select-all').find('span.custom-checkbox').removeClass('selected');
        }
    });
}
// filters end here

$(document).ready(function() {

    $('.careername').focus();
   
    filterscustomcheckboxes();

    customCheckbox("special_offers");
    customCheckbox("iagree");
    customCheckbox("chk");
    customCheckbox("sup_exp_go");
    customCheckbox("sup_exp_cancel");

    selectCatfromleft(window.location.href);

    $(".lavaLamp").hover(function() {
        $(".selectboxit-options").css({"display": "none"});
    });

    $('#forgotpass').click(function() {
        $('input[name=forgotemail]').val($('input#login').val());
    });

    $("#changecity, #cityname").multipleSelect({
        single: true,
        refresh: true
    });

    $('#hs').hide();
    $('#prd').hover(function() {
        $('#hs').toggle();
    });
    $('#hs1').hide();
    $('#prd1').hover(function() {
        $('#hs1').toggle();
    });
    $('#hs2').hide();
    $('#prd2').hover(function() {
        $('#hs2').toggle();
    });
    $('#hs3').hide();
    $('#prd3').hover(function() {
        $('#hs3').toggle();
    });

    $('.bannerslider img.banner').each(function(k) {
        $(this).removeAttr('id');
    });

    $('aside#sticky').css({'visibility': 'visible'});

    $('.slider1').slick({
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 5,
        // cssEase: 'ease',
        // easing: 'ease',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    var triggers = $('ul.triggers li');
    var images = $('ul.images li');
    var lastElem = triggers.length - 1;
    var target;

    triggers.first().addClass('selected');
    images.hide().first().show();

    function sliderResponse(target) {
        images.fadeOut(300).eq(target).fadeIn(300);
        triggers.removeClass('selected').eq(target).addClass('selected');
    }

    triggers.mouseover(function() {
        if (!$(this).hasClass('selected')) {
            target = $(this).index();
            sliderResponse(target);
            resetTiming();
        }
    });

    $('.next').click(function() {
        target = $('ul.triggers li.active').index();
        target === lastElem ? target = 0 : target = target + 1;
        sliderResponse(target);
        resetTiming();
    });
    $('.prev').click(function() {
        target = $('ul.triggers li.selected').index();
        lastElem = triggers.length - 1;
        target === 0 ? target = lastElem : target = target - 1;
        sliderResponse(target);
        resetTiming();
    });

    function sliderTiming() {
        target = $('ul.triggers li.selected').index();
        target === lastElem ? target = 0 : target = target + 1;
        sliderResponse(target);
    }

    var timingRun = setInterval(function() {
        sliderTiming();
    }, 3000);

    function resetTiming() {
        clearInterval(timingRun);
        timingRun = setInterval(function() {
            sliderTiming();
        }, 3000);
    }

    $('.bannerContainer').live('mouseenter mousemove', function(event) {
        clearInterval(timingRun);
    });

    $('.bannerContainer').mouseleave(function() {
        resetTiming();
    });

    if ($('.topnav').length > 0) {
        $('.bannerContainer').css({'margin-top': '35px'});
        $('#sticky').css({'margin-top': '40px'});
        $('.page_data').css({'margin-top': '30px'});
    }
    else {
        $('.bannerContainer').css({'margin-top': '10px'});
        $('#sticky').css({'margin-top': '10px'});
        $('.page_data').css({'margin-top': '0px'});
    }


});

//=============== ajax url replace without reloading ================//
/**
 * Load css files
 */
loadCSS = function(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
};
/**
 * Load js files
 */
loadJS = function(src) {
    var jsLink = $("<script type='text/javascript' src='" + src + "'>");
    $("head").append(jsLink);
};

/** Common function in which the onclick url is passed, 
 * click type is passed and the first click is passed, using these 
 * parameters the jax contents are loaded
 **/
function click_ajax(url, click_type, first_click, subcat_flag) {
    if (!history.pushState || ($(window).width() < 480 && click_type == 'prod_click')) {
        window.location.href = url;
        return false;
    }
    if (document.URL == url && subcat_flag == 0)
        return false;

    var post_data = 1;
    var filter_flag = 0;
    if (subcat_flag == 1) {
        filter_flag = 1;
    }
    $.ajax({
        type: "POST",
        url: url,
        data: "url=" + post_data + "&filter_flag=" + filter_flag,
        beforeSend: function() {
            $('.products_filter').jpreLoader();
            if (click_type != 'prod_click') {
                if (subcat_flag == 1) {
                    $('.products_filter').jpreLoader();
                    $('.products_filter').html('');
                } else {
                    $('.page_data').jpreLoader();
                    $('.page_data').html('');
                }
            }
        },
        success: function(msg) {

            var check_json = 0;
            try {
                JSON.parse(msg);
            } catch (e) {
                check_json = 1;
            }
            if (check_json == 0) {
                var msg_parse = JSON.parse(msg);
                if (msg_parse.prod_not_found != '' && msg_parse.prod_not_found != undefined) {
                    window.location = url;
                    return false;
                }
            }

            /* History.pushstate changes the url of the browser */
            $('html, body').scrollTop(0);
            var stateObj = {id: "state"};
            history.pushState(stateObj, '', url);
            /*window.location = url;*/

            /* Check to replace html for filters */
            if (subcat_flag == 1) {                                
                $('.products_filter').html(msg);                
            } else {                
                $('.page_data').html(msg);
                $('title').html($('.products_filter').attr('data-title'));                
            }

            /* Check to call multiselect jquery */
            if ((subcat_flag == 0 && click_type == 'subcat_click') || click_type == 'tag_click') {
                filterscustomcheckboxes();
            }

            /* lazy load */
            $("img.lazy").lazyload({
                event: "lazyload", effect: "fadeIn", failure_limit: 10, skip_invisible: false,
                    error: function(self, settings) {
                        $(this).attr("src", $(this).attr('rel'));
                    }
                }
            ).trigger("lazyload");

            $("img.lazy").error(function() {
                $(this).unbind("error").attr("src", $(this).attr('rel'));
            });

            $(".prod_img").removeClass('lazy');

            //infinity scroll
            iscroll();

            $("#nav li ul").css({"visibility": ""});

            var call_from = 'after_ajax_call';
//            get_sku_count(call_from);

            $('#jpreOverlay').remove();
            
        }// END AJAX SUCCESS
    });
} // END FUNCTION

/*** Ajax contents load on click of subcategory in left nav ***/
var subcat_first_click = false;
$('.sub_cat').live('click', function(){
        var url = $(this).attr('data-href');

        if(!url) return;

        bindbanner = 1;
        click_ajax(url, click_type = 'subcat_click', subcat_first_click, 0);
        if(!subcat_first_click){
                subcat_first_click = true;
        }
        selectCatfromleft(url);
});

/*** Ajax contents load on click of green category ***/
var greencat_first_click = false;
$('.green_category').click(function() {
    var url = $(this).attr('href');
    click_ajax(url, click_type = 'green_cat_click', greencat_first_click, 0);
    if (!greencat_first_click) {
        greencat_first_click = true;
    }
});

/*** For on click ajax contents load on tags such as new and hot selling ***/
var tag_first_click = false;
$('.tag_click').click(function() {
    var url = $(this).attr('href');
    click_ajax(url, click_type = 'tag_click', tag_first_click, 0);
    if (!tag_first_click) {
        tag_first_click = true;
    }
});
//=================== slider and select box on ajax complete products ajax ===================//

$(document).ajaxComplete(function(event, request, settings) {
   // $(".reallyN, .reallyM, .reallyday, .reallymonth, .reallyyear, .reallyR, .cityR").selectBoxIt({});
    sortbyfilters();
});

var subcat_first_click1 = false;
function tags_filter() {
    var url = '';
    var stateObj = '';
    var amp_flag = '';
    var sort_val = '';
    var encoded_uri = '';
    var isCampaign = '';

    var tags_array = new Array();
    var tag_parameter = '';
    var tag_selected = '';
    var tag_selected1 = '';
    var brand_selected = '';
    var brand_parameter = '';

    var tag_option_count = $('.ms-parent .tag_option').length;
    var i = 1
    $('.ms-parent .tag_option').each(function() {
        if ($(this).hasClass("selected")) {
            tags_array.push($(this).find('input').val());
            if (i == tag_option_count) {
                tag_selected = 'All selected';
            } else if (i <= 3) {
                tag_selected += $(this).find('input').val() + ',';
            } else {
                tag_selected = i + ' of ' + tag_option_count + ' selected';
            }
            i++;
        }
    });

    var grid_tag_array = new Array();
    var gridtag_option_count = $('.ms-parent .grid_tag_option').length;
    var j = 1;
    $('.ms-parent .grid_tag_option').each(function() {
        if ($(this).hasClass("selected")) {
            grid_tag_array.push($(this).find('input').val());
            if (j == gridtag_option_count) {
                tag_selected1 = 'All selected';
            } else if (j <= 3) {
                tag_selected1 += $(this).find('input').val() + ',';
            } else {
                tag_selected1 = j + ' of ' + gridtag_option_count + ' selected';
            }
            j++;
        }
    });

    var brand_option_count = $('.ms-parent .brand_option').length;
    var k = 1;
    var brand_array = new Array();
    $('.ms-parent .brand_option').each(function() {
        if ($(this).hasClass("selected")) {
            brand_array.push($(this).find('input').val());            
            if (k == brand_option_count) {
                brand_selected = 'All selected';
            } else if (k <= 3) {
                brand_selected += $('#multiple_brand option[value="'+$(this).find('input').val()+'"]').html() + ',';
            } else {
                brand_selected = k + ' of ' + brand_option_count + ' selected';
            }
            k++;
        }
    });

    if (tag_selected1.slice(-1) == ',') {
        tag_selected1 = tag_selected1.substring(0, tag_selected1.length - 1);
    }
    if (tag_selected.slice(-1) == ',') {
        tag_selected = tag_selected.substring(0, tag_selected.length - 1);
    }
    if (brand_selected.slice(-1) == ',') {
        brand_selected = brand_selected.substring(0, brand_selected.length - 1);
    }

    $('.grid_multiple_tag button span:first').html((tag_selected1 != '') ? tag_selected1 : '[select]');
    $('.multiple_tag button span:first').html((tag_selected != '') ? tag_selected : '[select]');
    $('.multiple_brand button span:first').html((brand_selected != '') ? brand_selected : '[select]');

    if ($('.price_filter').val() != '') {
        sort_val = $(".price_filter").val() + amp_flag;
        amp_flag = '&';
    }

    if (brand_array.length != 0) {
        brand_parameter = '';
        
        for($i=0; $i < brand_array.length; $i++){
            brand_parameter += '&manufacturer_id[]='+brand_array[$i];
        }        
        amp_flag = '&';
    }

    if (tags_array.length != 0 || grid_tag_array.length != 0) {
        tag_parameter = '&filter_tag=' + encodeURIComponent(tags_array.join('|') + '|' + grid_tag_array.join('|')) + amp_flag;
        amp_flag = '&';
    }

    if (getParameterByName('isCampaign') != '') {
        isCampaign = '&isCampaign=' + getParameterByName('isCampaign') + amp_flag;
    }

    CATEGORY_URL = CATEGORY_URL.replace('&amp;','&');
    
    if (tags_array.length == 0 && grid_tag_array.length == 0 && brand_array.length == 0 && $('.price_filter').val() == '') {
        url = CATEGORY_URL + '&filtered=1';
       // var _url = url.split('?');//added by  
       // url = _url[0] + '?' + isCampaign;
    } else {
        url = CATEGORY_URL + isCampaign + tag_parameter + brand_parameter + sort_val + '&filtered=1';
    }
    
    var tags_data = '<label>Filters Applied : </label>';
    for (var i = 0; i < tags_array.length; i++) {
        if (tags_array.length != tag_option_count) {
            tags_data += '<span>' + tags_array[i] + '<a class="cls remove_tag" rel="' + tags_array[i] + '"></a></span>';
        }
    }
    for (var i = 0; i < grid_tag_array.length; i++) {
        if (grid_tag_array.length != gridtag_option_count) {
            tags_data += '<span>' + grid_tag_array[i] + '<a class="cls remove_tag" rel="' + grid_tag_array[i] + '"></a></span>';
        }
    }
    for (var j = 0; j < brand_array.length; j++) {
        if (brand_array.length != brand_option_count) {
            tags_data += '<span>' + $('#multiple_brand option[value="'+brand_array[j]+'"]').html() + '<a class="cls remove_tag" rel="' + brand_array[j] + '"></a></span>';
        }
    }

    $('.tagsapplied').html(tags_data);
    click_ajax(url, click_type = 'subcat_click', subcat_first_click1, 1);
    if (!subcat_first_click1) {
        subcat_first_click1 = true;
    }

}

$('.remove_tag').live('click', function() {
    var remove_this_tag = $(this).attr('rel');
    $('.ms-parent .tag_option').each(function() {
        if ($(this).find('input').val() == remove_this_tag) {
            $(this).removeClass('selected');
            $(this).find('span.custom-checkbox').removeClass('selected');
            $(this).find('input').prop('checked', false);
        }
    });

    $('.ms-parent .grid_tag_option').each(function() {
        if ($(this).find('input').val() == remove_this_tag) {
            $(this).removeClass('selected');
            $(this).find('span.custom-checkbox').removeClass('selected');
            $(this).find('input').prop('checked', false);
        }
    });

    $('.ms-parent .brand_option').each(function() {
        if ($(this).find('input').val() == remove_this_tag) {
            $(this).removeClass('selected');
            $(this).find('span.custom-checkbox').removeClass('selected');
            $(this).find('input').prop('checked', false);
        }
    });

    tags_filter();

});

if ($(window).width() > 666) {
    $('#sortBy').live('change', function() {
        tags_filter();
    });

    $('input[name="selectItemgrid_multiple_tag"], input[name="selectItemmultiple_tag"], input[name="selectAllmultiple_tag"], input[name="selectAllgrid_multiple_tag"], input[name="selectItemmultiple_brand"], input[name="selectAllmultiple_brand"]').live('click', function() {
        tags_filter();
    });

}
else {
    $('.filthd .apply').live('click', function() {
        tags_filter();
    });
}
/* End */