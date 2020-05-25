// Global Variables
var bar_height = '30px';
var days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
var player_names = ['Player 1', 'Player 2', 'Player 3'];
var scroll = 0;
var cur_section = 'bar';

var scroll_speed = 1.75;
var fade_speed = 0.5;
var offset_y = 30;

$(document).keydown(function(e) {
    
    if (e.keyCode == 39) { // down arrow

        scroll++;
        
        if (cur_section == 'bar') {
            if (scroll == 1) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#money', offsetY: offset_y }, ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                
                TweenLite.to($('#money'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#messages'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#damage'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
            }  
            if (scroll == 2) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#messages', offsetY: offset_y }, ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                  
                TweenLite.to($('#money'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#messages'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#damage'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
            }        
            if (scroll == 3) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#damage', offsetY: offset_y }, ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                  
                TweenLite.to($('#money'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#messages'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#damage'), fade_speed, { opacity: 1, ease: Power2.easeOut });            
            } 
            if (scroll > 3) {
                TweenLite.to(window, scroll_speed, { scrollTo:'html', ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 1, ease: Power2.easeOut });                  
                TweenLite.to($('#money'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#messages'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#damage'), fade_speed, { opacity: 1, ease: Power2.easeOut });            
                scroll = 0;
            }
        }
        
        if (cur_section == 'week') {
             if (scroll == 1) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#money-dates', offsetY: offset_y }, ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                  
                TweenLite.to($('#money-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#messages-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#damage-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
            }  
            if (scroll == 2) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#messages-dates', offsetY: offset_y }, ease: Power2.easeOut }); 
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                  
                TweenLite.to($('#money-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#messages-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#damage-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
            }        
            if (scroll == 3) {
                TweenLite.to(window, scroll_speed, { scrollTo: { y: '#damage-dates', offsetY: offset_y }, ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });                  
                TweenLite.to($('#money-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#messages-dates'), fade_speed, { opacity: 0.25, ease: Power2.easeOut });
                TweenLite.to($('#damage-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });            
            } 
            if (scroll > 3) {
                TweenLite.to(window, scroll_speed, { scrollTo:'html', ease: Power2.easeOut });
                TweenLite.to($('#header'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#nav'), fade_speed, { opacity: 1, ease: Power2.easeOut });                  
                TweenLite.to($('#money-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#messages-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
                TweenLite.to($('#damage-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });            
                scroll = 0;
            }
        }
        
        
    } // end down arrow key press
    
    if (e.keyCode == 37) { // up arrow
        scroll = 0;
        TweenLite.to(window, 0.5, { scrollTo:'html', ease: Power2.easeOut });
        TweenLite.to($('#header'), fade_speed, { opacity: 1, ease: Power2.easeOut });
        TweenLite.to($('#nav'), fade_speed, { opacity: 1, ease: Power2.easeOut });          
        TweenLite.to($('#money'), fade_speed, { opacity: 1 });
        TweenLite.to($('#messages'), fade_speed, { opacity: 1 });
        TweenLite.to($('#damage'), fade_speed, { opacity: 1 });
        TweenLite.to($('#money-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
        TweenLite.to($('#messages-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });
        TweenLite.to($('#damage-dates'), fade_speed, { opacity: 1, ease: Power2.easeOut });          
    }
});




// function test() {
//     console.log('test');
//     TweenLite.to(window, 1, { scrollTo:"#money" });
// }

// setTimeout(test, 1000);

// delayer
function get_delay(i) {
    var delay_multiplier = 2;
    var delay_start = 500;
    return delay_start + (i * delay_multiplier);
}



function bar() {
    if (cur_section != 'bar') {
        clear();
        money();
        messages();
        damage();
        cur_section = 'bar';
        scroll = 0;
    }
}

function week() {
    if (cur_section != 'week') {
        clear();
        money_dates();
        messages_dates();
        damage_dates();
        cur_section = 'week';
        scroll = 0;        
    }
}

function clear() {
    d3.selectAll('*').interrupt();
    d3.selectAll('*').transition();
    d3.select('#main').selectAll('*').remove();
    d3.select('#money').selectAll('*').remove();    
    $('#main').empty();
    $('#money').empty();
    $('#main .div').empty();
    $('#main .div').remove();
}

function tooltips() {
    new Tippy('.tippy', {
        theme: 'aion',
        position: 'top',
        animation: 'fade',
        duration: 0,
        arrowSize: 'small',
        arrow: true
    });
}

function circletips() {
    new Tippy('svg circle', {
        theme: 'aion',
        position: 'top',
        animation: 'fade',
        duration: 0,
        arrowSize: 'small',
        arrow: true
    });
}

function mouse_over() {
    var color = d3.color(d3.select(this).attr('hover-color')).darker(2);
    d3.select(this)
        .transition()
        .duration(0)
        .style('background', color)
        .style('fill', color);
}

function mouse_out() {
    var color = d3.color(d3.select(this).attr('hover-color'));
    d3.select(this)
        .transition()
        .duration(0)
        .style('background', color)
        .style('fill', color);
}

// =======
//  Money 
// =======

function money() {
    
    // colour codings
    var c_scheme = ['#00796B', '#00796B'];
    
    // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'money')
        .append('div')
            .attr('class', 'section title')
            .html('In-Game Money Transactions');
    
    $.get('/money', function(d) {

        // // holder for max value
        var max = [];
        
        for (var i = 0; i < d.length; i++) {
            max.push(d[i].earnings_total);
            max.push(d[i].spendings_total)            
        }

        max = _.max(max);
        
        for (var i = 0; i < d.length; i++) {

            var id = String('.p' + (i + 1));

            var earnings = d[i].earnings;
            var spendings = d[i].spendings;

            var earnings_total = d[i].earnings_total;
            var spendings_total = d[i].spendings_total;

            var earnings_highest = d[i].earnings_highest;
            var earnings_lowest = d[i].earnings_lowest;
            
            // // push spent and earned variables to each array (what about timescale?)
            // for (var k = 0; k < players[i].length; k++) {
            //     players[i][k].money_earned ? earnings.push(players[i][k].money_earned) : spendings.push(players[i][k].money_spent);
            // }
        
            // set scales
            var earnings_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960]);
                .range([1, 960 - (earnings.length * 2) + 1]);
    
            var spendings_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960]);
                .range([1, 960 - (spendings.length * 2) + 1]);        
            
            // append visualisation
            d3.select('#money')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
            
            // earnings
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor earnings')
                    .html('Earned ' + delimit(earnings_total) + ' Kinah' + ' (' + rmt(earnings_total) + ')');
    
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph earnings')
                .selectAll('div')
                    .data(earnings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { 
                        return delimit(d) + ' Kinah' + ' (' + rmt(d) + ')'; })
                    .attr('hover-color', c_scheme[0])
                    .style('background-color', c_scheme[0])
                    .style('opacity', 1)                     
                    .style('height', '0px')
                    // .style('width', '0px')
                    .style('width', function(d) { return earnings_scale(d) + 'px'; })                        
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return 200 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height);
                    // .style('width', function(d) { return earnings_scale(d) + 'px' } )                       
                    // .style('opacity', 1);
            
            // spendings
            d3.select('#money ' + id)
                .append('div')
                .attr('class', 'graph-descriptor spendings')
                .html('Spent: ' + delimit(spendings_total) + ' Kinah' + ' (' + rmt(spendings_total) + ')');
    
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'graph spendings')  
                .selectAll('div')
                    .data(spendings)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return delimit(d) + ' Kinah' + ' (' + rmt(d) + ')' })
                    .attr('hover-color', c_scheme[1])
                    .style('background-color', c_scheme[1])
                    .style('opacity', 1)        
                    .style('height', '0px')
                    .style('width', function(d) { return spendings_scale(d) + 'px'; } )                    
                    .on('mouseover', mouse_over)
                    .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return 200 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height);
                    // .style('opacity', 1);
            
            // console.log(earnings.length);
            // report
            d3.select('#money ' + id)
                .append('div')
                    .attr('class', 'report')
                    // .style('background-color', 'black')
                    // .style('height', '100px')
                    .html(player_names[i] + ' earned ' + rmt(earnings_total) + ' and spent ' + rmt(earnings_total) + ' worth of In-Game Money Transactions based on Real Money Trading (RMT) exchange rates.');         
                    
            d3.selectAll('.graph.earnings')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');
            
            d3.selectAll('.graph.spendings')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');        
       
        } // end loop

        d3.select('#money')
            .append('div')
            .attr('class', 'spacer');
            
        tooltips();
        
    }); // end get request

}


// ==========
//  Messages
// ==========

function messages() {

   // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'messages')
        .append('div')
            .attr('class', 'section title')
            .html('Private Messages');
    
    $.get('/messages', function(players) {

        // Player 1
        // whisper_tos[0] = [friend, total_words]
        //                  [friend, total_words]
        //                  [friend, total_words] ...
        
        // Player 2
        // whisper_tos[1] = [friend, total_words]
        //                  [friend, total_words]
        //                  [friend, total_words] ...
    
        // holder for to and from whisper lists
        var whisper_tos = [];
        var whisper_froms = [];
        
        // holders for total values
        var total_tos = 0;
        var total_froms = 0;
        var totals = 0;

        // colour codings
        var c_scheme = ['#0D47A1', '#0D47A1'];
        
        // holder for max value
        var max = 0;
        
        // loop thru all 3 players and organise into incoming and outgoing
        for (var i = 0; i < players.length; i++) {
            
            var to_list = [];
            var from_list = [];

            // loop thru all the friends of each player
            for (var k = 0; k < players[i].length; k++) {
   
                if (players[i][k]._id.to != false) {
                    // push friend and total words into array
                    to_list.push([players[i][k]._id.to, sum(players[i][k].whisper_length)]);
                }
               
                if (players[i][k]._id.from != false) {
                    // push friend and total words into array
                    from_list.push([players[i][k]._id.from, sum(players[i][k].whisper_length)]);
                }
            }

            to_list = _.sortBy(to_list, 1).reverse();
            from_list = _.sortBy(from_list, 1).reverse();            
            
            whisper_tos[i] = to_list;
            whisper_froms[i] = from_list;
            
            // if player == to nothing (e.g. vin -.-) 
            if (players[i] == '') {
                 // set the whisper stuff to []
                whisper_tos[i] = whisper_froms[i] = [];
            }
            
        } // end of loop
        
        total_tos = sum(whisper_tos[0], 1);
        total_froms = sum(whisper_froms[0], 1);
        totals = [total_tos, total_froms];

        // assign highest value - for use on scaleLinear
        // max = get_max(totals);
        max = 7641;

        // console.log(whisper_tos);
        // console.log(whisper_froms);

        // loop to populate visualisation
        for (var i = 0; i < players.length; i++) {
            
            var id = String('.p' + (i + 1));
        
            var tos_scale = d3.scaleLinear()
                .domain([0, max])
                .range([1, 960 - (whisper_tos[i].length * 2) + 1]);
    
            var froms_scale = d3.scaleLinear()
                .domain([0, max])
                .range([1, 960 - (whisper_froms[i].length * 2) + 1]);  

            // append visualisation
            d3.select('#messages')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));

           // whisper tos
            d3.select('#messages ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor outgoing')
                    .html('Outgoing (' + sum(whisper_tos[i], 1) + ' words / ' + whisper_tos[i].length + ' players)');
           
            d3.select('#messages ' + id)
                .append('div')
                    .attr('class', 'graph outgoing')
                .selectAll('div')
                    .data(whisper_tos[i])
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return d[0] + ' (' + d[1] + ' words)' })
                    .attr('hover-color', c_scheme[0])
                    .style('height', '0px')                    
                    .style('background-color', c_scheme[0])
                    .style('width', function(d) { return tos_scale(d[1]) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    .style('opacity', 1);

           // whisper froms
            d3.select('#messages ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor incoming')
                    .html('Incoming (' + sum(whisper_froms[i], 1) + ' words / ' + whisper_froms[i].length + ' players)');
           
            d3.select('#messages ' + id)
                .append('div')
                    .attr('class', 'graph incoming')
                .selectAll('div')
                    .data(whisper_froms[i])
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d) { return d[0] + ' (' + d[1] + ' words)' })
                    .attr('hover-color', c_scheme[1])
                    .style('height', '0px')                        
                    .style('background-color', c_scheme[1])
                    .style('width', function(d) { return froms_scale(d[1]) + 'px' })
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    .style('opacity', 1);

            d3.select('#messages ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' sent a total of ' + sum(whisper_tos[i], 1) + ' words to ' + whisper_tos[i].length + ' player characters, and received a total of ' + sum(whisper_froms[i], 1) + ' words from '+ whisper_froms[i].length + ' player characters.');         
  
             d3.selectAll('.graph.outgoing')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');
            
            d3.selectAll('.graph.incoming')
                .style('width', '0px')
                .transition()
                    .duration(750)
                    .delay(0)
                    .style('width', '960px');    
        
            
        } // end loop

        d3.select('#messages')
            .append('div')
            .attr('class', 'spacer');
            
        tooltips(); 
    });
}

// ======
// Damage
// ======

function damage() {

    // define variables
    var c_scheme = ['#EF5350', '#EF5350'];
    var dmg_inflicted = [];
    var dmg_received = [];
    var dmg_totals = [];
    
    // holder for max value
    var max = 0;
    
    var num_conns = 0;
    var max_conns = 3;
    
    $.get('/dmg_inflicted', function(d) {
        dmg_inflicted = d;
        num_conns++;
        if (num_conns == max_conns) populate();
    });
    
    $.get('/dmg_received', function(d) {
        dmg_received = d;
        num_conns++;
        if (num_conns == max_conns) populate();
    });
    
    $.get('/dmg_totals', function(d) {
        dmg_totals = d;
        num_conns++;
        if (num_conns == max_conns) populate();
    });
    
    
   // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'damage')
        .append('div')
            .attr('class', 'section title')
            .html('Skills and Damage');

    function populate() {
    
        // set max value
        for (var i = 0; i < dmg_totals.length; i++) {
            if (max < dmg_totals[i].inflicted.total) {
                max = dmg_totals[i].inflicted.total; 
            }
            if (max < dmg_totals[i].received.total) {
                max = dmg_totals[i].received.total; 
            }
        }
        
        // console.log(dmg_inflicted);
        // console.log(max);
        
        // console.log(dmg_totals);

        for (var i = 0; i < dmg_totals.length; i++) {
                
            // get player id
            var id = String('.p' + (i + 1));
                
            var inflicted_graph_data = [];
            var received_graph_data = [];
        
            // prepare graph data
            for (var k = 0; k < dmg_inflicted[i].length; k++) {
                inflicted_graph_data.push(dmg_inflicted[i][k].dmg);
            }
            
            // prepare graph data
            for (var k = 0; k < dmg_received[i].length; k++) {
                received_graph_data.push(dmg_received[i][k].dmg);
            }

            // set scales
            var inflicted_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960]);
                .range([1, 960 - (inflicted_graph_data.length * 2) + 1]);

            var received_scale = d3.scaleLinear()
                .domain([0, max])
                // .range([1, 960]);       
                .range([1, 960 - (received_graph_data.length * 2) + 1]);            
        
            d3.select('#damage')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
         
            // inflicted
            d3.select('#damage ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor inflicted')
                    .html('Total Damage Inflicted: ' + delimit(dmg_totals[i].inflicted.total) + ' / Overall Crit Rate: ' + ((dmg_totals[i].inflicted.crits / dmg_totals[i].inflicted.count) * 100).toFixed(2) + '%');
            
            d3.select('#damage ' + id)
                .append('div')
                    .attr('class', 'graph inflicted')
                .selectAll('div')
                    .data(inflicted_graph_data)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d, j) { 
                        
                        var inflicted = dmg_inflicted[i][j];
                        
                        if (inflicted._id == false) {
                            var skill = 'Auto-Attack / Other'
                        } else {
                            var skill = inflicted._id;
                        }
                        
                        var dmg = delimit(inflicted.dmg);
                        var c_rate = ((inflicted.crits / inflicted.count) * 100).toFixed(2);
                        var html = 
                            skill + 
                            '<br />' + 
                            'Total Damage: ' + dmg + 
                            '<br />' + 
                            'Crit Rate: ' + c_rate + '%';
                            
                        return html;
                        
                    })
                    .attr('hover-color', c_scheme[0])
                    .style('height', '0px')                      
                    .style('background-color', c_scheme[0])
                    .style('opacity', 1)                     
                    .style('width', function(d) { return inflicted_scale(d) + 'px' } )                        
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    .style('opacity', 1);                
            
            // received
            d3.select('#damage ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor received')
                    .html('Total Damage Received: ' + delimit(dmg_totals[i].received.total) + ' / Overall Crit Rate: ' + ((dmg_totals[i].received.crits / dmg_totals[i].received.count) * 100).toFixed(2) + '%');
            
            d3.select('#damage ' + id)
                .append('div')
                    .attr('class', 'graph received')
                .selectAll('div')
                    .data(received_graph_data)
                    .enter()
                .append('div')
                    .attr('class', 'unit tippy')
                    .attr('title', function(d, j) { 
                        
                        var received = dmg_received[i][j];
                        
                        if (received._id == false) {
                            var skill = 'Auto-Attack / Other'
                        } else {
                            var skill = received._id;
                        }
                        
                        var dmg = delimit(received.dmg);
                        var c_rate = ((received.crits / received.count) * 100).toFixed(2);
                        var html = 
                            skill + 
                            '<br />' + 
                            'Total Damage: ' + dmg + 
                            '<br />' + 
                            'Crit Rate: ' + c_rate + '%';
                            
                        return html;
                        
                    })
                    .attr('hover-color', c_scheme[0])
                    .style('height', '0px')                      
                    .style('background-color', c_scheme[0])
                    .style('opacity', 1)                     
                    .style('width', function(d) { return inflicted_scale(d) + 'px' } )                        
                .on('mouseover', mouse_over)
                .on('mouseout', mouse_out)
                .transition()
                    .duration(function (d, i) { return i * 0.5 })
                    .delay(function (d, i) { return (i * 5) + 750 })
                    .style('height', bar_height)
                    .style('opacity', 1);                

            d3.select('#damage ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(
                        player_names[i] + ' inflicted a total of ' 
                        + delimit(dmg_totals[i].inflicted.total) + 
                    ' damage, with a critical hit rate of ' 
                    + ((dmg_totals[i].inflicted.crits / dmg_totals[i].inflicted.count) * 100).toFixed(2) + '%' +
                    ', and received a total of ' + delimit(dmg_totals[i].received.total) + ' damage, a critical hit rate of ' 
                    + ((dmg_totals[i].received.crits / dmg_totals[i].received.count) * 100).toFixed(2) + '%'
                    );                      
        } // end loop
        
        d3.select('#damage')
            .append('div')
            .attr('class', 'spacer');
            
        tooltips();
        
    } // end populate

} // end dmg

// ===========
// Money Dates
// ==========

function money_dates() {
    
    var c_scheme = ['#00897B', '#00897B'];
    
   // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'money-dates')
        .append('div')
            .attr('class', 'section title')
            .html('In-Game Money Transactions by Days of the Week');
        
    $.get('/money_dates', function(d) {
        
        var max = 0;
        
        for (var i = 0; i < d.length; i++) {
            if (max < d[i].earned_highest) max = d[i].earned_highest;
            if (max < d[i].spent_highest) max = d[i].spent_highest;
        }
        
        // set scale to highest value
        var scale = d3.scaleLinear()
            .domain([0, data_radius(max)])
            .range([0, 25]);
 
        for (var i = 0; i < d.length; i++) {
            
            // set player id
            var id = String('.p' + (i + 1));
            
            // Player Name
             d3.select('#money-dates')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
           
            
            var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
                    
            // ========
            // Earnings
            // ========
            d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Earnings');
            
            // Circles          
            d3.select('#money-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].earnings)
                .enter()
                .append("circle")
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('title', function (d) { return delimit(d) + ' Kinah' })
                    .attr('hover-color', c_scheme[0])    
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)           
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
            
            // Days of the week
            d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'week earnings')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week earnings')
                    .style('float', 'left')
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });
            
            // report
             d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has earned a total of ' + delimit(d[i].earned_total) + ' Kinah, and earns the most on ' + days[d[i].day_earned_most] + '.');
                    
                    // .html(
                    //     'Total earnings: ' + delimit(d[i].earned_total) + ' Kinah / ' + rmt(d[i].earned_total)
                    //     + '<br />' +
                    //     'Earns most on: ' + days[d[i].day_earned_most] + ', ' + delimit(d[i].earned_highest) + ' Kinah / ' + rmt(d[i].earned_highest) 
                    //     + '<br />' +
                    //     'Number of transactions: ' + delimit(d[i].earned_total_transactions)
                    // );                    
            
            // ========
            // spendings
            // ========
            d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Spendings');
            
            // Circles          
            d3.select('#money-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].spendings)
                .enter()
                .append("circle")
                    .attr('title', function (d) { return delimit(d) + ' Kinah' })
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('hover-color', c_scheme[0])                  
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)                
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
            
            // Days of the week
            d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'week spendings')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week spendings')
                    .style('float', 'left')
                    // .style('border-left', '1px solid gray')
                    // .style('border-right', '1px solid gray')                    
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });           

            // report
             d3.select('#money-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has spent a total of ' + delimit(d[i].spent_total) + ' Kinah, and spends the most on ' + days[d[i].day_spent_most] + '.');

                    
        } // end for loop

        d3.select('#money-dates')
            .append('div')
            .attr('class', 'spacer');

        circletips();
    });

}

