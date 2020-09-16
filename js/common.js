// function - deploy DP in modal
function openLogModal( modalTitle, dataPageSrc ) {
    $( '#cb-modal-body' ).html( '' );
    var dataPageScript = document.createElement("script");
    dataPageScript.src = dataPageSrc;
    document.getElementById( 'cb-modal-body' ).appendChild( dataPageScript );

    $( '#cb-modal-title' ).html( modalTitle );
    $( '#cb-modal' ).modal({
        backdrop: 'static',
        keyboard: false
    });
}

function openModal( modalTitle, iframeSrc ) {
    $('#cb-modal-title').html( modalTitle );
    $('#cb-modal-body').html('<iframe frameborder="0" width="100%" scrolling="no" id="cb-modal-frame" src="' + iframeSrc + '"></iframe>');
    $('#cb-modal-frame').on( 'load', function() {
        //iframeLoaded( this.id );
    });  
    $('#cb-modal').modal();
}

function iframeLoaded(elementId){
    setTimeout( function() {
        var $iframe = $('#'+ elementId ).length ? $('#'+ elementId ) : window.parent.$('#'+ elementId );
        var padding = 0;
            
        $iframe.css( 'height', '0px' );  
        var height = $iframe.get(0).contentWindow.document.body.scrollHeight + padding;
        $iframe.css( 'height', height + 'px' );
    }, 2000 );
}

// function - get URL Vars
function getRawUrl()
{
    var url = window.location.href;

    if (url.indexOf('?')) {
        var urlSplit = url.split('?');

        return urlSplit[0];
    }

    return url;
}

var urlVars = getRawUrl();
setActiveNav();

// Add active class in sidenav
function setActiveNav () {
    var urlSegments = urlVars.split('/');
    var filename = urlSegments[urlSegments.length - 1];

    var $sidebar = $('.navbar-nav.sidebar');
    var $li = $sidebar.find('li.nav-item');
    var $link = $li.find('a[href="'+filename+'"]');

    var $parentLi = $link.closest($li);
    var $parentLink = $parentLi.children('a').addClass('active');
}

// hide default submit button row at the bottom of inline forms
document.addEventListener('DataPageReady', function (event) {
    $( '.cb-btn-reset' ).bind( 'click', function() {
        $( this ).closest( 'form' ).find( 'select, input[type="text"]' ).val( '' );
        $( this ).closest( 'form' ).find( 'input[type="submit"]' ).click();
    });

    // checkboxes to add/remove class to target
    $('input[role="cb-toggle-table"]').click(function() {
        var targetId = $(this).data('target');
        var className = $(this).data('class');

        if(this.checked){
        $('#' + targetId).addClass(className);
        } else {
        $('#' + targetId).removeClass(className);
        }
        
    });

    // --------- login Page ---------

    if (event.detail.appKey == '069580004c55c9b04a4d41eea797') {
        // Append back to login link in forgot password page
        appendBackToLogin();
    }
    
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
  
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };

function appendBackToLogin() {
    $("#link-anchor").remove()
    var back = document.createElement("a");
    back.innerHTML = "Back to login";
    back.classList.add("small");
    var r = getUrlParameter("r");
    var loginURL = '';

    switch(r){
        case 'fm':
            loginURL = 'farm-manager-login.php';
            break;
        case 'f':
            loginURL = 'finance-login.php';
            break;
        case 's':
            loginURL = 'supplier-login.php';
            break;
        default:
            
    }
    back.setAttribute("href", loginURL );
    $(".forgot-password-container").html(back);
}

function setModuleTitle(title)
{
$('#module-title').html(title);
}


$('#sidebarToggle').on('click', function() {
$('#content-wrapper').removeClass('content-left-margin-0');

if ($(window).width() >= 768) {
    if ($('#accordionSidebar').hasClass('toggled')) {
    $('#content-wrapper').addClass('content-left-margin-136');
    $('#content-wrapper').removeClass('content-left-margin-256');
    } 
    else {
    $('#content-wrapper').addClass('content-left-margin-256');
    $('#content-wrapper').removeClass('content-left-margin-136');
    }
} else {
}

});


$('#sidebarToggleTop').on('click', function() {
    toggleSideBar();
});

if ($(window).width() < 768) {
    $('#accordionSidebar').addClass('toggled');
    toggleSideBar();
}

function toggleSideBar() {
    if ($(window).width() < 768) {
        if ($('#accordionSidebar').hasClass('toggled')) {
            $('#content-wrapper').addClass('content-left-margin-0');
            $('#content-wrapper').removeClass('content-left-margin-136');
        } 
        else {
            $('#content-wrapper').addClass('content-left-margin-136');
            $('#content-wrapper').removeClass('content-left-margin-0');
        }
    }
}