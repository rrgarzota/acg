$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.budget-sheet-items-container');
        var $form = $container.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        
        $resultTr.each(function(index){
            var supplierPrice = $(this).find('td:eq(7)').text();
            var budgetQty = $(this).find('td:eq(6)').text();
            var poStatus = $(this).find('td:eq(9)').text();
            var $poBtn = $(this).find('[data-name="Add Purchase Order"]');
            var $inlineEditBtn = $(this).find('[data-cb-name="InlineEdit"]');
            var $inlineDeleteBtn = $(this).find('[data-cb-name="InlineDelete"]');
            
            if (supplierPrice == '£0.00' || budgetQty === 0) {          
                $poBtn.attr('disabled', 'disabled');
            }
            
            if (poStatus === 'Yes') {
                $inlineEditBtn.hide();
                $inlineDeleteBtn.hide();
            }
        });

    });

});