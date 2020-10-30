var $loader = $('#section-loader');

function showLoader() {
    $loader.removeClass('d-none');
}

function closeLoader() {
    $loader.addClass('d-none');
}

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

function openModal( modalTitle, iframeSrc, type) {
    $('#cb-modal-title').html( modalTitle );
    $('#cb-modal-body').html('<iframe frameborder="0" width="100%" scrolling="yes" id="cb-modal-frame" src="' + iframeSrc + '"></iframe>');
    $('#cb-modal').find('.modal-dialog').addClass(type);
    $('#cb-modal-frame').on( 'load', function(e) {
        $('#cb-modal').modal();
    });

    $('#cb-modal').on('shown.bs.modal', function(e) {
        iframeLoaded('cb-modal-frame');        
    });
}

function closeModal(){
    if ($('#cb-modal').is(':visible')) {
        $('#cb-modal-title').html('');
        $('#cb-modal-body').html('');
        $('#cb-modal').modal('hide');
        closeLoader();
    }
}

function deploy_dp(containerID, appKey, param, title)
{
    document.getElementById(containerID).innerHTML = '';
    var $title = document.getElementById('cb-modal-title');


    var script = document.createElement('script');
    script.src = 'https://c2abz206.caspio.com/dp/' + appKey + '/emb' + param;

    var container = document.getElementById(containerID);

    if(container)
    {
        container.appendChild(script);
    }

    if ($title) {
        $title.innerHTML = '';
        $title.innerHTML = title;
    }
}

function open_pr_modal(params, module)
{
    $('#cb-modal').modal('show');
    
    if (module === 'edit-pr') {
        deploy_dp('cb-modal-body', '069580004231b370fad54d79b31d', '?' + params, 'Add Purchase Request');
    } else if (module === 'view-pr') {
        deploy_dp('cb-modal-body', '06958000126f0b6addd7484db1ee', '?' + params, 'Edit Purchase Request');
    } else if (module === 'cancelled-pr') {
        deploy_dp('cb-modal-body', '0695800019afc2e19317448c95af', '?' + params, 'View Purchase Request');
    } else if (module === 'add-pricelist') {
        deploy_dp('cb-modal-body', '06958000529ab5c5a611457497d8', '?' + params, 'Add Pricelist');
    } else if (module === 'edit-pricelist') {
        deploy_dp('cb-modal-body', '06958000da80908d5e284d3f8e2b', '?' + params, 'Edit Pricelist');
    } else if (module === 'bsi-add-pricelist-item') {
        deploy_dp('cb-modal-body', '06958000f1e3497b30fa4985b958', '?' + params, 'Add Pricelist');
    } else if (module === 'bsi-edit-pricelist-item') {
        deploy_dp('cb-modal-body', '06958000b3ac1ee10a30451ab10c', '?' + params, 'Edit Pricelist');
    } else if (module === 'bsi-view-pr') {
        deploy_dp('cb-modal-body', '0695800010a0e31cf66b42029599', '?' + params, 'View Purchase Request');
    } else if (module === 'bsi-cancelled-pr') {
        deploy_dp('cb-modal-body', '069580007a629ed35a494fb88adc', '?' + params, 'View Purchase Request');
    } else if (module === 'finance-bsi-view-pr') {
        deploy_dp('cb-modal-body', '069580006906596eb4744628a8ca', '?' + params, 'View Purchase Request');
    } else if (module === 'finance-bsi-cancelled-pr') {
        deploy_dp('cb-modal-body', '0695800071e58e1101804cab889f', '?' + params, 'View Purchase Request');
    }
}

function closeModalGeneral(){
    if ($('#cb-modal').is(':visible')) {
        $('#cb-modal-title').html('');
        $('#cb-modal-body').html('');
        $('#cb-modal').modal('hide');
        closeLoader();
    }
}

function cancelPR(){

    var $container = $('#cb-modal-body');
    var $form = $container.find('#caspioform');
    var $cancelBtn = $form.find('#btn-cancel');
    var $editBtn = $form.find('#btn-edit');
    var $cancelField = $form.find('input[name*="Purchase_Orders_Cancel"]'); 

    $cancelField.val('Yes');
    $editBtn.click();
    

}

function iframeLoaded(elementId){
    var $iframe = $('#'+ elementId ).length ? $('#'+ elementId ) : window.parent.$('#'+ elementId );
        var padding = 0;
            
        $iframe.css( 'height', '0px' );  
        var height = $iframe.get(0).contentWindow.document.body.scrollHeight + padding;
        $iframe.css( 'height', height + 'px' );
        closeLoader();
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
    
    closeLoader();

    if (event.detail.appKey == '069580001b4ba32005084908b953' || event.detail.appKey == '0695800060b09bd95dc641539d41') {
        resetSearch();
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
    $('#content-wrapper').removeClass('content-left-margin-192');
    } 
    else {
    $('#content-wrapper').addClass('content-left-margin-192');
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

function resetSearch(){
    var resetButton = $('.reset');
  
    resetButton.on('click', function(){
  
      var $search = $('.filter-btn');
      var $input = $('.cbFormTextField');
      var $select = $('.cbFormSelect');
  
      $input.val('');
      $select.val('');
      $search.click();
  
    });
  }

