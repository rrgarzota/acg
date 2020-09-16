<!DOCTYPE html>
<html lang="en">

	<head>
		<?php include '../partials/header.php'; ?>
		<title>Finance: Dashboard</title>
	</head>

	<body id="page-top">
		<div id="wrapper">
		<?php include '../partials/finance-sidebar.php'; ?>

			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<?php include '../partials/topbar.php'; ?>

					<!-- Begin Page Content -->
					<div class="container-fluid">

						<!-- Page Heading -->
						<div class="d-sm-flex align-items-center justify-content-between mb-4 page-header">
							<h1 class="h3 mb-0">Dashboard</h1>
						</div>

						<div class="row">
							<div class="col-xl-12 col-lg-12">
								<div class="card shadow mb-4">
									<div class="card-header py-3 justify-content-between">
										<div class="row">
											<div class="col-md-12">
												<div class="cb-search-container text-right">
													<button class="btn btn-primary btn-sm page-add-btn"><a class="text-white text-decoration-none" href="add-user.php">Add</a></button>
												</div>
											</div>
										</div>
									</div>
									<div class="card-body search-container">
										<script type="text/javascript" src="https://c2abz206.caspio.com/dp/06958000d45870595b81452aa15d/emb"></script>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<!-- End of Main Content -->

		<style>
			iframe
			{
				width:100%;
			}

			.chart-container
			{
				height:440px;
			}
		</style>
	</body>
	<?php include '../partials/footer.php'; ?>

</html>