// ==============
// Messages Dates
// ==============

function messages_dates() {
    
    var c_scheme = ['#0D47A1', '#0D47A1'];
    
    // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'messages-dates')
        .append('div')
            .attr('class', 'section title')
            .html('Private Messages by Days of the Week');
        
    $.get('/messages_dates', function(d) {
        
        var max = 0;
    
        for (var i = 0; i < d.length; i++) {
            if (max < d[i].tos_highest) max = d[i].tos_highest;
            if (max < d[i].froms_highest) max = d[i].froms_highest;
        }
        
        // set scale to highest value
        var scale = d3.scaleLinear()
            .domain([0, data_radius(max)])
            .range([0, 25]);
        
        for (var i = 0; i < d.length; i++) {
     
            // set player id
            var id = String('.p' + (i + 1));
            
            // Player Name
             d3.select('#messages-dates')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
                    
            // ========
            // Tos
            // ========
            d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Outgoing Private Messages');
            
            // Circles          
            d3.select('#messages-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].tos)
                .enter()
                .append("circle")
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('title', function (d) { return delimit(d) + ' words' })
                    .attr('hover-color', c_scheme[0])    
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)           
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
    
            
            // Days of the week
            d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'week tos')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week tos')
                    .style('float', 'left')
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });
            
            // report
             d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has said a total of ' + delimit(d[i].tos_total) + ' words, and talks the most on ' + days[d[i].day_tos_most] + '.');
               
            
            // ========
            // froms
            // ========
            d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Incoming Private Messages');
            
            // Circles          
            d3.select('#messages-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].froms)
                .enter()
                .append("circle")
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('title', function (d) { return delimit(d) + ' words' })
                    .attr('hover-color', c_scheme[0])                  
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)                
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
            
            // Days of the week
            d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'week froms')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week froms')
                    .style('float', 'left')
                    // .style('border-left', '1px solid gray')
                    // .style('border-right', '1px solid gray')                    
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });           
        
            // report
             d3.select('#messages-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has received a total of ' + delimit(d[i].froms_total) + ' words, and receives the most on ' + days[d[i].day_froms_most] + '.');
        
                    
        } // end for loop
        
        d3.select('#messages-dates')
            .append('div')
            .attr('class', 'spacer');
            
        circletips(); 

    });
}

