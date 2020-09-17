sap.ui.define([], function () {
	"use strict";

	return {
		handleGender: function (oEvt) {
			if (oEvt === 'GKP') {
				oEvt = 'Gorakhpur';

			}
			 else if (oEvt === 'CNB') {
				oEvt = 'Kanpur';

			}
			else if (oEvt === 'LKO') {
				oEvt = 'Lucknow';

			};
			return oEvt;

		}
		
	};
});