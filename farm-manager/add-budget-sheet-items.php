<!DOCTYPE html>
<html lang="en">

	<head>
		<?php include '../partials/header.php'; ?>
		<title>Farm Manager: Budget</title>
	</head>

	<body id="page-top" class="sidebar-toggled">
		<div id="wrapper">
		<?php include '../partials/farm-manager-sidebar.php'; ?>

			<div id="content-wrapper" class="d-flex flex-column content-left-margin-136">
				<div id="content">
					<?php include '../partials/topbar.php'; ?>

					<!-- Begin Page Content -->
					<div class="container-fluid">

						<!-- Page Heading -->
						<div class="d-sm-flex align-items-center justify-content-between mb-4 page-header">
							<h1 class="h3 mb-0">Budget</h1>
						</div>

						<div class="row form-container">
							<div class="col-xl-12 col-lg-12">
								<div class="card shadow mb-4">
									<div class="card-body search-container budget-sheet-items-container">
										<script type="text/javascript" src="https://c2abz206.caspio.com/dp/069580002bff653938174248ba7c/emb"></script>
									</div>
									<div id="purchase-order-hidden-form" class="d-none">
										<!-- <script type="text/javascript" src="https://c6axa677.caspio.com/dp/dd22800093e6630f9f1447249dbf/emb"></script> -->
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<!-- End of Main Content -->
	</body>
	<?php include '../partials/footer.php'; ?>
	<?php include '../partials/modal.php'; ?>
	<script src="../js/validate_PO.js"></script>

</html>