// ==============
// Damage Dates
// ==============

function damage_dates() {
    
    var c_scheme = ['#EF5350', '#EF5350'];
    
    // Select #main div, add #money and then .section .title
    d3.select('#main')
        .append('div')
            .attr('id', 'damage-dates')
        .append('div')
            .attr('class', 'section title')
            .html('Skills and Damage by Days of the Week');
        
    $.get('/damage_dates', function(d) {
        
        var max = 0;
        
        for (var i = 0; i < d.length; i++) {
            if (max < d[i].inflicted_highest) max = d[i].inflicted_highest;
            if (max < d[i].received_highest) max = d[i].received_highest;
        }
        
        // set scale to highest value
        var scale = d3.scaleLinear()
            .domain([0, data_radius(max)])
            .range([0, 25]);
 
         for (var i = 0; i < d.length; i++) {
            
            // set player id
            var id = String('.p' + (i + 1));
            
            // Player Name
             d3.select('#damage-dates')
                .append('div')
                    .attr('class', id.replace('.', ''))
                .append('div')
                    .attr('class', 'player-name')
                    .html('Player ' + (i + 1));
           
            
            var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);
                    
            // ========
            // inflicts
            // ========
            d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Damage Inflicted');
            
            // Circles          
            d3.select('#damage-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].inflicts)
                .enter()
                .append("circle")
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('title', function (d) { return delimit(d) + ' damage' })
                    .attr('hover-color', c_scheme[0])    
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)           
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
            
            // Days of the week
            d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'week inflicts')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week inflicts')
                    .style('float', 'left')
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });
            
            // report
             d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has inflicted a total of ' + delimit(d[i].inflicted_total) + ' damage, and inflicts the most on ' + days[d[i].day_inflicted_most] + '.');
            
            // ========
            // Received
            // ========
            d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'graph-descriptor circle')
                    .html('Damage Received');
            
            // Circles          
            d3.select('#damage-dates ' + id)
                .append('svg')
                    .attr("width", 960)
                    .attr("height", 50)
                .selectAll("circle")
                .data(d[i].receives)
                .enter()
                .append("circle")
                    .attr('title', function (d) { return delimit(d) + ' damage' })
                    .attr("cx", function(d, i) { return (137.143 * i) + 68.572; })
                    .attr("cy", 25)
                    .attr("r", 0)
                    .attr('hover-color', c_scheme[0])                  
                    .style("fill", c_scheme[0])
                .on('mouseover', mouse_over)					
                .on('mouseout', mouse_out)                
                .transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 50 })
                    .attr("r", function (d) { return scale(data_radius(d)); });
            
            // Days of the week
            d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'week receives')
                .selectAll('div')
                    .data(days)
                    .enter()
                .append('div')
                    .attr('class', 'day-of-week receives')
                    .style('float', 'left')
                    // .style('border-left', '1px solid gray')
                    // .style('border-right', '1px solid gray')                    
                    .style('text-align', 'center')
                    .style('width', 137.143 + 'px')
                    .html(function(d) { return d });           

            // report
             d3.select('#damage-dates ' + id)
                .append('div')
                    .attr('class', 'report')
                    .html(player_names[i] + ' has received a total of ' + delimit(d[i].received_total) + ' damage, and receives the most on ' + days[d[i].day_received_most] + '.');

                    
        } // end for loop
        
        d3.select('#damage-dates')
            .append('div')
            .attr('class', 'spacer');
            
        circletips();
    });
}
 
function sum(player, attribute) {
    var accumulator = 0;
    for (var i = 0; i < player.length; i++) {
        if (attribute == null) {
            accumulator += player[i];            
        } else {
            accumulator += player[i][attribute];
        }

    }
    return accumulator;
}

function get_max(values) {
    var accumulator = 0;

    // flatten array incase it's multi-dimensional
    // https://www.codetuts.tech/flatten-deep-nested-array-object/#othersolutions
    function flatten(arr) {
      return arr.reduce(function(a, b) {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
      }, []);
    }

    values = flatten(values);

    for (var i = 0; i < values.length; i++) {
        if (values[i] > accumulator) {
            accumulator = values[i];
        }
    }
    return accumulator;
}

function rmt(d) {
    var rate = 0.00000002185;
    return 'USD $' + (d * rate).toFixed(2)
}

function delimit(d) {
    // thousand / digit group separator
    return d.toLocaleString();
}

function data_radius(d) {

    return Math.sqrt(d/Math.PI);
}

// functions
money();
messages();
damage();

// money_dates();
// messages_dates();
// damage_dates();