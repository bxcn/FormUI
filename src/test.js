const formUI = formUI || {};
function a() {
	const jcheckbox = 'jcheckbox',

	jradio = 'jradio',

	child = $(this),

	isParent = child.parent( 'div.formUI' ).length;

	if ( isParent ) {
		return false;
	}
	const checked = child.prop( 'checked' );
	const active = checked ? 'active' : '';
	const label = child.data( 'label' );
	const type = child.attr( 'type' );
	const className = type == 'checkbox' ? jcheckbox : jradio;
	child.wrap(function ( i, input ) {
		return '<div></div>';
	} );
};
