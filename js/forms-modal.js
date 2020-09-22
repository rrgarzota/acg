$(function(){

    document.addEventListener('DataPageReady', function (event) {

        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^^&#]*)').exec(window.location.href);
            if (results==null){
               return null;
            }
            else{
               return results[1] || 0;
            }
        }

        var $button = $('.form-modal');

        if (typeof($button) !== 'undefined') {
            $button.unbind().on('click', function(e){
                showLoader();
              
                var url = new URL(window.location.href);
                var search_params = url.searchParams;
                var params = search_params.toString(); //get the external parameters in the URL

                var modalName = $(this).data('name'); //Value is set in the button
                var modalContentFileName = $(this).data('filename');//value is set in the button
                var modalType = $(this).data('modal-type');//value is set in the button
                var modalInlineId = '';     
                var modalInlineSource = splitStringByDash(modalContentFileName);    
                // console.log(modalInlineSource);       return false;

                if (typeof params !== 'undefined' || typeof modalName !== 'undefined' || typeof modalContentFileName !== 'undefined' || typeof modalType !== 'undefined' ) {

                    if (typeof $(this).data('inline-id') !== 'undefined') {
                        var modalInlineId = $(this).data('inline-id');    
                        var inlineRecordID = '';

                        // switch(modalInlineSource){
                        //     case 'contact':
                        //         inlineRecordID = 'BSIID'
                        //         break;
                        //     default:
                        // }

                        params = params + '&' + modalInlineId;      
                    }

                    configureModalContent({
                        type: modalType,
                        title: modalName,
                        modalContentFileName: modalContentFileName,
                        params: params
                    });
            
                }
    
            });
        }
        document.addEventListener('BeforeFormSubmit', function(event) {
            showLoader();

        });


        document.addEventListener('FormSubmitted', function(event) {
            $(window).unbind().on('message onmessage', function(e) {
                // console.log(e);
                var data = e.originalEvent.data;
                if (data == 'refresh-search') {
                    // location.href = 'governing-bodies-contacts.php?RID='+$.urlParam('RID')+'&TN='+$.urlParam('TN');
                    // alert('contact submission');
                    var $filter = $('#filter-btn');
                    $filter.click();

                    closeModal();
                    closeLoader();
                    
                }
            })    
         });

         
        function splitStringByDash(string){
            var strSplit = string.split('-');
            return strSplit[1];
        }
        
        function configureModalContent(settings){
            // console.log('forms-modal');
            // console.log('asd');
            //         return false;
            var defaults = {
                type: '',
                title: '',
                modalContentFileName: '',
                params: ''
            }
            var options = $.extend({}, defaults, settings);

            openModal(options.title, options.modalContentFileName+'?'+options.params, options.type);

            
        }

    });

});