$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.finance-budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        
        $resultTr.each(function(index){
            var supplierPrice = $(this).find('td:eq(7)').text();
            var budgetQty = $(this).find('td:eq(6)').text();
            var $poBtn = $(this).find('[data-name="View Purchase Order"]');
            
            if (supplierPrice == '£0.00' || budgetQty === 0) {          
                $poBtn.attr('disabled', 'disabled');
            }
            
        });

    });

});