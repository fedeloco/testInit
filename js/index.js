

var Notificaciones =  new Array();
var app = {

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    tokenHandler:function(msg) {
        console.log("Token Handler " + msg);
    },
    errorHandler:function(error) {
        console.log("Error Handler  " + error);
        alert("Errors: "+error);
    },
    successHandler: function(result) {
        alert('Success! Result = '+result)
    },
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"515684167197","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
    },
    onNotificationAPN: function(event) {
   
    },
    // Android
    onNotificationGCM: function(e) {
        
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                 
                    alert('registration id = '+e.regid);
					$.ajax({
						type: 'get',
						url: "http://federicoemiliani.com/gnix.com.ar/index.php?callback=?",
						async: false,
						jsonpCallback: 'jsonCallback',
						contentType: "application/json",
						dataType: 'jsonp',
						data : {"act":"doGuardarDatos","reg_id":e.regid,"dni":miDNI},
						success: function(json) {
						   alert("todo OK " + e.regid);
						},
						error: function(e) {
						 	alert("todo Mal");
						}
					});
					
                }
            break;

            case 'message':
              	// this is the actual push notification. its format depends on the data model
              	// of the intermediary push server which must also be reflected in GCMIntentService.java
		    	$("#Mensaje").html(e.message);
				$("#myPopUp").popup("open");
           		
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }

};
