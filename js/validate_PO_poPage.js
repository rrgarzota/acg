$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        
        $resultTr.each(function(index){
            var cancelledPoStatus = $(this).find('td:eq(6)').text();
            var $poBtn = $(this).find('[data-name="Add Purchase Order"]');
            var $cancelledPoBtn = $(this).find('[data-name="View Purchase Order"]');
            var $parentTr = $(this).closest('tr');
            
            
            if (cancelledPoStatus === 'Yes') {
                $cancelledPoBtn.removeClass('d-none');
                $poBtn.addClass('d-none');
            } else {
                $poBtn.removeClass('d-none');
                $cancelledPoBtn.addClass('d-none');
            }

        });

    });

});