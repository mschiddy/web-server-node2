

$('#nav-item li a').click(function() {
		$(this).closest('li').addClass('active').siblings().removeClass('active');
});
