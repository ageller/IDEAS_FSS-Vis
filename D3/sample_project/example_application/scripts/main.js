requirejs.config({
    paths: {
        mod: './modules',
        d3: './libraries/d3.min'
    }
});
requirejs([
    'd3',
    'mod/datamanager',
    'mod/maincontroller',
    'mod/linegraph',
    'mod/networkgraph',
    'mod/bargraph'
],
function(d3, data_manager, main_controller, line_graph, network_graph, bar_graph) {

    var datamanager = data_manager();
    var controller = main_controller(); 

    controller.init(datamanager);

}
)
