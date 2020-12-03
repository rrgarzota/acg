<!DOCTYPE html>
<html lang="en">

	<head>
		<?php include '../partials/header.php'; ?>
		<title>Supplier: Price List</title>
	</head>

	<body id="page-top">
		<div id="wrapper">
		<?php include '../partials/supplier-sidebar.php'; ?>

			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<?php include '../partials/topbar.php'; ?>

					<!-- Begin Page Content -->
					<div class="container-fluid">

						<!-- Page Heading -->
						<div class="d-sm-flex align-items-center justify-content-between mb-4 page-header">
							<h1 class="h3 mb-0">Price List</h1>
						</div>

						<div class="row">
							<div class="col-xl-12 col-lg-12">
								<div class="card shadow mb-4">
									<div class="card-header text-right">
										<button class="btn btn-primary btn-sm page-add-btn" onclick="open_pr_modal('', 'add-pricelist')">Add</button>
									</div>
									<div class="card-body search-container">
										<script type="text/javascript" src="https://c2abz206.caspio.com/dp/06958000fde82d83224a4edba5d3/emb"></script>
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


</html>
