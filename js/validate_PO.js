$(function(){

    document.addEventListener('DataPageReady', function (event) {

        var $container = $('.budget-sheet-items-container');
        var $divCont = $container.find('[id*="cbOuterAjaxCtnr"]:eq(1)');
        var $form = $divCont.find('#caspioform');
        var $resultTable = $form.find('[data-cb-name="cbTable"]');
        var $resultTr = $resultTable.find('tbody > tr'); 
        var $supplierBudgetMessageContainer = $divCont.find('.supplier-budget-message-container');
        
        $resultTr.each(function(index){
            var $supplierPriceCont = $(this).find('td:eq(4)');
            var supplierPrice = $supplierPriceCont.text();
            var $budgetQtyCont = $(this).find('td:eq(3)');
            var budgetQty = $budgetQtyCont.text();
            var $budgetValueCont = $(this).find('td:eq(5)');
            var budgetValue = $budgetValueCont.text();
            var poStatus = $(this).find('td:eq(6)').text();
            var cancelledPoStatus = $(this).find('td:eq(13)').text();
            var $editPrBtn = $(this).find('.edit');
            var $viewPrBtn = $(this).find('.view');
            var $cancelledPrBtn = $(this).find('.cancelled');
            var $inlineEditBtn = $(this).find('[data-cb-name="InlineEdit"]');
            var $inlineDeleteBtn = $(this).find('[data-cb-name="InlineDelete"]');
            var $parentTr = $(this).closest('tr');
            
            if (poStatus === 'Yes') {
                $inlineEditBtn.hide();
                $inlineDeleteBtn.hide();
                $supplierPriceCont.text('');
                $budgetValueCont.text('');
            } else {
                // disable PO button and highlight cells
                if (supplierPrice == 'R0.00' || budgetQty === '0') {          
                    $editPrBtn.attr('disabled', 'disabled');
                    $viewPrBtn.attr('disabled', 'disabled');
                    $editPrBtn.addClass("disabled");         
                    $viewPrBtn.addClass("disabled");         
                    $supplierBudgetMessageContainer.removeClass('d-none');

                    if (supplierPrice == 'R0.00') {
                        highlightCell($supplierPriceCont);
                    }

                    if (budgetQty === '0') {
                        highlightCell($budgetQtyCont);
                    }
                }
            }          

            if (cancelledPoStatus === 'Yes') {
                $cancelledPrBtn.removeClass('d-none');
                $editPrBtn.addClass('d-none');
                $viewPrBtn.addClass('d-none');
            } else if (poStatus === 'Yes') {
                $viewPrBtn.removeClass('d-none');
                $cancelledPrBtn.addClass('d-none');
                $editPrBtn.addClass('d-none');
            } else {
                $editPrBtn.removeClass('d-none');
                $cancelledPrBtn.addClass('d-none');
                $viewPrBtn.addClass('d-none');
            }

        });

        function highlightCell(element) {
            element.addClass('bg-lighter-red');
        }

        if (event.detail.appKey == '069580002812e8d493c94a0fa1b4') {
            var $container = $('#purchase-order-hidden-form');
            var $button = $container.find('[name="Mod0EditRecord"]');
            $button.click();
        }

    });

});