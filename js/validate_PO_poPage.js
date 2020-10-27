$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        
        $resultTr.each(function(index){
            var cancelledPoStatus = $(this).find('td:eq(6)').text();
            var $viewPrBtn = $(this).find('.view');
            var $cancelledPrBtn = $(this).find('.cancelled');
            var $parentTr = $(this).closest('tr');
            console.log(cancelledPoStatus);
            
            if (cancelledPoStatus === 'Yes') {
                $cancelledPrBtn.removeClass('d-none');
                $viewPrBtn.addClass('d-none');
            } else {
                $viewPrBtn.removeClass('d-none');
                $cancelledPrBtn.addClass('d-none');
            }

        });

    });

});