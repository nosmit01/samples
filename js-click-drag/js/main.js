	jsPlumb.ready(function() {
        //models will be replaced with AJAX calls


        //get right clicked node and use it throughout app
        var rightClickNode = ".obj";

        //get highest z-index of nodes
        var maxZ = Math.max.apply(null,$.map($('.node'), function(e,n){
                return parseInt($(e).css('z-index'))||1 ;
            })
        );

        $(".drag").draggable({
			opacity: 0.7, 
			helper: "clone",
			stop: function( event, ui ) {
                var self = $(this);
                var nodeID = ($(".obj:last").attr('id'));
                var nodeNum = (typeof nodeID === "undefined" ? 1 : parseInt(nodeID.match(/\d+/)) + 1);
                var nodeTop = parseInt(ui.position.top)-120;
                var newNodeID = self.data('type') + nodeNum;

                if(self.data('type') != "decision"){
                    var newNode = $('<div></div>');
                    var nodeHeader = $('<div class="nodeHeader"></div>');
                    var nodeBody = $('<div class="nodeBody"></div>');
                    var nodeFooter = $('<div class="nodeFooter" />');
                    var nodeMore = $('<span class="nodeMore">More</span>');
                    var nodeMeta = $('<div class="nodeMeta"></div>');
                    var nodeContent = {
                        "header":""
                    };

                    switch(self.data('type')) {
                        case "activity":
                            nodeContent.header = "Activity Node Header";
                            break;
                        case "process":
                            nodeContent.header = "Process Node Header";
                            break;
                        case "subactivity":
                            nodeContent.header = "Sub-Activity Node Header";
                            break;
                        case "task":
                            nodeContent.header = "Task Node Header";
                            break;
                    }
                    nodeHeader
                        .append(nodeContent.header)
                        .editable(function(value, settings) {
                            console.log(this);
                            console.log(value);
                            nodeContent.header = value;
                            console.log(settings);
                            return(value);
                        }, {
                            type    : 'text',
                            submit  : 'OK',
                            event   : 'dblclick'
                        });

                    nodeFooter
                        .append(nodeMore);

                    nodeMore
                        .on('click',function(){
                            var self = $(this).parents('.node');
                            var height = (self.height() > 130 ? self.height() : 130);
                            var width = (self.width() > 230 ? self.width() : 230);
                            self.find('.nodeMeta').css({'position':'relative', 'top':height-2+'px', 'width':width+'px'});
                            self.find('.nodeMeta').toggle( 'highlight', 500 );
                        });
                    nodeMeta
                        .append('Meta Content');

                    newNode
                        .attr({'style': 'top:'+nodeTop+'px;left:'+ui.position.left+'px;', 'id' : newNodeID})
                        .addClass("node")
                        .addClass("obj")
                        .append(nodeHeader, nodeBody, nodeFooter, nodeMeta)
                        .appendTo( $( ".stage" ) )
                        .resizable({
                            resize : function(event, ui) {
                                var height = (ui.size.height > 130 ? ui.size.height : 130);
                                var width = (ui.size.width > 230 ? ui.size.width : 230);
                                instance.repaint(ui.element);
                                ui.element.find('.nodeMeta').css({'position':'relative', 'top':height-2+'px', 'width':width+'px'});
                            }
                        })
                        .mousedown(function(e){
                            self = $(this);
                            //set node to highest z-index
                            self.css({'z-index': maxZ+1});
                            maxZ++;

                            //...then place endpoints and connectors back over nodes
                            instance.selectEndpoints({element:self}).each(function(connection) {
                                var connector = '#'+connection.id;
                                $(connection.endpoint.canvas).css({'z-index':maxZ})
                                maxZ++;
                                /*if(typeof connection.connections[0] !== "undefined"){
                                    $(connection.connections[0].canvas).css({'z-index':maxZ})
                                    maxZ++;
                                }*/
                            });

                            //...then check for right click and assign node value
                            if( e.button == 2 ) {
                                rightClickNode = $(this);
                            }
                        });
                    }else if(self.data('type') == "decision"){
                        var newDecisionNode = $('<div></div>');
                        newDecisionNode
                            .attr({'style': 'top:'+nodeTop+'px;left:'+ui.position.left+'px;', 'id' : newNodeID})
                            .addClass("decisionNode")
                            .addClass("obj")
                            .appendTo( $( ".stage" ) )
                            .mousedown(function(e){
                                self = $(this);
                                //set node to highest z-index
                                self.css({'z-index': maxZ+1});
                                maxZ++;

                                //...then place endpoints and connectors back over nodes
                                instance.selectEndpoints({element:self}).each(function(connection) {
                                    var connector = '#'+connection.id;
                                    $(connection.endpoint.canvas).css({'z-index':maxZ})
                                    maxZ++;
                                });

                                //...then check for right click and assign node value
                                if( e.button == 2 ) {
                                    rightClickNode = $(this);
                                }
                            });
                    }
				_addEndpoints(newNodeID, ["RightMiddle"], ["LeftMiddle"]);
				instance.draggable(jsPlumb.getSelector(".stage .obj"), { grid: [1, 1] });
			}
		});

        $('.nodeHeader').editable(function(value, settings) {
            console.log(this);
            console.log(value);
            console.log(settings);
            return(value);
        }, {
            type    : 'text',
            submit  : 'OK',
            event   : 'dblclick'
        });

        $('.nodeMore').on('click',function(){
            var self = $(this).parents('.node');
            var height = (self.height() > 130 ? self.height() : 130);
            var width = (self.width() > 230 ? self.width() : 230);
            self.find('.nodeMeta').css({'position':'relative', 'top':height-2+'px', 'width':width+'px'});
            self.find('.nodeMeta').toggle( 'highlight', 500 );
        });

        $('.node').resizable({
            resize : function(event, ui) {
                var height = (ui.size.height > 130 ? ui.size.height : 130);
                var width = (ui.size.width > 230 ? ui.size.width : 230);
                instance.repaint(ui.helper);
                ui.element.find('.nodeMeta').css({'position':'relative', 'top':height-2+'px', 'width':width+'px'});
            }
        }).mousedown(function(e){
            self = $(this);
            //set node to highest z-index
            self.css({'z-index': maxZ+1});
            maxZ++;

            //...then place endpoints and connectors back over nodes
            instance.selectEndpoints({element:self}).each(function(connection) {
                var connector = '#'+connection.id;
                $(connection.endpoint.canvas).css({'z-index':maxZ})
                maxZ++;
                /*if(typeof connection.connections[0] !== "undefined"){
                    $(connection.connections[0].canvas).css({'z-index':maxZ})
                    maxZ++;
                }*/
            });

            //...then check for right click and assign node value
            if( e.button == 2 ) {
                rightClickNode = $(this);
            }
        });

        $('#stage').contextMenu({
            selector: rightClickNode,
            autoHide: true,
            callback: function(key, options) {
                if(key == 'delete'){
                    if (confirm("Delete this node?")){
                        instance.removeAllEndpoints($(this).attr('id'));
                        $(this).remove();
                    }
                }
            },
            items: {
                "createSubProcess": {name: "Create Sub Process", icon: "color_swatch"},
                "removeSubProcess": {name: "Remove Sub Process", icon: "color_swatch", disabled: true},
                yesno: {name: "In Main Path", type: 'checkbox', selected: true},
                "sep1": "---------",
                name: {
                    name: "Node Color",
                    type: 'text',
                    events: {
                        keyup: function(e) {
                            window.console && console.log('key: '+ e.keyCode);
                        }
                    }
                },
                "delete": {name: "Delete Node", icon: "color_swatch"}
            },
            events: {show: function () {
                var currentColor = $(rightClickNode).find('.nodeHeader').css('background-color');
                $(".color-picker").spectrum("set", currentColor);
                }
            }
        });

        $(".color-picker").spectrum({
            color: "#E6E6E6",
            showInput: true,
            className: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxPaletteSize: 10,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            move: function (color) {

            },
            show: function () {

            },
            beforeShow: function () {

            },
            hide: function () {

            },
            change: function(color) {
                $(rightClickNode).find('.nodeHeader').css({'background-color':'#'+color.toHex()});
                $(".color-picker").hide();
                $(rightClickNode).contextMenu('hide');
            },
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                    "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                    "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                    "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                    "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                    "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                    "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                    "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                    "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                    "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                    "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                    "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ]
        });

		var instance = jsPlumb.getInstance({
			// default drag options
			DragOptions : { cursor: 'pointer', zIndex:2000 },
			// the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
			// case it returns the 'labelText' member that we set on each connection in the 'init' method below.
			ConnectionOverlays : [
				[ "PlainArrow", { width:10, length:10, location:1 } ],
				[ "Label", { 
					location:0.1,
					id:"label",
					cssClass:"aLabel"
				}]
			],
			Container:"stage"
		});		

		// this is the paint style for the connecting lines..
		var connectorPaintStyle = {
			lineWidth:2,
			strokeStyle:"#1f8eff",
			joinstyle:"round",
			outlineColor:"white",
			outlineWidth:1
		},
		// .. and this is the hover style. 
		connectorHoverStyle = {
			lineWidth:2,
			strokeStyle:"#216477",
			outlineWidth:1,
			outlineColor:"white"
		},
		endpointHoverStyle = {
			fillStyle:"#1f8eff",
			strokeStyle:"#1f8eff"
		},
		// the definition of source endpoints (the small blue ones)
		sourceEndpoint = {
			endpoint:"Dot",
			paintStyle:{ 
				strokeStyle:"#1f8eff",
				fillStyle:"transparent",
				radius:5,
				lineWidth:3 
			},				
			isSource:true,
			connector:[ "Flowchart", { stub:[10, 15], gap:10, cornerRadius:2, alwaysRespectStubs:true } ],
			connectorStyle:connectorPaintStyle,
			hoverPaintStyle:endpointHoverStyle,
			connectorHoverStyle:connectorHoverStyle,
            dragOptions:{},
            overlays:[
            	[ "Label", { 
                	location:[0, 0], 
                	label:"",
                	cssClass:"endpointSourceLabel" 
                } ]
            ]
		},		
		// the definition of target endpoints (will appear when the user drags a connection) 
		targetEndpoint = {
			endpoint:"Dot",					
			paintStyle:{ 
				strokeStyle:"#1f8eff",
				fillStyle:"transparent",
				radius:5,
				lineWidth:3 
			},
			hoverPaintStyle:endpointHoverStyle,
			maxConnections:-1,
			dropOptions:{ hoverClass:"hover", activeClass:"active" },
			isTarget:true,			
            overlays:[
            	[ "Label", { location:[0, 0], label:"", cssClass:"endpointTargetLabel" } ]
            ]
		},			
		init = function(connection) {			
			connection.getOverlay("label").setLabel(connection.sourceId.match(/\d+/) + "-" + connection.targetId.match(/\d+/));
			connection.bind("editCompleted", function(o) {
				if (typeof console != "undefined")
					console.log("connection edited. path is now ", o.path);
			});
		};			
		
		//allows us to add any input type
		var _addEndpoints = function(toId, sourceAnchors, targetAnchors) {
				for (var i = 0; i < sourceAnchors.length; i++) {
					var sourceUUID = toId + sourceAnchors[i];
					instance.addEndpoint(toId, sourceEndpoint, { anchor:sourceAnchors[i], uuid:sourceUUID });						
				}
				for (var j = 0; j < targetAnchors.length; j++) {
					var targetUUID = toId + targetAnchors[j];
					instance.addEndpoint(toId, targetEndpoint, { anchor:targetAnchors[j], uuid:targetUUID });						
				}
			};
			
		
		
		// suspend drawing and initialise.
		instance.doWhileSuspended(function() {
			
			//will pull in four workflows already created.
			_addEndpoints("activityNode4", ["RightMiddle"], ["LeftMiddle"]);			
			_addEndpoints("activityNode2", ["RightMiddle"], ["LeftMiddle"]);
			_addEndpoints("activityNode3", ["RightMiddle"], ["LeftMiddle"]);
			_addEndpoints("activityNode1", ["RightMiddle"], ["LeftMiddle"]);
						
			// listen for new connections; initialise them the same way we initialise the connections at startup.
			instance.bind("connection", function(connInfo, originalEvent) { 
				init(connInfo.connection);
			});			
						
			// make all the nodes draggable						
			// have to call this after each new node is added
			instance.draggable(jsPlumb.getSelector(".stage .node"), { scroll: true });

			// connect a few up nodes for testing
			instance.connect({uuids:["activityNode1RightMiddle", "activityNode2LeftMiddle"], editable:true});
			instance.connect({uuids:["activityNode2RightMiddle", "activityNode3LeftMiddle"], editable:true});
			instance.connect({uuids:["activityNode4RightMiddle", "activityNode3LeftMiddle"], editable:true});
			
	        
			//
			// listen for clicks on connections, and offer to delete connections on click. Just some tests
			//

            //listen for right-click and assign node to rightClickNode
            /*
             instance.bind('contextmenu', function(component, originalEvent) {
                 console.log('context menu on component ' + component.id);
                 //originalEvent.preventDefault();
             });


			instance.bind("click", function(conn, originalEvent) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
					jsPlumb.detach(conn); 
			});	
			
			instance.bind("connectionDrag", function(connection) {
				console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
			});		
			
			instance.bind("connectionDragStop", function(connection) {
				console.log("connection " + connection.id + " was dragged");
			});

			instance.bind("connectionMoved", function(params) {
				console.log("connection " + params.connection.id + " was moved");
			});
			*/
		});
		
	});